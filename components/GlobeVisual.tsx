'use client'
import { useEffect, useRef } from 'react'

// [name, industry, investor, multiple, color, lat, lng]
const UNICORNS: [string, string, string, string, string, number, number][] = [
  ['Flipkart',    'E-commerce', 'Accel India',      '400x', '#1e88e5', 12.97, 77.59],
  ['Paytm',       'Fintech',    'SAIF Partners',    '30x',  '#1a6fc4', 28.54, 77.39],
  ['Ola',         'Mobility',   'Matrix India',     '25x',  '#888888', 12.97, 77.59],
  ["BYJU'S",      'Edtech',     'Aarin Capital',    '80x',  '#0b3d91', 12.97, 77.59],
  ['Dream11',     'Gaming',     'Kalaari Capital',  '50x',  '#e63946', 19.08, 72.88],
  ['Swiggy',      'Foodtech',   'SAIF Partners',    '30x',  '#fc8019', 12.97, 77.59],
  ['Zomato',      'Foodtech',   'Info Edge',        '200x', '#e23744', 28.46, 77.03],
  ['Razorpay',    'Fintech',    'Y Combinator',     '150x', '#2eb5c1', 12.97, 77.59],
  ['CRED',        'Fintech',    'Sequoia India',    '80x',  '#6366f1', 12.97, 77.59],
  ['Meesho',      'E-commerce', 'Y Combinator',     '100x', '#9b5de5', 12.97, 77.59],
  ['Nykaa',       'Beauty',     'TVS Capital',      '100x', '#fc4f8c', 19.08, 72.88],
  ['PolicyBazaar','Insurtech',  'Info Edge',        '100x', '#ef4444', 28.46, 77.03],
  ['PhonePe',     'Fintech',    'Flipkart / SV',    '50x',  '#7c3aed', 12.97, 77.59],
  ['Groww',       'Fintech',    'Sequoia India',    '50x',  '#00b386', 12.97, 77.59],
  ['Zepto',       'Q-Commerce', 'Y Combinator',     '60x',  '#a855f7', 19.08, 72.88],
  ['BharatPe',    'Fintech',    'Sequoia India',    '10x',  '#e8192c', 28.54, 77.39],
  ['Unacademy',   'Edtech',     'Sequoia India',    '12x',  '#0880ae', 12.97, 77.59],
  ['Vedantu',     'Edtech',     'Omidyar Network',  '15x',  '#4d5cde', 12.97, 77.59],
  ['ShareChat',   'Social',     'India Quotient',   '30x',  '#f7a51e', 12.97, 77.59],
  ['Slice',       'Fintech',    'Blume Ventures',   '20x',  '#f0522b', 12.97, 77.59],
  ['Darwinbox',   'HR Tech',    'Endiya Partners',  '25x',  '#1d4ed8', 17.38, 78.49],
  ['Chargebee',   'SaaS',       'Accel India',      '40x',  '#f97316', 13.08, 80.27],
  ['Freshworks',  'SaaS',       'Accel India',      '500x', '#25c16f', 13.08, 80.27],
  ['InMobi',      'Adtech',     'Sherpalo',         '30x',  '#ff5733', 12.97, 77.59],
  ['Udaan',       'B2B',        'Lightspeed India', '12x',  '#e11d48', 12.97, 77.59],
  ['Moglix',      'B2B',        'Accel India',      '20x',  '#f59e0b', 28.54, 77.39],
  ['Lenskart',    'Eyewear',    'IDG Ventures',     '25x',  '#0ea5e9', 28.46, 77.03],
  ['MakeMyTrip',  'Travel',     'SAIF Partners',    '60x',  '#e60026', 28.46, 77.03],
  ['MPL',         'Gaming',     'RTP Global',       '15x',  '#6366f1', 12.97, 77.59],
  ['Spinny',      'Auto',       'Accel India',      '18x',  '#3b82f6', 28.46, 77.03],
  ['Acko',        'Insurtech',  'SAIF Partners',    '20x',  '#7c3aed', 19.08, 72.88],
  ['OfBusiness',  'B2B',        'Matrix India',     '18x',  '#0d9488', 28.46, 77.03],
  ['Infra.Market','B2B',        'Accel India',      '22x',  '#d97706', 19.08, 72.88],
  ['Fractal',     'Analytics',  'Khazanah',         '12x',  '#2563eb', 19.08, 72.88],
  ['Mensa Brands','D2C',        'Accel India',      '8x',   '#db2777', 17.38, 78.49],
  ['GlobalBees',  'D2C',        'FirstCry',         '10x',  '#65a30d', 28.54, 77.39],
  ['Pristyn Care','Healthtech', 'Sequoia India',    '12x',  '#06b6d4', 28.46, 77.03],
  ['PharmEasy',   'Healthtech', 'Bessemer',         '4x',   '#22c55e', 19.08, 72.88],
  ['NoBroker',    'Proptech',   'SAIF Partners',    '18x',  '#f43f5e', 12.97, 77.59],
  ['BlackBuck',   'Logistics',  'Accel India',      '28x',  '#1e40af', 12.97, 77.59],
  ['Open Fin.',   'Fintech',    'Beenext',          '15x',  '#8b5cf6', 17.38, 78.49],
  ['XpressBees',  'Logistics',  'SAIF Partners',    '14x',  '#f97316', 18.52, 73.86],
  ['Zetwerk',     'Mfg',        'Accel India',      '22x',  '#0891b2', 12.97, 77.59],
  ['LeadSquared', 'SaaS',       'WestBridge',       '15x',  '#4f46e5', 12.97, 77.59],
  ['Amagi',       'Media',      'Accel India',      '35x',  '#dc2626', 12.97, 77.59],
  ['Rapido',      'Mobility',   'WestBridge',       '12x',  '#ca8a04', 12.97, 77.59],
  ['Stanza',      'Proptech',   'Matrix India',     '8x',   '#64748b', 28.54, 77.39],
  ['DealShare',   'E-commerce', 'Matrix India',     '10x',  '#10b981', 26.91, 75.79],
  ['Droom',       'Auto',       'Lightbox',         '8x',   '#818cf8', 28.46, 77.03],
  ['OneCard',     'Fintech',    'Matrix India',     '12x',  '#ef4444', 18.52, 73.86],
]

const DOMAINS: Record<string, string> = {
  'Flipkart': 'flipkart.com',     'Paytm': 'paytm.com',
  'Ola': 'olacabs.com',           "BYJU'S": 'byjus.com',
  'Dream11': 'dream11.com',       'Swiggy': 'swiggy.com',
  'Zomato': 'zomato.com',         'Razorpay': 'razorpay.com',
  'CRED': 'cred.club',            'Meesho': 'meesho.com',
  'Nykaa': 'nykaa.com',           'PolicyBazaar': 'policybazaar.com',
  'PhonePe': 'phonepe.com',       'Groww': 'groww.in',
  'Zepto': 'zepto.in',            'BharatPe': 'bharatpe.com',
  'Unacademy': 'unacademy.com',   'Vedantu': 'vedantu.com',
  'ShareChat': 'sharechat.com',   'Slice': 'sliceit.app',
  'Darwinbox': 'darwinbox.com',   'Chargebee': 'chargebee.com',
  'Freshworks': 'freshworks.com', 'InMobi': 'inmobi.com',
  'Udaan': 'udaan.com',           'Moglix': 'moglix.com',
  'Lenskart': 'lenskart.com',     'MakeMyTrip': 'makemytrip.com',
  'MPL': 'mpl.live',              'Spinny': 'spinny.com',
  'Acko': 'acko.com',             'OfBusiness': 'ofbusiness.in',
  'Infra.Market': 'infra.market', 'Fractal': 'fractal.ai',
  'Mensa Brands': 'mensabrands.com', 'GlobalBees': 'globalbees.com',
  'Pristyn Care': 'pristyncare.com', 'PharmEasy': 'pharmeasy.in',
  'NoBroker': 'nobroker.com',     'BlackBuck': 'blackbuck.com',
  'Open Fin.': 'open.money',      'XpressBees': 'xpressbees.com',
  'Zetwerk': 'zetwerk.com',       'LeadSquared': 'leadsquared.com',
  'Amagi': 'amagi.tv',            'Rapido': 'rapido.bike',
  'Stanza': 'stanzaliving.com',   'DealShare': 'dealshare.in',
  'Droom': 'droom.in',            'OneCard': 'getonecard.app',
}

const HQ_CITIES = [
  { name: 'Bangalore', lat: 12.97, lng: 77.59 },
  { name: 'Mumbai',    lat: 19.08, lng: 72.88 },
  { name: 'Delhi NCR', lat: 28.54, lng: 77.39 },
  { name: 'Hyderabad', lat: 17.38, lng: 78.49 },
  { name: 'Pune',      lat: 18.52, lng: 73.86 },
  { name: 'Chennai',   lat: 13.08, lng: 80.27 },
]

const IR = 3.334
const GROUP_DUR = 4000
const FADE_DUR  = 600

function mColor(m: string): string {
  const v = parseFloat(m)
  if (isNaN(v)) return '#94a3b8'
  if (v >= 100) return '#f0abfc'
  if (v >= 20)  return '#4ade80'
  if (v >= 10)  return '#86efac'
  if (v >= 5)   return '#facc15'
  return '#fb923c'
}

const GROUPS: [string, string, string, string, string, number, number][][] = []
for (let g = 0; g < UNICORNS.length; g += 2) {
  GROUPS.push(UNICORNS.slice(g, Math.min(g + 2, UNICORNS.length)))
}

export default function GlobeVisual() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    let animId = 0

    // Pre-load favicons for all companies
    const logoImgs = new Map<string, HTMLImageElement>()
    UNICORNS.forEach(u => {
      const domain = DOMAINS[u[0]]
      if (!domain) return
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => logoImgs.set(u[0], img)
      img.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    })

    const cv = document.createElement('canvas')
    Object.assign(cv.style, { position: 'absolute', top: '0', left: '0', display: 'block' })
    container.appendChild(cv)

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
      camera.position.set(0, 0, 2.05)
      camera.lookAt(0, 0.58, 0)
      let targetZ = 2.05

      // No star field — hero section provides the stars for visual unity

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

      // Persistent city dots on 3D globe
      HQ_CITIES.forEach(c => {
        const pos = ll(c.lat, c.lng, 1.013)
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.008, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xff9922 }),
        )
        dot.position.copy(pos)
        gg.add(dot)
      })

      // India fixed centre — no auto-rotation
      gg.rotation.y = IR
      gg.rotation.x = 0.28

      // Drag interaction only (no auto-spin)
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
        gg.rotation.x = Math.max(0.12, Math.min(0.45, gg.rotation.x + dy * 0.004))
        vel.x = dy * 0.0004; vel.y = dx * 0.0004
        pM.x = e.clientX; pM.y = e.clientY
      }
      const onMouseUp = () => { drag = false; container.style.cursor = 'grab' }
      const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetZ = Math.max(1.6, Math.min(2.8, targetZ + e.deltaY * 0.003))
      }
      const onTouchStart = (e: TouchEvent) => {
        pTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        vel.x = 0; vel.y = 0
      }
      const onTouchMove = (e: TouchEvent) => {
        if (!pTouch) return; e.preventDefault()
        const dx = e.touches[0].clientX - pTouch.x, dy = e.touches[0].clientY - pTouch.y
        gg.rotation.y += dx * 0.004
        gg.rotation.x = Math.max(0.12, Math.min(0.45, gg.rotation.x + dy * 0.004))
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

      function drawPin(
        u: [string, string, string, string, string, number, number],
        compIdx: number,
        alpha: number,
        now: number,
        camDir: ReturnType<typeof camera.position.clone>,
      ) {
        if (alpha < 0.01) return
        const wp = ll(u[5], u[6], 1.002).applyMatrix4(gg.matrixWorld)
        if (wp.clone().normalize().dot(camDir) < 0.15) return

        const proj = wp.clone().project(camera)
        const px = ((proj.x + 1) / 2) * W
        const py = ((-proj.y + 1) / 2) * H

        // Pulsing halo
        const pulse = 0.5 + 0.5 * Math.sin(now * 0.005 + compIdx * 1.5)
        ctx2.save()
        ctx2.globalAlpha = alpha * 0.28
        ctx2.beginPath(); ctx2.arc(px, py, 4 + pulse * 5, 0, Math.PI * 2)
        ctx2.fillStyle = u[4]; ctx2.fill()
        ctx2.restore()

        // Solid dot
        ctx2.save()
        ctx2.globalAlpha = alpha
        ctx2.beginPath(); ctx2.arc(px, py, 4.5, 0, Math.PI * 2)
        ctx2.fillStyle = u[4]; ctx2.fill()
        ctx2.strokeStyle = 'rgba(255,255,255,0.7)'; ctx2.lineWidth = 1.2; ctx2.stroke()
        ctx2.restore()

        const CW = 168, CH = 54
        const offX = compIdx === 0 ? 14 : -(CW + 14)
        const offY = compIdx === 0 ? -(CH * 0.7) : -(CH * 0.3)
        let cx = px + offX, cy = py + offY

        if (cx < 4)           cx = 4
        if (cx + CW > W - 4)  cx = W - CW - 4
        if (cy < 4)           cy = 4
        if (cy + CH > H - 4)  cy = H - CH - 4

        // Dashed connector
        ctx2.save()
        ctx2.globalAlpha = alpha * 0.55
        ctx2.strokeStyle = '#FF9933'; ctx2.lineWidth = 1
        ctx2.setLineDash([3, 3])
        const anchorX = compIdx === 0 ? cx : cx + CW
        ctx2.beginPath(); ctx2.moveTo(px, py); ctx2.lineTo(anchorX, cy + CH / 2); ctx2.stroke()
        ctx2.restore()

        // Card background
        ctx2.save()
        ctx2.globalAlpha = alpha * 0.92
        ctx2.fillStyle = '#050e20'
        // Rounded rect
        const r = 5
        ctx2.beginPath()
        ctx2.moveTo(cx + r, cy)
        ctx2.lineTo(cx + CW - r, cy); ctx2.arcTo(cx + CW, cy, cx + CW, cy + r, r)
        ctx2.lineTo(cx + CW, cy + CH - r); ctx2.arcTo(cx + CW, cy + CH, cx + CW - r, cy + CH, r)
        ctx2.lineTo(cx + r, cy + CH); ctx2.arcTo(cx, cy + CH, cx, cy + CH - r, r)
        ctx2.lineTo(cx, cy + r); ctx2.arcTo(cx, cy, cx + r, cy, r)
        ctx2.closePath()
        ctx2.fill()
        // Left accent bar (rounded on left)
        ctx2.globalAlpha = alpha * 0.8
        ctx2.fillStyle = u[4]
        ctx2.beginPath()
        ctx2.moveTo(cx + r, cy); ctx2.lineTo(cx + 4, cy)
        ctx2.arcTo(cx, cy, cx, cy + r, r)
        ctx2.lineTo(cx, cy + CH - r); ctx2.arcTo(cx, cy + CH, cx + r, cy + CH, r)
        ctx2.lineTo(cx + 4, cy + CH); ctx2.lineTo(cx + 4, cy)
        ctx2.closePath()
        ctx2.fill()
        ctx2.restore()

        // Logo circle
        const lr = 14
        const lx = cx + lr + 8, ly = cy + CH / 2
        ctx2.save()
        ctx2.globalAlpha = alpha
        ctx2.beginPath(); ctx2.arc(lx, ly, lr, 0, Math.PI * 2)
        ctx2.fillStyle = u[4]; ctx2.fill()

        const logoImg = logoImgs.get(u[0])
        if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
          // Clip to circle and draw favicon
          ctx2.save()
          ctx2.beginPath(); ctx2.arc(lx, ly, lr - 1, 0, Math.PI * 2); ctx2.clip()
          ctx2.drawImage(logoImg, lx - (lr - 1), ly - (lr - 1), (lr - 1) * 2, (lr - 1) * 2)
          ctx2.restore()
        } else {
          ctx2.font = `bold ${Math.round(lr * 0.85)}px system-ui,sans-serif`
          ctx2.fillStyle = '#fff'; ctx2.textAlign = 'center'; ctx2.textBaseline = 'middle'
          ctx2.shadowBlur = 0
          ctx2.fillText(u[0].charAt(0), lx, ly)
        }

        // Company name
        const tx = cx + lr * 2 + 14
        ctx2.font = '600 11px system-ui,sans-serif'
        ctx2.fillStyle = '#FF9933'; ctx2.textAlign = 'left'; ctx2.textBaseline = 'alphabetic'
        ctx2.shadowColor = '#000'; ctx2.shadowBlur = 4
        ctx2.fillText(u[0], tx, cy + 20)

        // Industry
        ctx2.font = '9px system-ui,sans-serif'
        ctx2.fillStyle = 'rgba(255,255,255,0.45)'; ctx2.shadowBlur = 0
        ctx2.fillText(u[1], tx, cy + 33)

        // Multiple — vertically centred, right-aligned, coloured glow
        ctx2.font = 'bold 14px system-ui,sans-serif'
        ctx2.fillStyle = mColor(u[3])
        ctx2.shadowColor = mColor(u[3]); ctx2.shadowBlur = 10
        ctx2.textAlign = 'right'
        ctx2.fillText(u[3], cx + CW - 8, cy + CH / 2 + 5)

        ctx2.restore()
      }

      function draw2D() {
        ctx2.clearRect(0, 0, W, H)
        gg.updateMatrixWorld()
        const camDir = camera.position.clone().normalize()

        const now2    = performance.now(), total2 = now2 - tStart
        const gIdx    = Math.floor(total2 / GROUP_DUR) % GROUPS.length
        const elapsed = total2 % GROUP_DUR
        let alpha = elapsed < FADE_DUR
          ? elapsed / FADE_DUR
          : elapsed > GROUP_DUR - FADE_DUR
            ? (GROUP_DUR - elapsed) / FADE_DUR
            : 1.0
        alpha = Math.max(0, Math.min(1, alpha))

        GROUPS[gIdx].forEach((u, i) => drawPin(u, i, alpha, now2, camDir))
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
        // Dampen drag velocity only — no auto-rotation
        if (!drag && !pTouch) {
          gg.rotation.y += vel.y
          gg.rotation.x = Math.max(0.12, Math.min(0.45, gg.rotation.x + vel.x))
          vel.x *= 0.92; vel.y *= 0.92
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
