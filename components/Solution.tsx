'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: 'Curated deal flow',
    body: 'We filter thousands of startups to surface only the ones with institutional-grade fundamentals.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Cross-border compliance',
    body: 'FEMA, RBI, PFIC structuring, FBAR guidance, tax treaty navigation — handled. You invest. We handle the paperwork.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'Institutional-grade access',
    body: 'The same deals seen by top Indian VCs. Now available to global angels and family offices.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Founder-first network',
    body: 'Direct access to founders. Not a fund. Not a middleman. A platform built for direct conviction investing.',
  },
]

export default function Solution() {
  return (
    <section id="solution" className="py-32 bg-[#051628]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="text-[#0FFFC1] text-xs font-bold tracking-[0.2em] uppercase">
            The Solution
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
            Vestrs is the access layer to India&apos;s startup economy.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-white/45 text-base mb-16"
        >
          We handle everything between you and the deal.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-[#0FFFC1]/20 transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0FFFC1]/10 flex items-center justify-center text-[#0FFFC1] flex-shrink-0 group-hover:bg-[#0FFFC1]/15 transition-colors duration-300">
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
