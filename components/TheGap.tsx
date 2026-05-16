'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    number: '01',
    icon: '🔒',
    accentColor: '#F87171',
    borderClass: 'border-l-4 border-red-400',
    labelClass: 'text-red-400',
    stat: '95% of rounds close offline.',
    desc: 'Top deals live in WhatsApp groups and warm VC intros. Not AngelList.',
    closer: 'Vestrs is already in those rooms. You plug straight in.',
  },
  {
    number: '02',
    icon: '🗺️',
    accentColor: '#FBBF24',
    borderClass: 'border-l-4 border-amber-400',
    labelClass: 'text-amber-400',
    stat: '28 states. 200+ cities.',
    desc: 'Every market moves differently. Local knowledge isn\'t optional.',
    closer: 'Vestrs gives you local depth without needing a local office.',
  },
  {
    number: '03',
    icon: '⚖️',
    accentColor: '#A78BFA',
    borderClass: 'border-l-4 border-violet-400',
    labelClass: 'text-violet-400',
    stat: '2 regulatory systems.',
    desc: 'FEMA + RBI on India side. PFIC + FBAR on US side. Most investors quit here.',
    closer: 'Vestrs handles all of it. You just invest.',
  },
]

export default function TheGap() {
  return (
    <section id="the-gap" className="relative py-32 bg-[#07101D] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-red-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl leading-tight text-white">
            Global investors know India is happening.{' '}
            <span className="text-gradient-teal">They just can&apos;t get in.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -3 }}
              className={`flex flex-col bg-white/[0.04] ${p.borderClass} border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300`}
            >
              {/* Icon */}
              <div className="text-4xl mb-5 leading-none">{p.icon}</div>

              {/* Big stat */}
              <div className="text-xl font-black text-white mb-3 leading-snug">
                {p.stat}
              </div>

              {/* Short description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {p.desc}
              </p>

              {/* Closer */}
              <div className="border-t border-white/[0.08] pt-4">
                <p className="text-slate-300 text-sm italic font-medium">{p.closer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
