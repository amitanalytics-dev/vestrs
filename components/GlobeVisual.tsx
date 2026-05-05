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
  { x: 42,  y: 205, label: 'SF' },
  { x: 62,  y: 232, label: 'NY' },
  { x: 118, y: 140, label: 'London' },
  { x: 252, y: 158, label: 'Dubai' },
  { x: 332, y: 288, label: 'Singapore' },
]

function bezierPoints(sx: number, sy: number, count = 30) {
  const mx = (sx + INDIA.x) / 2
  const my = Math.min(sy, INDIA.y) - 75
  const pts = []
  for (let i = 0; i <= count; i++) {
    const t = i / count
    const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * mx + t * t * INDIA.x
    const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * my + t * t * INDIA.y
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
      <path d={path} stroke="#0FFFC1" strokeWidth="1" fill="none" opacity={0.18} />
      <motion.circle
        r={3}
        fill="#0FFFC1"
        animate={{ x: xKeys, y: yKeys }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay, repeatDelay: 0.6 }}
      />
    </g>
  )
}

function LatLine({ lat }: { lat: number }) {
  const ry = R * Math.cos((lat * Math.PI) / 180)
  const y = CY - R * Math.sin((lat * Math.PI) / 180)
  if (Math.abs(ry) < 5) return null
  return (
    <ellipse cx={CX} cy={y} rx={ry} ry={ry * 0.18}
      stroke="#1a3a5c" strokeWidth="0.6" fill="none" />
  )
}

// Simplified continent outlines — hand-crafted for this SVG coordinate space.
// India-centric view: Africa (left), Europe (upper-left), Arabia (upper-centre),
// India (highlighted, centre-right), SE Asia (right), Eurasia (top).
const LANDMASSES = [
  {
    id: 'eurasia',
    d: 'M 72 108 C 132 80 210 73 278 74 C 345 75 400 92 422 112 C 405 128 366 118 318 112 C 273 107 220 107 176 112 C 140 117 100 127 76 128 Z',
  },
  {
    id: 'europe',
    d: 'M 76 128 C 94 112 118 105 140 106 C 160 106 168 117 166 128 C 153 137 134 141 113 139 C 95 136 76 128 76 128 Z',
  },
  {
    id: 'anatolia',
    d: 'M 166 128 C 184 117 210 115 236 119 C 258 123 273 132 277 143 C 261 147 238 141 213 139 C 188 137 172 133 166 128 Z',
  },
  {
    id: 'arabia',
    d: 'M 213 143 C 235 135 263 139 279 153 C 284 167 280 183 266 193 C 248 201 227 195 213 181 C 206 168 206 154 213 143 Z',
  },
  {
    id: 'pakistan',
    d: 'M 277 143 C 295 137 323 139 337 151 C 336 164 322 171 305 173 C 289 173 276 164 269 154 Z',
  },
  {
    id: 'seasia_main',
    d: 'M 332 159 C 350 152 370 156 380 171 C 384 190 376 212 362 228 C 348 241 332 243 322 230 C 315 218 318 194 332 159 Z',
  },
  {
    id: 'seasia_islands',
    d: 'M 325 279 C 345 268 367 272 374 288 C 372 306 354 314 334 312 C 316 308 308 295 318 281 Z',
  },
  {
    id: 'africa',
    d: 'M 107 158 C 140 143 176 148 199 167 C 210 190 210 223 198 257 C 185 285 163 306 141 309 C 118 306 100 283 98 254 C 96 224 102 191 107 158 Z',
  },
]

const INDIA_PATH = 'M 264 174 C 279 163 299 162 317 172 C 329 184 328 208 318 233 C 308 255 294 271 285 277 C 275 268 264 250 258 228 C 253 208 255 191 264 174 Z'

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
              <stop offset="0%"   stopColor="#0a2440" />
              <stop offset="60%"  stopColor="#051020" />
              <stop offset="100%" stopColor="#010c18" />
            </radialGradient>
            <radialGradient id="atmoGrad" cx="50%" cy="50%" r="50%">
              <stop offset="82%"  stopColor="transparent" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.18" />
            </radialGradient>
            <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#0FFFC1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0FFFC1" stopOpacity="0" />
            </radialGradient>
            <clipPath id="globeClip">
              <circle cx={CX} cy={CY} r={R} />
            </clipPath>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ocean */}
          <circle cx={CX} cy={CY} r={R} fill="url(#globeGrad)" />

          {/* Continents */}
          <g clipPath="url(#globeClip)">
            {LANDMASSES.map(lm => (
              <path
                key={lm.id}
                d={lm.d}
                fill="#0e2d47"
                stroke="#1e4a6e"
                strokeWidth="0.8"
                fillOpacity={0.95}
                strokeOpacity={0.55}
              />
            ))}
            {/* India — highlighted in teal */}
            <path
              d={INDIA_PATH}
              fill="#0FFFC1"
              stroke="#0FFFC1"
              strokeWidth="1"
              fillOpacity={0.18}
              strokeOpacity={0.55}
            />
          </g>

          {/* Grid lines over continents */}
          <g clipPath="url(#globeClip)" opacity={0.3}>
            {lats.map(lat => <LatLine key={lat} lat={lat} />)}
            {lngs.map(lng => (
              <ellipse
                key={lng}
                cx={CX} cy={CY}
                rx={R * 0.18} ry={R}
                stroke="#1a3a5c" strokeWidth="0.6" fill="none"
                transform={`rotate(${lng} ${CX} ${CY})`}
              />
            ))}
          </g>

          {/* Atmosphere ring */}
          <circle cx={CX} cy={CY} r={R} fill="url(#atmoGrad)" />

          {/* Globe edge */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1e4068" strokeWidth="1.5" />

          {/* Flow lines */}
          <g clipPath="url(#globeClip)">
            {SOURCES.map((src, i) => (
              <FlowLine key={i} sx={src.x} sy={src.y} delay={i * 0.8} />
            ))}
          </g>

          {/* India glow halo */}
          <circle cx={INDIA.x} cy={INDIA.y} r={32} fill="url(#indiaGlow)" />

          {/* India pulse ring */}
          <motion.circle
            cx={INDIA.x} cy={INDIA.y} r={14}
            stroke="#0FFFC1" strokeWidth="1.5" fill="none"
            animate={{ r: [10, 22], opacity: [0.8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* India dot */}
          <circle cx={INDIA.x} cy={INDIA.y} r={5} fill="#0FFFC1" filter="url(#glow)" />
          <circle cx={INDIA.x} cy={INDIA.y} r={3} fill="#ffffff" />

          {/* India label */}
          <text x={INDIA.x + 9} y={INDIA.y - 8}
            fill="#0FFFC1" fontSize="9" fontFamily="system-ui, sans-serif"
            fontWeight="700" opacity={0.85}>India</text>

          {/* Source city dots + labels */}
          {SOURCES.map((src, i) => (
            <g key={i}>
              <circle cx={src.x} cy={src.y} r={2.5} fill="#4a7fa5" opacity={0.8} />
              <text
                x={src.x + (src.x < 100 ? 5 : -src.label.length * 5 - 2)}
                y={src.y - 5}
                fill="#4a8fb5"
                fontSize="8"
                fontFamily="system-ui, sans-serif"
                opacity={0.7}
              >
                {src.label}
              </text>
            </g>
          ))}

          {/* Specular highlight */}
          <ellipse cx={CX - 65} cy={CY - 75} rx={55} ry={35}
            fill="white" opacity={0.04}
            transform="rotate(-20 235 175)" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
