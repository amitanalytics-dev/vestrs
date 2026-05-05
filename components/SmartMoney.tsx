'use client'

import { motion } from 'framer-motion'

const quotes = [
  {
    quote: "India is where China was in 2010–2012. We are watching the birth of a $1 trillion startup ecosystem. The founders are world-class, the market is massive, and the digital infrastructure is finally ready. This is the single biggest opportunity in global venture today.",
    author: "Sequoia India",
    role: "Largest VC fund by AUM in India · 25+ unicorns backed",
    accentColor: 'border-emerald-500/40',
    textAccent: 'text-emerald-400',
    bg: 'bg-emerald-950/30',
  },
  {
    quote: "India is one of the most exciting investment destinations we have ever seen. The pace at which billion-dollar companies are being created here — across fintech, SaaS, consumer, logistics — is unlike anything we saw in the US or China at a comparable stage.",
    author: "Tiger Global Management",
    role: "$7B+ deployed in Indian startups · 50+ portfolio companies",
    accentColor: 'border-sky-500/40',
    textAccent: 'text-sky-400',
    bg: 'bg-sky-950/30',
  },
  {
    quote: "The quality of founders building in India today is exceptional. They are technically strong, globally aware, and solving real problems at scale. The talent density is on par with Silicon Valley — but the valuations and opportunity are far more compelling.",
    author: "Lightspeed Venture Partners",
    role: "Invested in Oyo, ShareChat, Udaan · $1.5B India AUM",
    accentColor: 'border-violet-500/40',
    textAccent: 'text-violet-400',
    bg: 'bg-violet-950/30',
  },
]

const reports = [
  {
    source: 'NASSCOM',
    title: 'India Startup Ecosystem Report',
    year: '2024',
    finding: '112+ unicorns · $450B+ combined valuation · 3rd largest startup ecosystem globally',
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  {
    source: 'Bain & Company',
    title: 'India Private Equity & VC Report',
    year: '2024',
    finding: 'India received $8.4B in VC investment in 2023 · 40% of capital from foreign LPs',
    color: 'text-sky-400',
    border: 'border-sky-500/20',
  },
  {
    source: 'Google × KPMG',
    title: 'e-Conomy India',
    year: '2023',
    finding: "India's internet economy projected to reach $1 trillion by 2030 · 850M online users",
    color: 'text-violet-400',
    border: 'border-violet-500/20',
  },
]

export default function SmartMoney() {
  return (
    <section id="smart-money" className="relative py-32 bg-[#07101D] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-sky-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-sky-400 text-xs font-bold tracking-[0.2em] uppercase">What Smart Money Says</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-white"
        >
          The world&apos;s best investors are already betting on India.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 text-base mb-16"
        >
          Global institutions with billions on the line have made their call.
        </motion.p>

        {/* Quotes */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className={`relative ${q.bg} border ${q.accentColor} rounded-2xl p-7 hover:border-opacity-60 transition-all duration-300`}
            >
              {/* Quote mark */}
              <div className={`text-5xl font-black leading-none mb-4 ${q.textAccent} opacity-40`}>&ldquo;</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                {q.quote}
              </p>
              <div className="border-t border-white/8 pt-4">
                <div className={`font-bold text-sm ${q.textAccent}`}>{q.author}</div>
                <div className="text-slate-500 text-xs mt-1">{q.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase text-center mb-8">
            Research & Reports
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {reports.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className={`bg-white/[0.03] border ${r.border} rounded-xl p-5 hover:bg-white/[0.06] transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black tracking-wider uppercase ${r.color}`}>{r.source}</span>
                <span className="text-slate-600 text-xs">{r.year}</span>
              </div>
              <h4 className="text-white text-sm font-semibold mb-2">{r.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{r.finding}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
