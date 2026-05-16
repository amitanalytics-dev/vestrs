'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { target: 112, prefix: '', suffix: '', label: 'Unicorns Created' },
  { target: 450, prefix: '$', suffix: 'B+', label: 'Combined Valuation' },
  { target: 500, prefix: '', suffix: 'x', label: 'Peak Early Return' },
  { target: 1.4, prefix: '', suffix: 'B', label: 'Indians Online' },
]

function AnimatedNumber({
  target,
  prefix,
  suffix,
  duration = 1800,
}: {
  target: number
  prefix: string
  suffix: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(parseFloat((eased * target).toFixed(target < 10 ? 1 : 0)))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  const formatted =
    target < 10
      ? display.toFixed(1)
      : Math.round(display).toLocaleString()

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

export default function StatsStrip() {
  return (
    <section className="w-full bg-[#040B14] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/[0.06]">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col justify-center border-l-4 border-[#D4AF37] px-8 py-10"
            >
              <div className="text-5xl font-black text-white leading-none mb-2 tabular-nums">
                <AnimatedNumber
                  target={s.target}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </div>
              <div className="text-slate-500 text-xs uppercase tracking-widest font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
