'use client'

import { useEffect, useRef } from 'react'

/* ─── India border coordinates ─────────────────────────── */
const IND_COORDS: [number, number][] = [
  [35.5,76.0],[35.0,77.0],[34.5,77.5],[34.0,78.5],[33.5,79.0],[32.5,79.5],
  [31.5,80.0],[30.5,80.5],[30.0,81.0],[29.5,81.3],[28.5,81.5],[28.0,82.5],
  [27.5,83.5],[27.3,84.5],[27.5,85.5],[27.5,87.0],[27.0,88.0],[26.5,88.5],
  [26.0,89.0],[25.5,89.5],[25.0,91.0],[24.5,91.5],[24.0,92.5],[23.5,93.5],
  [25.0,94.5],[26.5,96.0],[27.5,97.5],[26.5,95.5],[25.0,94.0],
  [23.5,92.5],[22.5,92.3],[21.5,92.2],[22.0,91.5],
  [21.0,87.0],[19.5,85.5],[18.0,84.5],[17.0,83.0],[16.0,82.0],
  [15.5,80.5],[15.0,80.2],[14.0,80.2],[13.5,80.5],[13.0,80.5],
  [12.5,80.0],[11.5,79.5],[11.0,79.0],[10.5,79.0],
  [9.5,78.5],[8.5,77.5],[8.0,77.2],[8.3,76.8],[8.5,76.5],
  [9.0,76.5],[9.5,76.5],[10.0,76.2],[10.5,75.8],[11.0,75.5],
  [11.5,75.0],[12.0,75.0],[12.5,74.5],[13.5,74.5],[14.0,74.5],
  [14.5,74.0],[15.0,73.8],[15.5,73.5],[16.0,73.2],
  [16.5,73.2],[17.0,73.5],[17.5,73.0],[18.0,72.8],
  [19.0,72.8],[20.0,72.5],[21.0,72.0],[21.5,70.2],[22.0,68.8],[22.5,68.0],
  [23.5,68.2],[24.0,68.8],[24.5,70.2],[24.5,70.8],
  [25.0,70.2],[25.5,70.5],[26.0,70.5],[27.0,70.5],
  [27.5,70.8],[28.0,70.8],[28.5,71.2],[29.5,71.2],
  [30.0,71.8],[31.5,73.8],[32.0,74.8],[32.5,75.2],
  [33.0,74.2],[33.5,73.8],[34.0,73.5],[34.5,74.2],
  [35.0,75.2],[35.5,76.0],
]

/* ─── US VC hub cities ──────────────────────────────────── */
const VC_CITIES = [
  { name: 'San Francisco', lat: 37.77, lng: -122.42 },
  { name: 'Los Angeles',   lat: 34.05, lng: -118.24 },
  { name: 'Seattle',       lat: 47.61, lng: -122.33 },
  { name: 'Austin',        lat: 30.27, lng:  -97.74 },
  { name: 'Chicago',       lat: 41.88, lng:  -87.63 },
  { name: 'Boston',        lat: 42.36, lng:  -71.06 },
  { name: 'New York',      lat: 40.71, lng:  -74.01 },
  { name: 'Miami',         lat: 25.77, lng:  -80.19 },
]

/* Multiple arcs per city — index into VC_CITIES */
const ARC_SRCS = [0,0,1,1,2,2,3,4,4,5,5,6,6,6,7,7]

const INDIA_CENTER = { lat: 20.59, lng: 78.96 }
const SMIN = 0.25, SMAX = 5.30

export default function GlobeVisual() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let animId = 0

    import('three').then(THREE => {
      let W = container.clientWidth  || 500
      let H = container.clientHeight || 500

      /* Renderer */
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.setClearColor(0x000000, 0)
      Object.assign(renderer.domElement.style, {
        position: 'absolute', top: '0', left: '0', display: 'block',
      })
      container.appendChild(renderer.domElement)

      /* Scene / Camera */
      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000)
      camera.position.set(0, 0, 2.6)
      camera.lookAt(0, 0.36, 0)
      let targetZ = 2.6

      /* Stars */
      const sp = new Float32Array(5000 * 3)
      for (let i = 0; i < sp.length; i++) sp[i] = (Math.random() - 0.5) * 200
      const sg = new THREE.BufferGeometry()
      sg.setAttribute('position', new THREE.BufferAttribute(sp, 3))
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.11 })))

      /* Globe group — all geo objects rotate together */
      const gg = new THREE.Group()
      scene.add(gg)

      /* Earth sphere with real textures */
      const ldr  = new THREE.TextureLoader()
      const eMat = new THREE.MeshPhongMaterial({
        map:         ldr.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
        bumpMap:     ldr.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
        bumpScale:   0.04,
        specularMap: ldr.load('https://unpkg.com/three-globe/example/img/earth-water.png'),
        specular:    new THREE.Color(0x1a2244),
        shininess:   22,
      })
      gg.add(new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), eMat))

      /* Thin atmosphere tint */
      gg.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.028, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x3366ff, transparent: true, opacity: 0.07 }),
      ))

      /* Lights */
      scene.add(new THREE.AmbientLight(0x334455, 0.9))
      const sun = new THREE.DirectionalLight(0xffeedd, 1.3)
      sun.position.set(5, 3, 5)
      scene.add(sun)

      /* lat/lng → Vector3 helper */
      function ll(lat: number, lng: number, r = 1.013) {
        const phi   = (90 - lat) * (Math.PI / 180)
        const theta = (lng + 180) * (Math.PI / 180)
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
           r * Math.cos(phi),
           r * Math.sin(phi) * Math.sin(theta),
        )
      }

      /* India tricolour overlay painted onto a canvas texture */
      ;(function buildIndiaMesh() {
        const OW = 2048, OH = 1024
        const oc  = document.createElement('canvas')
        oc.width = OW; oc.height = OH
        const ctx = oc.getContext('2d')!
        const xy  = (lat: number, lng: number): [number, number] =>
          [(lng + 180) / 360 * OW, (90 - lat) / 180 * OH]

        ctx.beginPath()
        IND_COORDS.forEach(([lat, lng], i) => {
          const [x, y] = xy(lat, lng)
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        })
        ctx.closePath()
        ctx.save()
        ctx.clip()

        const y1 = xy(27.33, 0)[1]
        const y2 = xy(17.67, 0)[1]
        ctx.fillStyle = '#FF9933'; ctx.fillRect(0,  0,  OW, y1)
        ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0,  y1, OW, y2 - y1)
        ctx.fillStyle = '#138808'; ctx.fillRect(0,  y2, OW, OH - y2)
        ctx.restore()

        const tex = new THREE.CanvasTexture(oc)
        tex.needsUpdate = true
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(1.005, 64, 64),
          new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.1 }),
        )
        mesh.renderOrder = 1
        gg.add(mesh)
      }())

      /* India hub dot + 3 glow rings */
      const INDP = ll(INDIA_CENTER.lat, INDIA_CENTER.lng, 1.013)
      const idot = new THREE.Mesh(
        new THREE.SphereGeometry(0.022, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xff9922 }),
      )
      idot.position.copy(INDP)
      idot.userData = { name: 'India' }
      gg.add(idot)

      ;([
        [0.030, 0.038, 0.55],
        [0.044, 0.053, 0.30],
        [0.062, 0.072, 0.14],
      ] as [number, number, number][]).forEach(([r0, r1, op]) => {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(r0, r1, 28),
          new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: op, side: THREE.DoubleSide }),
        )
        ring.position.copy(INDP)
        ring.lookAt(INDP.clone().multiplyScalar(2))
        gg.add(ring)
      })

      /* "INDIA" floating label */
      const ilbl = document.createElement('div')
      ilbl.textContent = 'INDIA'
      Object.assign(ilbl.style, {
        position: 'absolute', pointerEvents: 'none',
        fontSize: '14px', fontWeight: '700',
        whiteSpace: 'nowrap', letterSpacing: '.1em',
        textShadow: '0 0 12px #000, 0 1px 5px #000',
        color: '#ffaa33', opacity: '0',
        fontFamily: 'system-ui, sans-serif',
      })
      container.appendChild(ilbl)

      /* US city dots + labels */
      type LabelItem = { el: HTMLDivElement; pos: ReturnType<typeof ll>; name: string }
      type TMesh = InstanceType<typeof THREE.Mesh>
      const cityMeshes: TMesh[] = [idot as TMesh]
      const vcLabels: LabelItem[]   = []

      VC_CITIES.forEach(c => {
        const pos = ll(c.lat, c.lng, 1.013)

        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.014, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0x55ddff }),
        )
        dot.position.copy(pos)
        dot.userData = { name: c.name }
        gg.add(dot)
        cityMeshes.push(dot)

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.020, 0.027, 20),
          new THREE.MeshBasicMaterial({ color: 0xaaeeff, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
        )
        ring.position.copy(pos)
        ring.lookAt(pos.clone().multiplyScalar(2))
        gg.add(ring)

        const el = document.createElement('div')
        el.textContent = c.name
        Object.assign(el.style, {
          position: 'absolute', pointerEvents: 'none',
          fontSize: '11px', fontWeight: '500',
          whiteSpace: 'nowrap', paddingLeft: '9px',
          textShadow: '0 0 8px #000, 0 1px 4px #000',
          color: '#7dd8ff', opacity: '0',
          fontFamily: 'system-ui, sans-serif',
        })
        container.appendChild(el)
        vcLabels.push({ el, pos, name: c.name })
      })

      /* Animated arcs: US cities → India */
      type ArcObj = {
        geo: InstanceType<typeof THREE.BufferGeometry>
        mat: InstanceType<typeof THREE.LineBasicMaterial>
        totalPts: number
        progress: number
        speed: number
      }
      const arcObjs: ArcObj[] = ARC_SRCS.map((vi, idx) => {
        const city = VC_CITIES[vi]
        const s    = ll(city.lat, city.lng, 1.01)
        const e    = ll(INDIA_CENTER.lat, INDIA_CENTER.lng, 1.01)
        const jitter = (idx % 3) * 0.04 - 0.04
        const mid  = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(2.0 + jitter)
        const curve = new THREE.QuadraticBezierCurve3(s, mid, e)
        const PTS   = 100
        const geo   = new THREE.BufferGeometry().setFromPoints(curve.getPoints(PTS))
        geo.setDrawRange(0, 0)
        const mat = new THREE.LineBasicMaterial({
          color: 0xffee44, transparent: true, opacity: 0.88, depthTest: false,
        })
        gg.add(new THREE.Line(geo, mat))
        return { geo, mat, totalPts: PTS + 1, progress: idx / ARC_SRCS.length, speed: 0.18 + Math.random() * 0.14 }
      })

      /* Swing rotation state — starts with India centred */
      let sDir = 1
      gg.rotation.y = Math.PI

      /* Interaction */
      let drag = false
      let pMx = 0, pMy = 0, velX = 0, velY = 0
      let pTouch: { x: number; y: number } | null = null

      const onMouseDown = (e: MouseEvent) => {
        drag = true; pMx = e.clientX; pMy = e.clientY; velX = 0; velY = 0
        container.style.cursor = 'grabbing'
      }
      const onMouseMove = (e: MouseEvent) => {
        const r = container.getBoundingClientRect()
        if (drag) {
          const dx = e.clientX - pMx, dy = e.clientY - pMy
          gg.rotation.y += dx * 0.006
          gg.rotation.x  = Math.max(-1.3, Math.min(1.3, gg.rotation.x + dy * 0.006))
          velX = dy * 0.0008; velY = dx * 0.0008
          pMx = e.clientX; pMy = e.clientY
        } else {
          /* Tooltip raycasting */
          m2.x = ((e.clientX - r.left) / W) * 2 - 1
          m2.y = -((e.clientY - r.top)  / H) * 2 + 1
          ray.setFromCamera(m2, camera)
          const hits = ray.intersectObjects(cityMeshes)
          if (hits.length) {
            tipEl.style.display = 'block'
            tipEl.style.left = (e.clientX - r.left + 14) + 'px'
            tipEl.style.top  = (e.clientY - r.top  -  8) + 'px'
            tipEl.textContent = hits[0].object.userData.name as string
          } else {
            tipEl.style.display = 'none'
          }
        }
      }
      const onMouseUp = () => {
        drag = false; container.style.cursor = 'grab'
        if (gg.rotation.y > SMAX) sDir = -1
        else if (gg.rotation.y < SMIN) sDir = 1
      }
      const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        targetZ = Math.max(1.5, Math.min(5.5, targetZ + e.deltaY * 0.005))
      }
      const onTouchStart = (e: TouchEvent) => {
        pTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        velX = 0; velY = 0
      }
      const onTouchMove = (e: TouchEvent) => {
        if (!pTouch) return
        e.preventDefault()
        const dx = e.touches[0].clientX - pTouch.x
        const dy = e.touches[0].clientY - pTouch.y
        gg.rotation.y += dx * 0.006
        gg.rotation.x  = Math.max(-1.3, Math.min(1.3, gg.rotation.x + dy * 0.006))
        velX = dy * 0.0008; velY = dx * 0.0008
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

      /* Tooltip element */
      const tipEl = document.createElement('div')
      Object.assign(tipEl.style, {
        position: 'absolute', display: 'none',
        background: 'rgba(0,0,0,.82)', color: '#fff',
        padding: '4px 10px', borderRadius: '6px',
        fontSize: '12px', pointerEvents: 'none',
        whiteSpace: 'nowrap', border: '.5px solid rgba(255,255,255,.15)',
        fontFamily: 'system-ui, sans-serif',
      })
      container.appendChild(tipEl)

      const ray = new THREE.Raycaster()
      const m2  = new THREE.Vector2()

      /* Resize observer */
      const ro = new ResizeObserver(() => {
        W = container.clientWidth; H = container.clientHeight
        renderer.setSize(W, H)
        camera.aspect = W / H
        camera.updateProjectionMatrix()
      })
      ro.observe(container)

      /* Animation loop */
      let lt = performance.now()
      const animate = () => {
        animId = requestAnimationFrame(animate)
        const now = performance.now()
        const dt  = Math.min((now - lt) / 1000, 0.05)
        lt = now

        /* Globe auto-rotation with swing bounce */
        if (!drag && !pTouch) {
          gg.rotation.y += 0.0025 * sDir + velY
          gg.rotation.x  = Math.max(-1.3, Math.min(1.3, gg.rotation.x + velX))
          velX *= 0.96; velY *= 0.96
          if (gg.rotation.y >= SMAX) { gg.rotation.y = SMAX; sDir = -1; velY = 0 }
          else if (gg.rotation.y <= SMIN) { gg.rotation.y = SMIN; sDir = 1; velY = 0 }
        }

        /* Arc animation */
        arcObjs.forEach(a => {
          a.progress += a.speed * dt
          if (a.progress > 1) a.progress = 0
          const WIN = 0.20, head = a.progress, tail = Math.max(0, head - WIN)
          a.geo.setDrawRange(
            Math.floor(tail * a.totalPts),
            Math.max(0, Math.floor((head - tail) * a.totalPts)),
          )
          const fi = Math.min(1, head / 0.05)
          const fo = head > 0.88 ? Math.max(0, (1 - head) / 0.12) : 1
          a.mat.opacity = 0.90 * fi * fo
        })

        /* Smooth camera zoom */
        camera.position.z += (targetZ - camera.position.z) * 0.1

        renderer.render(scene, camera)

        /* Floating labels — project 3D → 2D with anti-overlap */
        gg.updateMatrixWorld()
        const cd = camera.position.clone().normalize()
        const placed: { x: number; y: number; w: number; h: number }[] = []

        /* India label */
        const wpI  = INDP.clone().applyMatrix4(gg.matrixWorld)
        const facI = wpI.clone().normalize().dot(cd)
        if (facI >= 0.12) {
          const p  = wpI.clone().project(camera)
          const sx = ((p.x + 1) / 2) * W
          const sy = ((-p.y + 1) / 2) * H
          ilbl.style.left    = sx + 'px'
          ilbl.style.top     = (sy - 6) + 'px'
          ilbl.style.opacity = Math.min(1, (facI - 0.12) / 0.15).toFixed(2)
          placed.push({ x: sx, y: sy, w: 60, h: 18 })
        } else {
          ilbl.style.opacity = '0'
        }

        /* City labels with overlap suppression */
        vcLabels.forEach(item => {
          const wp  = item.pos.clone().applyMatrix4(gg.matrixWorld)
          const fac = wp.clone().normalize().dot(cd)
          if (fac < 0.10) { item.el.style.opacity = '0'; return }
          const p  = wp.clone().project(camera)
          const sx = ((p.x + 1) / 2) * W
          const sy = ((-p.y + 1) / 2) * H
          const op = Math.min(1, (fac - 0.10) / 0.18)
          const lw = item.name.length * 7
          const overlaps = placed.some(
            q => Math.abs(sx - q.x) < (lw + q.w) / 2 + 10 && Math.abs(sy - q.y) < (14 + q.h) / 2 + 6,
          )
          if (!overlaps) {
            item.el.style.left    = sx + 'px'
            item.el.style.top     = (sy - 6) + 'px'
            item.el.style.opacity = op.toFixed(2)
            placed.push({ x: sx, y: sy, w: lw, h: 14 })
          } else {
            item.el.style.opacity = '0'
          }
        })
      }
      animate()

      /* Cleanup stored on container */
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
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        if (container.contains(ilbl)) container.removeChild(ilbl)
        if (container.contains(tipEl)) container.removeChild(tipEl)
        vcLabels.forEach(item => { if (container.contains(item.el)) container.removeChild(item.el) })
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
