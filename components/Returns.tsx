'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  {
    value: '$1T+',
    label: "India's startup ecosystem valuation by 2030",
    source: 'NASSCOM',
  },
  {
    value: '47x',
    label: 'Median return multiple for top-quartile India venture funds',
    source: '2012–2022',
  },
  {
    value: '$8.4B',
    label: 'Foreign VC investment into India in 2023 alone — and growing',
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
      className="text-center bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 hover:border-[#0FFFC1]/20 transition-colors duration-300"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 120 }}
        className="text-5xl md:text-6xl font-black text-[#0FFFC1] mb-4 leading-none"
      >
        {stat.value}
      </motion.div>
      <p className="text-white/50 text-sm leading-relaxed mb-2">{stat.label}</p>
      <span className="text-white/20 text-xs">{stat.source}</span>
    </motion.div>
  )
}

export default function Returns() {
  return (
    <section className="py-32 bg-[#030d1a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="text-[#0FFFC1] text-xs font-bold tracking-[0.2em] uppercase">
            The Returns
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center mb-3"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Venture math works differently in emerging markets.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-white/40 text-base mb-16"
        >
          Lower entry valuations. Faster growth curves. Asymmetric upside.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xl text-white/60 max-w-xl mx-auto leading-relaxed"
        >
          You don&apos;t need India to replace your portfolio.{' '}
          <span className="text-white font-semibold">
            You need it to stop being the gap in it.
          </span>
        </motion.p>
      </div>
    </section>
  )
}
