'use client'
import { useEffect, useRef } from 'react'

const IND: [number, number][] = [
  [35.5,76.0],[34.5,77.5],[33.0,79.0],[31.5,80.0],[30.0,81.0],[28.5,81.5],
  [27.5,83.5],[27.3,85.0],[27.5,87.0],[27.0,88.0],[26.5,89.0],
  [25.0,91.0],[24.5,92.0],[23.5,93.5],[22.0,92.5],
  [21.0,87.0],[19.5,85.5],[18.0,84.5],[17.0,83.0],[16.0,82.0],
  [15.5,80.5],[13.5,80.5],[12.5,80.0],[10.5,79.0],
  [8.5,77.5],[8.0,77.0],[8.5,76.5],
  [10.5,76.0],[12.0,75.0],[14.5,74.0],[16.5,73.5],[18.0,72.8],
  [20.0,72.5],[21.0,72.0],[22.0,68.8],[22.5,68.0],
  [25.0,70.0],[27.5,70.8],[30.0,71.5],
  [32.5,75.0],[34.5,74.0],[35.5,76.0],
]

// [name, industry, multiple, brandColor]
const UNICORNS: [string, string, string, string][] = [
  ['Flipkart',     'E-commerce',  '400x', '#1e88e5'],
  ['Paytm',        'Fintech',     '30x',  '#1a6fc4'],
  ['Ola',          'Mobility',    '25x',  '#555555'],
  ["BYJU'S",       'Edtech',      '80x',  '#0b3d91'],
  ['Dream11',      'Gaming',      '50x',  '#e63946'],
  ['Swiggy',       'Foodtech',    '20x',  '#fc8019'],
  ['Zomato',       'Foodtech',    '200x', '#e23744'],
  ['Razorpay',     'Fintech',     '150x', '#2eb5c1'],
  ['CRED',         'Fintech',     '8x',   '#6366f1'],
  ['Meesho',       'E-commerce',  '80x',  '#9b5de5'],
  ['Nykaa',        'Beauty',      '100x', '#fc4f8c'],
  ['PolicyBazaar', 'Insurtech',   '100x', '#ef4444'],
  ['PhonePe',      'Fintech',     '40x',  '#7c3aed'],
  ['Groww',        'Fintech',     '20x',  '#00b386'],
  ['Zepto',        'Q-Commerce',  '30x',  '#a855f7'],
  ['BharatPe',     'Fintech',     '10x',  '#e8192c'],
  ['Unacademy',    'Edtech',      '12x',  '#0880ae'],
  ['Vedantu',      'Edtech',      '15x',  '#4d5cde'],
  ['ShareChat',    'Social',      '30x',  '#f7a51e'],
  ['Slice',        'Fintech',     '20x',  '#f0522b'],
  ['Darwinbox',    'HR Tech',     '25x',  '#1d4ed8'],
  ['Chargebee',    'SaaS',        '40x',  '#f97316'],
  ['Freshworks',   'SaaS',        '500x', '#25c16f'],
  ['InMobi',       'Adtech',      '30x',  '#ff5733'],
  ['Udaan',        'B2B',         '12x',  '#e11d48'],
  ['Moglix',       'B2B',         '20x',  '#f59e0b'],
  ['Lenskart',     'Eyewear',     '25x',  '#0ea5e9'],
  ['MakeMyTrip',   'Travel',      '60x',  '#e60026'],
  ['MPL',          'Gaming',      '15x',  '#6366f1'],
  ['Spinny',       'Auto',        '18x',  '#3b82f6'],
  ['Acko',         'Insurtech',   '20x',  '#7c3aed'],
  ['OfBusiness',   'B2B',         '18x',  '#0d9488'],
  ['Infra.Market', 'B2B',         '22x',  '#d97706'],
  ['Fractal',      'Analytics',   '12x',  '#2563eb'],
  ['Mensa Brands', 'D2C',         '8x',   '#db2777'],
  ['GlobalBees',   'D2C',         '10x',  '#65a30d'],
  ['Pristyn Care', 'Healthtech',  '12x',  '#06b6d4'],
  ['PharmEasy',    'Healthtech',  '4x',   '#22c55e'],
  ['NoBroker',     'Proptech',    '18x',  '#f43f5e'],
  ['BlackBuck',    'Logistics',   '28x',  '#1e40af'],
  ['Open Fin.',    'Fintech',     '15x',  '#7c3aed'],
  ['XpressBees',   'Logistics',   '14x',  '#f97316'],
  ['Zetwerk',      'Mfg',         '22x',  '#0891b2'],
  ['LeadSquared',  'SaaS',        '15x',  '#4f46e5'],
  ['Amagi',        'Media',       '35x',  '#dc2626'],
  ['Rapido',       'Mobility',    '12x',  '#ca8a04'],
  ['Stanza',       'Proptech',    '8x',   '#64748b'],
  ['DealShare',    'E-commerce',  '10x',  '#10b981'],
  ['Droom',        'Auto',        '8x',   '#818cf8'],
  ['OneCard',      'Fintech',     '12x',  '#ef4444'],
]

const INDIA_R = 3.334
const SMIN = INDIA_R - 0.10
const SMAX = INDIA_R + 0.10
const GROUP_DUR = 4000
const FADE_DUR  = 500

function mColor(m: string): string {
  const v = parseFloat(m)
  if (isNaN(v)) return '#94a3b8'
  if (v >= 100) return '#f0abfc'
  if (v >= 20)  return '#4ade80'
  if (v >= 10)  return '#86efac'
  if (v >= 5)   return '#facc15'
  return '#fb923c'
}

const GROUPS: [string, string, string, string][][] = []
for (let g = 0; g < UNICORNS.length; g += 4) {
  GROUPS.push(UNICORNS.slice(g, Math.min(g + 4, UNICORNS.length)))
}

export default function GlobeVisual() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    let animId = 0

    // WebGL canvas
    const cv = document.createElement('canvas')
    Object.assign(cv.style, { position: 'absolute', top: '0', left: '0', display: 'block' })
    container.appendChild(cv)

    // 2D overlay canvas
    const ol = document.createElement('canvas')
    Object.assign(ol.style, {
      position: 'absolute', top: '0', left: '0',
      width: '100%', height: '100%',
      display: 'block', pointerEvents: 'none',
    })
    container.appendChild(ol)

    const ctx2 = ol.getContext('2d')!
    let W = container.clientWidth  || 500
    let H = container.clientHeight || 500
    ol.width = W; ol.height = H

    import('three').then(THREE => {
      const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.setClearColor(0x000000, 0)

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
      camera.position.set(0, 0, 2.6)
      camera.lookAt(0, 0.36, 0)
      let targetZ = 2.6

      // Stars
      const sp = new Float32Array(4000 * 3)
      for (let i = 0; i < sp.length; i++) sp[i] = (Math.random() - 0.5) * 200
      const sg = new THREE.BufferGeometry()
      sg.setAttribute('position', new THREE.BufferAttribute(sp, 3))
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.11 })))

      const gg = new THREE.Group()
      scene.add(gg)

      const ldr = new THREE.TextureLoader()
      gg.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhongMaterial({
          map:         ldr.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
          bumpMap:     ldr.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
          bumpScale:   0.04,
          specularMap: ldr.load('https://unpkg.com/three-globe/example/img/earth-water.png'),
          specular:    new THREE.Color(0x1a2244),
          shininess:   22,
        }),
      ))
      gg.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.028, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x3366ff, transparent: true, opacity: 0.06, side: THREE.FrontSide }),
      ))

      scene.add(new THREE.AmbientLight(0x334455, 0.9))
      const sun = new THREE.DirectionalLight(0xffeedd, 1.3)
      sun.position.set(5, 3, 5)
      scene.add(sun)

      function ll(lat: number, lng: number, r = 1.013) {
        const phi   = (90 - lat) * Math.PI / 180
        const theta = (lng + 180) * Math.PI / 180
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
           r * Math.cos(phi),
           r * Math.sin(phi) * Math.sin(theta),
        )
      }

      const INDP = ll(20.59, 78.96)
      const idot = new THREE.Mesh(
        new THREE.SphereGeometry(0.010, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xff9922 }),
      )
      idot.position.copy(INDP)
      gg.add(idot)

      // India centred — tiny wobble
      let sDir = 1
      gg.rotation.y = INDIA_R

      // Interaction
      let drag = false
      const pM = { x: 0, y: 0 }
      const vel = { x: 0, y: 0 }
      let pTouch: { x: number; y: number } | null = null

      const onMouseDown = (e: MouseEvent) => {
        drag = true; pM.x = e.clientX; pM.y = e.clientY; vel.x = 0; vel.y = 0
        container.style.cursor = 'grabbing'
      }
      const onMouseMove = (e: MouseEvent) => {
        if (!drag) return
        const dx = e.clientX - pM.x, dy = e.clientY - pM.y
        gg.rotation.y += dx * 0.004
        gg.rotation.x = Math.max(-0.5, Math.min(0.5, gg.rotation.x + dy * 0.004))
        vel.x = dy * 0.0004; vel.y = dx * 0.0004
        pM.x = e.clientX; pM.y = e.clientY
      }
      const onMouseUp = () => {
        drag = false; container.style.cursor = 'grab'
        if (gg.rotation.y > SMAX) sDir = -1
        else if (gg.rotation.y < SMIN) sDir = 1
      }
      const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetZ = Math.max(1.8, Math.min(4.0, targetZ + e.deltaY * 0.004))
      }
      const onTouchStart = (e: TouchEvent) => {
        pTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        vel.x = 0; vel.y = 0
      }
      const onTouchMove = (e: TouchEvent) => {
        if (!pTouch) return
        e.preventDefault()
        const dx = e.touches[0].clientX - pTouch.x
        const dy = e.touches[0].clientY - pTouch.y
        gg.rotation.y += dx * 0.004
        gg.rotation.x = Math.max(-0.5, Math.min(0.5, gg.rotation.x + dy * 0.004))
        vel.x = dy * 0.0004; vel.y = dx * 0.0004
        pTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
      const onTouchEnd = () => { pTouch = null }

      container.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      container.addEventListener('wheel', onWheel, { passive: false })
      container.addEventListener('touchstart', onTouchStart, { passive: true })
      container.addEventListener('touchmove', onTouchMove, { passive: false })
      container.addEventListener('touchend', onTouchEnd)

      const tStart = performance.now()

      function draw2D() {
        ctx2.clearRect(0, 0, W, H)
        gg.updateMatrixWorld()
        const camDir = camera.position.clone().normalize()

        const pts = IND.map(([lat, lng]) => {
          const wp   = ll(lat, lng, 1.001).applyMatrix4(gg.matrixWorld)
          const f    = wp.clone().normalize().dot(camDir)
          const proj = wp.clone().project(camera)
          return { x: ((proj.x + 1) / 2) * W, y: ((-proj.y + 1) / 2) * H, ok: f > 0 }
        })
        if (pts.filter(p => p.ok).length < 8) return

        const iwp = INDP.clone().applyMatrix4(gg.matrixWorld)
        const fac  = Math.max(0, Math.min(1, (iwp.clone().normalize().dot(camDir) - 0.05) / 0.28))
        if (fac < 0.02) return

        let mnX = 1e9, mxX = -1e9, mnY = 1e9, mxY = -1e9
        pts.forEach(p => {
          if (p.ok) {
            mnX = Math.min(mnX, p.x); mxX = Math.max(mxX, p.x)
            mnY = Math.min(mnY, p.y); mxY = Math.max(mxY, p.y)
          }
        })
        const cx = (mnX + mxX) / 2, cy = (mnY + mxY) / 2
        const indW = mxX - mnX, indH = mxY - mnY

        // "INDIA" in tricolour letters
        const titleSize = Math.max(13, Math.min(22, indH * 0.13))
        ctx2.save()
        ctx2.globalAlpha = fac
        ctx2.font = `bold ${titleSize}px system-ui,sans-serif`
        ctx2.textBaseline = 'alphabetic'
        ctx2.shadowColor = '#000'; ctx2.shadowBlur = 8

        const letters  = ['I','N','D','I','A']
        const lColors  = ['#FF9933','#FFFFFF','#FF9933','#FFFFFF','#138808']
        let totalW = 0
        letters.forEach((l, li) => { ctx2.fillStyle = lColors[li]; totalW += ctx2.measureText(l).width + (li < 4 ? 1 : 0) })
        let lx = cx - totalW / 2, ly = mnY - titleSize * 0.5
        letters.forEach((l, li) => {
          ctx2.fillStyle = lColors[li]
          ctx2.fillText(l, lx, ly)
          lx += ctx2.measureText(l).width + 1
        })
        ctx2.restore()

        // Rotating unicorn group (4 per card)
        const now2    = performance.now(), total2 = now2 - tStart
        const gIdx    = Math.floor(total2 / GROUP_DUR) % GROUPS.length
        const elapsed = total2 % GROUP_DUR
        let alpha = elapsed < FADE_DUR
          ? elapsed / FADE_DUR
          : elapsed > GROUP_DUR - FADE_DUR
            ? (GROUP_DUR - elapsed) / FADE_DUR
            : 1.0
        alpha = Math.max(0, Math.min(1, alpha)) * fac

        const grp   = GROUPS[gIdx]
        const logoR = Math.max(9, Math.min(14, indH * 0.054))
        const rowH  = Math.max(26, Math.min(36, indH * 0.175))
        const cardW = Math.min(175, indW * 0.90)
        const blockH = grp.length * rowH + 10
        const bx = cx - cardW / 2, by = cy - blockH / 2 + indH * 0.03

        // Dark panel background
        ctx2.save()
        ctx2.globalAlpha = alpha * 0.75
        ctx2.fillStyle = '#040c1e'
        ctx2.fillRect(bx - 4, by - 4, cardW + 8, blockH + 8)
        ctx2.restore()

        grp.forEach((u, i) => {
          const ry       = by + 5 + i * rowH
          const nameSize = Math.max(8, Math.min(11, rowH * 0.33))
          const tagSize  = Math.max(7, Math.min(9,  rowH * 0.26))
          const multSize = Math.max(9, Math.min(13, rowH * 0.36))

          ctx2.save()
          ctx2.globalAlpha = alpha

          // Coloured logo circle with initial
          ctx2.beginPath()
          ctx2.arc(bx + logoR + 2, ry + rowH / 2, logoR, 0, Math.PI * 2)
          ctx2.fillStyle = u[3]; ctx2.fill()
          ctx2.font = `bold ${Math.round(logoR * 1.1)}px system-ui,sans-serif`
          ctx2.fillStyle = '#fff'; ctx2.textAlign = 'center'; ctx2.textBaseline = 'middle'
          ctx2.shadowBlur = 0
          ctx2.fillText(u[0].charAt(0), bx + logoR + 2, ry + rowH / 2)

          // Company name
          const tx = bx + logoR * 2 + 10
          ctx2.textAlign = 'left'; ctx2.textBaseline = 'alphabetic'
          ctx2.font = `600 ${nameSize}px system-ui,sans-serif`
          ctx2.fillStyle = '#FF9933'
          ctx2.shadowColor = '#000'; ctx2.shadowBlur = 4
          ctx2.fillText(u[0], tx, ry + rowH * 0.45)

          // Industry label
          ctx2.font = `${tagSize}px system-ui,sans-serif`
          ctx2.fillStyle = 'rgba(255,255,255,0.45)'
          ctx2.shadowBlur = 0
          ctx2.fillText(u[1], tx, ry + rowH * 0.45 + tagSize + 2)

          // Multiple (right, coloured)
          ctx2.textAlign = 'right'
          ctx2.font = `bold ${multSize}px system-ui,sans-serif`
          ctx2.fillStyle = mColor(u[2])
          ctx2.shadowColor = mColor(u[2]); ctx2.shadowBlur = 6
          ctx2.fillText(u[2], bx + cardW - 2, ry + rowH / 2 + multSize / 2)

          ctx2.restore()

          if (i < grp.length - 1) {
            ctx2.save()
            ctx2.globalAlpha = alpha * 0.12
            ctx2.strokeStyle = '#fff'; ctx2.lineWidth = 0.5
            ctx2.beginPath()
            ctx2.moveTo(bx, ry + rowH); ctx2.lineTo(bx + cardW, ry + rowH)
            ctx2.stroke()
            ctx2.restore()
          }
        })
      }

      const ro = new ResizeObserver(() => {
        W = container.clientWidth; H = container.clientHeight
        ol.width = W; ol.height = H
        renderer.setSize(W, H)
        camera.aspect = W / H
        camera.updateProjectionMatrix()
      })
      ro.observe(container)

      const animate = () => {
        animId = requestAnimationFrame(animate)
        if (!drag && !pTouch) {
          gg.rotation.y += 0.0010 * sDir + vel.y
          gg.rotation.x = Math.max(-0.5, Math.min(0.5, gg.rotation.x + vel.x))
          vel.x *= 0.95; vel.y *= 0.95
          if (gg.rotation.y >= SMAX) { gg.rotation.y = SMAX; sDir = -1; vel.y = 0 }
          else if (gg.rotation.y <= SMIN) { gg.rotation.y = SMIN; sDir = 1; vel.y = 0 }
        }
        camera.position.z += (targetZ - camera.position.z) * 0.1
        renderer.render(scene, camera)
        draw2D()
      }
      animate()

      const cleanup = () => {
        cancelAnimationFrame(animId)
        ro.disconnect()
        container.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        container.removeEventListener('wheel', onWheel)
        container.removeEventListener('touchstart', onTouchStart)
        container.removeEventListener('touchmove', onTouchMove)
        container.removeEventListener('touchend', onTouchEnd)
        renderer.dispose()
        if (container.contains(cv)) container.removeChild(cv)
        if (container.contains(ol)) container.removeChild(ol)
      }
      ;(container as HTMLDivElement & { _gc?: () => void })._gc = cleanup
    })

    return () => {
      cancelAnimationFrame(animId)
      const el = container as HTMLDivElement & { _gc?: () => void }
      if (el._gc) el._gc()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full"
      style={{ cursor: 'grab' }}
    />
  )
}
