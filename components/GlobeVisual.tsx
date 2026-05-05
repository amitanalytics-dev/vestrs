'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

const W = 500
const H = 500
const CX = W / 2
const CY = H / 2
const R = 220

const INDIA = { x: 288, y: 222 }

const SOURCES = [
  { x: 42, y: 205 },   // San Francisco
  { x: 58, y: 232 },   // New York
  { x: 118, y: 140 },  // London
  { x: 252, y: 158 },  // Dubai
  { x: 332, y: 288 },  // Singapore
]

function bezierPoints(sx: number, sy: number, count = 30) {
  const mx = (sx + INDIA.x) / 2
  const my = Math.min(sy, INDIA.y) - 75
  const pts = []
  for (let i = 0; i <= count; i++) {
    const t = i / count
    const x = (1-t)*(1-t)*sx + 2*(1-t)*t*mx + t*t*INDIA.x
    const y = (1-t)*(1-t)*sy + 2*(1-t)*t*my + t*t*INDIA.y
    pts.push({ x, y })
  }
  return pts
}

function arcPath(sx: number, sy: number): string {
  const mx = (sx + INDIA.x) / 2
  const my = Math.min(sy, INDIA.y) - 75
  return `M ${sx} ${sy} Q ${mx} ${my} ${INDIA.x} ${INDIA.y}`
}

function FlowLine({ sx, sy, delay }: { sx: number; sy: number; delay: number }) {
  const pts = useMemo(() => bezierPoints(sx, sy), [sx, sy])
  const xKeys = pts.map(p => p.x)
  const yKeys = pts.map(p => p.y)
  const path = arcPath(sx, sy)

  return (
    <g>
      <path d={path} stroke="#0FFFC1" strokeWidth="1" fill="none" opacity={0.2} />
      <motion.circle
        r={3}
        fill="#0FFFC1"
        animate={{ x: xKeys, y: yKeys }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay, repeatDelay: 0.5 }}
      />
    </g>
  )
}

function LatLine({ lat }: { lat: number }) {
  const ry = R * Math.cos((lat * Math.PI) / 180)
  const y = CY - R * Math.sin((lat * Math.PI) / 180)
  if (Math.abs(ry) < 5) return null
  return (
    <ellipse cx={CX} cy={y} rx={ry} ry={ry * 0.18} stroke="#1a3a5c" strokeWidth="0.8" fill="none" />
  )
}

export default function GlobeVisual() {
  const lats = [-60, -30, 0, 30, 60]
  const lngs = [0, 36, 72, 108, 144]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="w-full h-full flex items-center justify-center"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full"
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          <defs>
            <radialGradient id="globeGrad" cx="38%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#0a2440" />
              <stop offset="60%" stopColor="#051020" />
              <stop offset="100%" stopColor="#010c18" />
            </radialGradient>
            <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0FFFC1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0FFFC1" stopOpacity="0" />
            </radialGradient>
            <clipPath id="globeClip">
              <circle cx={CX} cy={CY} r={R} />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Globe body */}
          <circle cx={CX} cy={CY} r={R} fill="url(#globeGrad)" />

          {/* Grid lines */}
          <g clipPath="url(#globeClip)" opacity={0.6}>
            {lats.map(lat => <LatLine key={lat} lat={lat} />)}
            {lngs.map(lng => (
              <ellipse
                key={lng}
                cx={CX}
                cy={CY}
                rx={R * 0.18}
                ry={R}
                stroke="#1a3a5c"
                strokeWidth="0.8"
                fill="none"
                transform={`rotate(${lng} ${CX} ${CY})`}
              />
            ))}
          </g>

          {/* Globe border */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1e4068" strokeWidth="1.5" />

          {/* Flow lines */}
          <g clipPath="url(#globeClip)">
            {SOURCES.map((src, i) => (
              <FlowLine key={i} sx={src.x} sy={src.y} delay={i * 0.8} />
            ))}
          </g>

          {/* India glow halo */}
          <circle cx={INDIA.x} cy={INDIA.y} r={30} fill="url(#indiaGlow)" />

          {/* India pulse ring */}
          <motion.circle
            cx={INDIA.x} cy={INDIA.y} r={14}
            stroke="#0FFFC1" strokeWidth="1.5" fill="none"
            animate={{ r: [10, 20], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* India dot */}
          <circle cx={INDIA.x} cy={INDIA.y} r={5} fill="#0FFFC1" filter="url(#glow)" />
          <circle cx={INDIA.x} cy={INDIA.y} r={3} fill="#ffffff" />

          {/* City dots */}
          {SOURCES.map((src, i) => (
            <circle key={i} cx={src.x} cy={src.y} r={2} fill="#4a7fa5" opacity={0.7} />
          ))}

          {/* Subtle specular highlight */}
          <ellipse cx={CX - 65} cy={CY - 75} rx={55} ry={35}
            fill="white" opacity={0.04} transform="rotate(-20 235 175)" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
