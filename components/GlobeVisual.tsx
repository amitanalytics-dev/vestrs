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
  { x: 42,  y: 205, label: 'San Francisco' },
  { x: 62,  y: 232, label: 'New York' },
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
        r={3} fill="#0FFFC1"
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
      stroke="#163a52" strokeWidth="0.6" fill="none" />
  )
}

// Physical map continent paths — India-centric Eastern Hemisphere view.
// Colours: ocean #031828, land #0f3248, India teal.
const LAND = [
  // Russia + Siberia + Central Asia (top band)
  {
    id: 'eurasia',
    d: `M 68 105
        C 100 82 155 70 220 68
        C 285 66 345 76 388 96
        C 415 110 420 120 408 128
        C 388 128 365 118 330 112
        C 295 107 258 104 220 106
        C 182 107 145 112 112 118
        C 90 122 72 128 68 128 Z`,
  },
  // Scandinavia / UK peninsula hint
  {
    id: 'scandinavia',
    d: `M 95 96 C 105 88 118 86 126 92 C 130 98 126 106 118 108
        C 110 106 98 102 95 96 Z`,
  },
  // Europe (Iberia → France → UK → Balkans)
  {
    id: 'europe',
    d: `M 68 128
        C 80 112 98 105 120 104
        C 140 104 156 110 162 120
        C 164 126 160 130 152 133
        C 140 137 122 140 104 138
        C 86 135 68 128 68 128 Z`,
  },
  // Anatolia + Caucasus + Iran (Europe → Arabia bridge)
  {
    id: 'anatolia',
    d: `M 162 120
        C 180 110 208 108 235 112
        C 258 116 275 126 280 138
        C 268 143 248 140 224 138
        C 200 136 178 132 162 120 Z`,
  },
  // Arabian Peninsula — tapers south to a point
  {
    id: 'arabia',
    d: `M 216 140
        C 238 132 264 136 280 148
        C 288 158 286 172 278 183
        C 268 193 250 198 232 192
        C 216 185 208 171 208 157
        C 208 150 212 143 216 140 Z`,
  },
  // Pakistan + Afghanistan corridor into India
  {
    id: 'pakistan',
    d: `M 280 138
        C 298 132 326 134 342 146
        C 341 158 328 165 312 168
        C 296 168 282 160 275 150 Z`,
  },
  // India — triangular subcontinent pointing south (highlighted separately)
  // SE Asia mainland: Myanmar, Thailand, Indochina, Malay Peninsula
  {
    id: 'seasia_main',
    d: `M 336 154
        C 355 147 376 151 386 166
        C 392 180 388 200 378 216
        C 366 230 350 240 338 244
        C 326 244 318 234 318 220
        C 316 204 322 178 336 154 Z`,
  },
  // Malay Peninsula + Indonesia islands (Sumatra, Java, Borneo)
  {
    id: 'seasia_islands',
    d: `M 338 244
        C 344 252 348 260 345 270
        C 342 278 334 282 325 278
        C 350 268 372 272 380 288
        C 378 306 360 315 338 313
        C 316 310 307 297 316 283
        C 322 272 332 256 338 244 Z`,
  },
  // Africa — full eastern + southern extent visible from Indian Ocean
  {
    id: 'africa',
    d: `M 100 155
        C 118 142 148 140 175 146
        C 198 152 216 168 220 188
        C 222 208 218 232 208 255
        C 196 280 178 300 158 312
        C 136 322 112 315 98 296
        C 85 278 82 254 86 228
        C 90 202 94 174 100 155 Z`,
  },
  // Madagascar (small island east of Africa)
  {
    id: 'madagascar',
    d: `M 178 305 C 184 298 192 300 194 308 C 194 318 186 323 180 318 C 175 312 174 308 178 305 Z`,
  },
  // Sri Lanka (island south of India)
  {
    id: 'srilanka',
    d: `M 296 278 C 302 272 310 274 312 281 C 312 289 306 294 300 291 C 295 288 293 283 296 278 Z`,
  },
]

// India path highlighted separately in teal
const INDIA_PATH = `M 268 172
  C 280 160 300 159 319 169
  C 332 180 332 204 322 230
  C 312 254 298 271 288 278
  C 278 270 266 252 260 230
  C 254 210 255 191 268 172 Z`

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
            {/* Deep ocean gradient */}
            <radialGradient id="globeGrad" cx="40%" cy="38%" r="62%">
              <stop offset="0%"   stopColor="#0a2540" />
              <stop offset="55%"  stopColor="#041320" />
              <stop offset="100%" stopColor="#020c16" />
            </radialGradient>
            {/* Atmosphere rim */}
            <radialGradient id="atmoGrad" cx="50%" cy="50%" r="50%">
              <stop offset="80%"  stopColor="transparent" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.20" />
            </radialGradient>
            {/* India glow */}
            <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#0FFFC1" stopOpacity="0.30" />
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
          </defs>

          {/* Ocean base */}
          <circle cx={CX} cy={CY} r={R} fill="url(#globeGrad)" />

          {/* Physical land masses */}
          <g clipPath="url(#globeClip)">
            {LAND.map(lm => (
              <path
                key={lm.id}
                d={lm.d}
                fill="#0f3248"
                stroke="#1e5070"
                strokeWidth="0.9"
                fillOpacity={1}
                strokeOpacity={0.6}
              />
            ))}
            {/* India — glowing teal */}
            <path
              d={INDIA_PATH}
              fill="#0FFFC1"
              stroke="#0FFFC1"
              strokeWidth="1"
              fillOpacity={0.20}
              strokeOpacity={0.60}
            />
          </g>

          {/* Lat/lon grid over land */}
          <g clipPath="url(#globeClip)" opacity={0.22}>
            {lats.map(lat => <LatLine key={lat} lat={lat} />)}
            {lngs.map(lng => (
              <ellipse
                key={lng}
                cx={CX} cy={CY}
                rx={R * 0.18} ry={R}
                stroke="#163a52" strokeWidth="0.6" fill="none"
                transform={`rotate(${lng} ${CX} ${CY})`}
              />
            ))}
          </g>

          {/* Atmosphere rim */}
          <circle cx={CX} cy={CY} r={R} fill="url(#atmoGrad)" />

          {/* Globe edge */}
          <circle cx={CX} cy={CY} r={R} fill="none"
            stroke="#1e4068" strokeWidth="1.5" />

          {/* Capital flow lines → India */}
          <g clipPath="url(#globeClip)">
            {SOURCES.map((src, i) => (
              <FlowLine key={i} sx={src.x} sy={src.y} delay={i * 0.8} />
            ))}
          </g>

          {/* India glow halo */}
          <circle cx={INDIA.x} cy={INDIA.y} r={34} fill="url(#indiaGlow)" />

          {/* India pulse ring */}
          <motion.circle
            cx={INDIA.x} cy={INDIA.y} r={14}
            stroke="#0FFFC1" strokeWidth="1.5" fill="none"
            animate={{ r: [10, 24], opacity: [0.8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />

          {/* India dot */}
          <circle cx={INDIA.x} cy={INDIA.y} r={5} fill="#0FFFC1" filter="url(#glow)" />
          <circle cx={INDIA.x} cy={INDIA.y} r={3} fill="#ffffff" />

          {/* India label */}
          <text x={INDIA.x + 9} y={INDIA.y - 9}
            fill="#0FFFC1" fontSize="9.5" fontFamily="system-ui, sans-serif"
            fontWeight="700" letterSpacing="0.02em" opacity={0.9}>
            India
          </text>

          {/* Source city dots + full names */}
          {SOURCES.map((src, i) => {
            // For left-edge cities (SF, NY) labels go right; others go right too
            const labelX = src.x < 100 ? src.x + 6 : src.x + 6
            const labelY = src.y - 6
            return (
              <g key={i}>
                <circle cx={src.x} cy={src.y} r={2.8} fill="#4a8faf" opacity={0.85} />
                <text
                  x={labelX}
                  y={labelY}
                  fill="#5aaed0"
                  fontSize="8.5"
                  fontFamily="system-ui, sans-serif"
                  opacity={0.80}
                >
                  {src.label}
                </text>
              </g>
            )
          })}

          {/* Specular highlight */}
          <ellipse cx={CX - 65} cy={CY - 78} rx={52} ry={32}
            fill="white" opacity={0.04}
            transform="rotate(-20 235 172)" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
