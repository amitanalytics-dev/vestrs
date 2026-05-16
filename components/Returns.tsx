'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const unicorns = [
  { name: 'Freshworks', value: 500, color: '#25c16f' },
  { name: 'Flipkart',   value: 400, color: '#1e88e5' },
  { name: 'Zomato',     value: 200, color: '#e23744' },
  { name: 'Razorpay',   value: 150, color: '#2eb5c1' },
  { name: 'Meesho',     value: 100, color: '#9b5de5' },
  { name: 'Nykaa',      value: 100, color: '#fc4f8c' },
  { name: 'BYJU\'S',    value: 80,  color: '#0b3d91' },
  { name: 'CRED',       value: 80,  color: '#6366f1' },
  { name: 'PhonePe',    value: 50,  color: '#7c3aed' },
  { name: 'Dream11',    value: 50,  color: '#e63946' },
]

const MAX_VAL = 500

const stats = [
  {
    value: '$1T+',
    gradient: 'text-gradient-teal',
    borderColor: 'border-t-4 border-emerald-500',
    accentOrb: 'bg-emerald-500/[0.07]',
    label: "India's startup ecosystem valuation by 2030",
    source: 'NASSCOM',
  },
  {
    value: '47x',
    gradient: 'text-gradient-amber',
    borderColor: 'border-t-4 border-amber-500',
    accentOrb: 'bg-amber-500/[0.07]',
    label: 'Median return multiple for top-quartile India venture funds',
    source: '2012–2022',
  },
  {
    value: '$8.4B',
    gradient: 'text-gradient-purple',
    borderColor: 'border-t-4 border-violet-500',
    accentOrb: 'bg-violet-500/[0.07]',
    label: 'Foreign VC investment into India in 2023 alone',
    source: 'YTD 2023',
  },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className={`relative text-center bg-white/[0.04] ${stat.borderColor} border border-white/[0.08] rounded-2xl p-10 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 overflow-hidden group cursor-default`}
    >
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 ${stat.accentOrb} rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 120 }}
        className={`relative z-10 text-5xl md:text-6xl font-black mb-4 leading-none ${stat.gradient}`}
      >
        {stat.value}
      </motion.div>
      <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-2">{stat.label}</p>
      <span className="relative z-10 text-slate-600 text-xs">{stat.source}</span>
    </motion.div>
  )
}

function UnicornChart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 mb-14">
      <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">
        Top India Unicorn Returns — Early Investors
      </p>
      <div className="flex flex-col gap-2">
        {unicorns.map((u, i) => {
          const widthPct = (u.value / MAX_VAL) * 100
          return (
            <div key={u.name} className="flex items-center gap-3">
              {/* Company name */}
              <span className="text-slate-400 text-xs font-medium w-20 flex-shrink-0 text-right">
                {u.name}
              </span>
              {/* Bar */}
              <div className="flex-1 h-5 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: u.color }}
                  initial={{ width: '0%' }}
                  animate={inView ? { width: `${widthPct}%` } : { width: '0%' }}
                  transition={{
                    duration: 1.0,
                    delay: 0.1 + i * 0.07,
                    ease: 'easeOut',
                  }}
                />
              </div>
              {/* Label */}
              <span className="text-xs font-black text-white w-12 flex-shrink-0">
                {u.value}x
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Returns() {
  return (
    <section id="returns" className="relative py-32 bg-[#07101D] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">The Returns</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-white"
        >
          Venture math works differently in emerging markets.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 text-base mb-16"
        >
          Lower entry valuations. Faster growth curves. Asymmetric upside.
        </motion.p>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <UnicornChart />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {stats.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xl text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          You don&apos;t need India to replace your portfolio.{' '}
          <span className="text-white font-bold">You need it to stop being the gap in it.</span>
        </motion.p>
      </div>
    </section>
  )
}
