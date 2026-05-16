'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  {
    borderColor: 'border-emerald-500',
    bgOrb: 'bg-emerald-500/[0.07]',
    statColor: 'text-gradient-teal',
    label: '01',
    labelColor: 'text-emerald-400 bg-emerald-500/10',
    title: 'Digital rails, built at scale',
    rawStat: 18,
    prefix: '',
    suffix: 'B',
    statLabel: 'UPI transactions / month',
    bullets: [
      'UPI: 18B monthly transactions, growing 40% YoY.',
      'Aadhaar covers 1.4B identities — digital by default.',
      'Built in 5 years what took the US 30.',
    ],
  },
  {
    borderColor: 'border-violet-500',
    bgOrb: 'bg-violet-500/[0.07]',
    statColor: 'text-gradient-purple',
    label: '02',
    labelColor: 'text-violet-400 bg-violet-500/10',
    title: '350 million middle class. Growing.',
    rawStat: 350,
    prefix: '',
    suffix: 'M',
    statLabel: 'new consumers entering',
    bullets: [
      'More new consumers this decade than the entire US.',
      'Fintech, health, food, logistics — all rebuilding from scratch.',
      'Category leaders not yet decided. Entry cost still low.',
    ],
  },
  {
    borderColor: 'border-amber-500',
    bgOrb: 'bg-amber-500/[0.07]',
    statColor: 'text-gradient-amber',
    label: '03',
    labelColor: 'text-amber-400 bg-amber-500/10',
    title: 'The founder quality shift',
    rawStat: 3,
    prefix: '',
    suffix: 'x',
    statLabel: 'unicorn creation rate (5yr)',
    bullets: [
      'Ex-Google, ex-Meta, ex-McKinsey choosing India over the Valley.',
      'IIT graduates staying home. Talent compounding locally.',
      'Unicorn creation rate tripled in the last five years.',
    ],
  },
]

function AnimatedStat({
  target,
  prefix,
  suffix,
}: {
  target: number
  prefix: string
  suffix: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)
  const isDecimal = target < 10 && !Number.isInteger(target)

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const interval = 1800 / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 3)
      setDisplay(parseFloat((eased * target).toFixed(isDecimal ? 1 : 0)))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target, isDecimal])

  const formatted = isDecimal ? display.toFixed(1) : Math.round(display).toString()

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

export default function WhyIndia() {
  return (
    <section id="why-india" className="relative py-32 bg-[#07101D] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">
            The Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl leading-tight text-white">
            Three structural shifts that make India inevitable.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className={`relative bg-white/[0.04] border-t-4 ${card.borderColor} border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 overflow-hidden group`}
            >
              {/* Card orb */}
              <div className={`absolute -top-8 -right-8 w-40 h-40 ${card.bgOrb} rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100`} />

              <div className="relative z-10 mb-5">
                <div className={`text-5xl md:text-6xl font-black leading-none tabular-nums ${card.statColor}`}>
                  <AnimatedStat
                    target={card.rawStat}
                    prefix={card.prefix}
                    suffix={card.suffix}
                  />
                </div>
                <div className="text-slate-500 text-xs mt-1">{card.statLabel}</div>
              </div>

              <h3 className="relative z-10 text-base font-bold mb-4 text-white">{card.title}</h3>
              <ul className="relative z-10 space-y-2">
                {card.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2 text-slate-400 text-sm leading-snug">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-500 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
