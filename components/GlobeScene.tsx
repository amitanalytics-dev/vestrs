'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

const RADIUS = 2.2

function latLng(lat: number, lng: number, r = RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

const INDIA = latLng(20.5, 78.9)

const SOURCES = [
  latLng(37.7, -122.4), // San Francisco
  latLng(40.7, -74.0),  // New York
  latLng(51.5, -0.1),   // London
  latLng(1.35, 103.8),  // Singapore
  latLng(25.2, 55.3),   // Dubai
]

function FlowLine({ from, offset }: { from: THREE.Vector3; offset: number }) {
  const dotRef = useRef<THREE.Mesh>(null!)
  const progress = useRef(offset)

  const curve = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(from, INDIA)
      .normalize()
      .multiplyScalar(RADIUS * 1.55)
    return new THREE.QuadraticBezierCurve3(from.clone(), mid, INDIA.clone())
  }, [from])

  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 60, 0.0025, 6, false),
    [curve],
  )

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.2) % 1
    if (dotRef.current) {
      const pt = curve.getPoint(progress.current)
      dotRef.current.position.copy(pt)
    }
  })

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial color="#0FFFC1" transparent opacity={0.2} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#0FFFC1" />
      </mesh>
    </group>
  )
}

function IndiaGlow({ position }: { position: THREE.Vector3 }) {
  const outerRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const scale = 1 + 0.4 * Math.sin(t * 1.6)
    const opacity = 0.1 + 0.08 * Math.sin(t * 1.6)
    outerRef.current.scale.setScalar(scale)
    const mat = outerRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = opacity
  })

  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#0FFFC1" />
      </mesh>
      <mesh ref={outerRef} position={position}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#0FFFC1" transparent opacity={0.12} />
      </mesh>
    </>
  )
}

function GlobeObject() {
  const groupRef = useRef<THREE.Group>(null!)

  const wireGeo = useMemo(
    () => new THREE.WireframeGeometry(new THREE.SphereGeometry(RADIUS, 28, 28)),
    [],
  )

  const indiaGlowPos = useMemo(
    () => INDIA.clone().normalize().multiplyScalar(RADIUS + 0.06),
    [],
  )

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.07
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial color="#010c18" roughness={0.95} metalness={0.05} />
      </mesh>

      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial color="#083060" transparent opacity={0.4} />
      </lineSegments>

      <IndiaGlow position={indiaGlowPos} />

      {SOURCES.map((src, i) => (
        <FlowLine key={i} from={src} offset={i / SOURCES.length} />
      ))}

      <pointLight position={indiaGlowPos} color="#0FFFC1" intensity={2.5} distance={2} />
    </group>
  )
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.8], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade={true} speed={0.5} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <GlobeObject />
    </Canvas>
  )
}
