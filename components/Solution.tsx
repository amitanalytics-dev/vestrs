'use client'

import { motion } from 'framer-motion'

const features = [
  {
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderHover: 'hover:border-emerald-200',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: 'Curated deal flow',
    body: 'We review 300+ startups each quarter and surface only those with institutional-grade fundamentals, proven unit economics, and global expansion potential. No noise — just your next high-conviction bet.',
  },
  {
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderHover: 'hover:border-violet-200',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Cross-border compliance, fully handled',
    body: 'FEMA, RBI approval layers, PFIC classification, FBAR reporting, tax treaty navigation, cap table structuring — all of it handled end-to-end. You sign off on the investment. We handle everything else.',
  },
  {
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderHover: 'hover:border-sky-200',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'Institutional-grade access',
    body: "First-access to pre-Series A and Series A rounds that India's top 10 VC firms see first. Now available to global angels and family offices — without needing a Mumbai office or a local GP relationship.",
  },
  {
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderHover: 'hover:border-amber-200',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Founder-first network',
    body: 'Direct video access to founders — ask them anything. No carry, no management fees, no fund structure. Vestrs is a platform for conviction-based investing, not a intermediary adding a layer between you and the deal.',
  },
]

export default function Solution() {
  return (
    <section id="solution" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-sky-600 text-xs font-bold tracking-[0.2em] uppercase">The Solution</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-[#0F172A]"
        >
          Vestrs is the access layer to India&apos;s startup economy.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-400 text-base mb-16"
        >
          We eliminate every barrier between you and the deal.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`flex gap-5 bg-white border border-slate-200 ${f.borderHover} rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className={`w-10 h-10 rounded-xl ${f.iconBg} ${f.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-bold mb-2 text-[#0F172A]">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
