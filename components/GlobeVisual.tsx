'use client'

import { useEffect, useRef } from 'react'

const CITIES = [
  { name: 'San Francisco', lat: 37.77,  lon: -122.42 },
  { name: 'New York',      lat: 40.71,  lon: -74.01  },
  { name: 'London',        lat: 51.51,  lon: -0.13   },
  { name: 'Dubai',         lat: 25.20,  lon: 55.27   },
  { name: 'Singapore',     lat: 1.35,   lon: 103.82  },
]
const INDIA = { lat: 20.59, lon: 78.96 }

function ll2xyz(lat: number, lon: number, r: number): [number, number, number] {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ]
}

// Continent outlines as [lat, lon] closed polygons
const CONTINENT_LINES: [number, number][][] = [
  // North America
  [[70,-140],[60,-140],[55,-130],[50,-125],[40,-124],[35,-121],[30,-116],[25,-110],[20,-105],[15,-90],[10,-85],[8,-77],[10,-75],[15,-85],[20,-90],[25,-90],[30,-90],[33,-91],[35,-90],[40,-80],[45,-76],[50,-70],[55,-60],[60,-64],[65,-64],[70,-80],[75,-90],[75,-100],[75,-110],[75,-120],[75,-130],[75,-135],[70,-140]],
  // South America
  [[10,-75],[5,-77],[0,-78],[-5,-81],[-10,-78],[-15,-75],[-20,-70],[-25,-70],[-30,-71],[-35,-72],[-40,-73],[-45,-74],[-50,-73],[-55,-68],[-55,-65],[-50,-65],[-45,-64],[-40,-62],[-35,-58],[-30,-52],[-25,-48],[-20,-41],[-15,-39],[-10,-37],[-5,-35],[0,-50],[5,-52],[10,-60],[10,-65],[10,-75]],
  // Europe
  [[35,27],[40,28],[42,28],[44,30],[46,30],[48,32],[50,30],[52,23],[54,18],[56,14],[58,11],[60,5],[62,5],[64,14],[66,14],[68,16],[70,20],[70,26],[68,28],[65,26],[62,24],[60,25],[58,22],[55,21],[53,20],[52,16],[50,14],[48,16],[46,14],[44,12],[42,12],[40,18],[38,15],[36,14],[35,12],[35,10],[36,8],[38,8],[40,2],[42,3],[44,0],[44,-1],[43,-9],[42,-8],[40,-8],[38,-8],[37,-9],[36,-6],[36,2],[37,4],[38,8],[40,8],[38,12],[36,12],[35,27]],
  // Africa
  [[37,10],[35,11],[33,12],[30,31],[22,37],[15,42],[12,44],[11,43],[10,42],[8,40],[5,40],[0,42],[-5,40],[-10,40],[-15,35],[-20,34],[-25,32],[-30,30],[-34,26],[-34,18],[-30,17],[-25,15],[-20,13],[-15,12],[-10,15],[-5,10],[0,9],[5,1],[5,-1],[4,-9],[5,-15],[8,-16],[10,-15],[12,-16],[14,-17],[16,-16],[18,-16],[20,-17],[22,-17],[24,-15],[26,-15],[28,-13],[30,-12],[32,-12],[33,-7],[33,0],[32,3],[30,10],[28,14],[25,25],[22,30],[20,37],[18,38],[15,40],[12,43],[10,42],[8,38],[5,35],[5,40],[37,10]],
  // Asia main body
  [[70,30],[68,40],[65,50],[60,60],[55,60],[50,58],[45,60],[40,60],[35,60],[30,60],[25,57],[22,59],[20,58],[18,55],[15,50],[12,45],[10,45],[8,44],[10,42],[15,42],[22,37],[30,31],[33,35],[36,36],[38,42],[40,50],[42,48],[44,50],[46,48],[48,58],[50,58],[52,60],[54,58],[56,60],[58,58],[60,58],[65,57],[70,55],[72,70],[68,80],[62,90],[55,90],[50,90],[45,90],[40,90],[35,90],[30,100],[25,100],[20,100],[15,102],[10,104],[5,102],[0,108],[5,115],[10,120],[15,120],[18,110],[20,110],[22,114],[25,120],[28,121],[30,122],[32,118],[35,120],[38,140],[40,140],[42,138],[44,135],[48,135],[50,140],[52,140],[55,132],[58,130],[60,130],[62,170],[65,170],[68,180],[70,170],[72,180],[75,160],[78,140],[80,120],[82,100],[82,80],[80,60],[78,40],[75,30],[70,30]],
  // Australia
  [[-15,128],[-16,122],[-20,114],[-25,113],[-30,115],[-35,117],[-38,146],[-40,148],[-35,150],[-30,153],[-25,153],[-20,148],[-15,145],[-12,142],[-12,136],[-15,130],[-15,128]],
]

// India border highlight
const INDIA_BORDER: [number, number][] = [
  [22,68],[22,72],[20,72],[18,72],[16,73],[14,74],[10,76],[8,77],[8,80],[10,80],[12,80],[15,80],[16,81],[18,84],[20,87],[22,88],[23,90],[22,92],[20,93],[18,93],[16,82],[14,80],[12,79],[10,79],[8,77],[10,76],[14,74],[16,73],[18,72],[20,72],[22,72],[22,68],
]

export default function GlobeVisual() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let animId: number
    const isMobile = window.innerWidth < 768
    const SEG = isMobile ? 32 : 64
    const R = 1.0

    import('three').then((THREE) => {
      const W = container.clientWidth || 500
      const H = container.clientHeight || 500

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
      camera.position.set(0, 0, 2.85)

      // Lights
      scene.add(new THREE.AmbientLight(0x1a3050, 4))
      const sun = new THREE.DirectionalLight(0x7ec8e3, 1.4)
      sun.position.set(4, 3, 3)
      scene.add(sun)

      // Globe body
      const globeMat = new THREE.MeshPhongMaterial({
        color: 0x071828,
        emissive: 0x030e18,
        shininess: 20,
      })
      const globe = new THREE.Mesh(new THREE.SphereGeometry(R, SEG, SEG), globeMat)
      scene.add(globe)

      // Atmosphere glow (Fresnel, BackSide)
      const atmosMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        uniforms: { c: { value: new THREE.Color(0x0ea5e9) } },
        vertexShader: `
          varying float vI;
          void main() {
            vec3 n = normalize(normalMatrix * normal);
            vec3 e = normalize(vec3(modelViewMatrix * vec4(position, 1.0)));
            vI = pow(0.75 - dot(n, e), 2.5);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform vec3 c;
          varying float vI;
          void main() { gl_FragColor = vec4(c, vI * 0.55); }`,
      })
      scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.07, SEG, SEG), atmosMat))

      // Group for all geo objects (rotation applies here)
      const geoGroup = new THREE.Group()
      scene.add(geoGroup)

      // Continent lines
      const cLineMat = new THREE.LineBasicMaterial({ color: 0x1d4a6a, transparent: true, opacity: 0.65 })
      CONTINENT_LINES.forEach((pts) => {
        const verts: number[] = []
        pts.forEach(([lat, lon]) => {
          const [x, y, z] = ll2xyz(lat, lon, R + 0.001)
          verts.push(x, y, z)
        })
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
        geoGroup.add(new THREE.Line(geo, cLineMat))
      })

      // India border highlighted
      const indiaLineMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 1 })
      const indiaVerts: number[] = []
      INDIA_BORDER.forEach(([lat, lon]) => {
        const [x, y, z] = ll2xyz(lat, lon, R + 0.003)
        indiaVerts.push(x, y, z)
      })
      const indiaGeo = new THREE.BufferGeometry()
      indiaGeo.setAttribute('position', new THREE.Float32BufferAttribute(indiaVerts, 3))
      geoGroup.add(new THREE.Line(indiaGeo, indiaLineMat))

      // India point light + dot + ring
      const [ix, iy, iz] = ll2xyz(INDIA.lat, INDIA.lon, R)
      const indiaLight = new THREE.PointLight(0x10b981, 3, 1.2)
      indiaLight.position.set(ix, iy, iz)
      geoGroup.add(indiaLight)

      const indiaDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x10b981 }),
      )
      indiaDot.position.set(ix, iy, iz)
      geoGroup.add(indiaDot)

      const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.068, 32), ringMat)
      ring.position.set(ix, iy, iz)
      ring.lookAt(new THREE.Vector3(ix * 3, iy * 3, iz * 3))
      geoGroup.add(ring)

      // Source city dots
      const cityMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      CITIES.forEach((city) => {
        const [cx, cy, cz] = ll2xyz(city.lat, city.lon, R + 0.003)
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.013, 8, 8), cityMat)
        dot.position.set(cx, cy, cz)
        geoGroup.add(dot)
      })

      // Arcs + animated particles
      type ArcParticle = { mesh: InstanceType<typeof THREE.Mesh>; curve: InstanceType<typeof THREE.QuadraticBezierCurve3>; t: number; speed: number }
      const particles: ArcParticle[] = []
      const arcLineMat = new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.20 })

      CITIES.forEach((city, i) => {
        const [sx, sy, sz] = ll2xyz(city.lat, city.lon, R)
        const [ex, ey, ez] = ll2xyz(INDIA.lat, INDIA.lon, R)
        const mid = new THREE.Vector3((sx + ex) / 2, (sy + ey) / 2, (sz + ez) / 2)
        mid.normalize().multiplyScalar(R * 1.5)
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(sx, sy, sz), mid, new THREE.Vector3(ex, ey, ez),
        )
        const linePts = curve.getPoints(60)
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts)
        geoGroup.add(new THREE.Line(lineGeo, arcLineMat))

        const pMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.013, 6, 6),
          new THREE.MeshBasicMaterial({ color: 0x7dd3fc }),
        )
        geoGroup.add(pMesh)
        particles.push({ mesh: pMesh, curve, t: i * 0.2, speed: 0.0014 + i * 0.0002 })
      })

      // Orient so India faces camera on load
      geoGroup.rotation.y = (-INDIA.lon - 90) * (Math.PI / 180)
      geoGroup.rotation.x = -INDIA.lat * 0.012

      // Drag state
      let dragging = false
      let px = 0; let py = 0
      let vx = 0; let vy = 0

      const onDown = (x: number, y: number) => { dragging = true; px = x; py = y; vx = 0; vy = 0 }
      const onMove = (x: number, y: number) => {
        if (!dragging) return
        vx = (x - px) * 0.005; vy = (y - py) * 0.003
        px = x; py = y
      }
      const onUp = () => { dragging = false }

      renderer.domElement.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY))
      window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY))
      window.addEventListener('mouseup', onUp)
      renderer.domElement.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
      window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
      window.addEventListener('touchend', onUp)

      const onResize = () => {
        const w = container.clientWidth; const h = container.clientHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      let tick = 0
      const loop = () => {
        animId = requestAnimationFrame(loop)
        tick += 0.016

        if (dragging) {
          geoGroup.rotation.y += vx
          geoGroup.rotation.x = Math.max(-0.9, Math.min(0.9, geoGroup.rotation.x + vy))
        } else {
          vx *= 0.92; vy *= 0.92
          geoGroup.rotation.y += vx + 0.0018
          geoGroup.rotation.x = Math.max(-0.9, Math.min(0.9, geoGroup.rotation.x + vy))
        }

        // Pulse India ring
        const p = 0.8 + 0.2 * Math.sin(tick * 3)
        ring.scale.setScalar(p)
        ringMat.opacity = p * 0.85

        // Animate particles
        particles.forEach((ap) => {
          ap.t = (ap.t + ap.speed) % 1
          ap.mesh.position.copy(ap.curve.getPoint(ap.t))
        })

        renderer.render(scene, camera)
      }
      loop()

      // Cleanup
      const cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMove as never)
        window.removeEventListener('mouseup', onUp)
        window.removeEventListener('touchmove', onMove as never)
        window.removeEventListener('touchend', onUp)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      }
      ;(container as HTMLDivElement & { _gc?: () => void })._gc = cleanup
    })

    return () => {
      cancelAnimationFrame(animId)
      const el = container as HTMLDivElement & { _gc?: () => void }
      if (el._gc) el._gc()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" style={{ cursor: 'grab' }} />
}
