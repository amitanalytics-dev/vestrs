'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '$1T+', gradient: 'text-gradient-teal', borderColor: 'border-t-4 border-emerald-400', label: "India's startup ecosystem valuation by 2030", source: 'NASSCOM' },
  { value: '47x', gradient: 'text-gradient-amber', borderColor: 'border-t-4 border-amber-400', label: 'Median return multiple for top-quartile India venture funds', source: '2012–2022' },
  { value: '$8.4B', gradient: 'text-gradient-purple', borderColor: 'border-t-4 border-violet-400', label: 'Foreign VC investment into India in 2023 alone', source: 'YTD 2023' },
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
      className={`text-center bg-white ${stat.borderColor} rounded-2xl p-10 shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 120 }}
        className={`text-5xl md:text-6xl font-black mb-4 leading-none ${stat.gradient}`}
      >
        {stat.value}
      </motion.div>
      <p className="text-slate-500 text-sm leading-relaxed mb-2">{stat.label}</p>
      <span className="text-slate-300 text-xs">{stat.source}</span>
    </motion.div>
  )
}

export default function Returns() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase">The Returns</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-[#0F172A]"
        >
          Venture math works differently in emerging markets.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-400 text-base mb-16"
        >
          Lower entry valuations. Faster growth curves. Asymmetric upside.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {stats.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xl text-slate-500 max-w-xl mx-auto leading-relaxed"
        >
          You don&apos;t need India to replace your portfolio.{' '}
          <span className="text-[#0F172A] font-bold">You need it to stop being the gap in it.</span>
        </motion.p>
      </div>
    </section>
  )
}
