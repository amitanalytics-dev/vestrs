'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    borderColor: 'border-emerald-500',
    bgOrb: 'bg-emerald-500/[0.07]',
    statColor: 'text-gradient-teal',
    label: '01',
    labelColor: 'text-emerald-400 bg-emerald-500/10',
    title: 'Digital rails, built at scale',
    body: 'UPI processed 18 billion transactions last month. Aadhaar covers 1.4 billion identities. India built in 5 years what took the US 30. The plumbing is done.',
    stat: '18B',
    statLabel: 'UPI transactions / month',
  },
  {
    borderColor: 'border-violet-500',
    bgOrb: 'bg-violet-500/[0.07]',
    statColor: 'text-gradient-purple',
    label: '02',
    labelColor: 'text-violet-400 bg-violet-500/10',
    title: '350 million middle class. Growing.',
    body: 'India will add more middle-class consumers in the next decade than the entire population of the US. Every category — fintech, health, food, logistics — is being rebuilt from scratch.',
    stat: '350M',
    statLabel: 'new consumers entering',
  },
  {
    borderColor: 'border-amber-500',
    bgOrb: 'bg-amber-500/[0.07]',
    statColor: 'text-gradient-amber',
    label: '03',
    labelColor: 'text-amber-400 bg-amber-500/10',
    title: 'The founder quality shift',
    body: 'Ex-Google, ex-Meta, ex-McKinsey founders are choosing India. IIT graduates are no longer defaulting to the Valley. The talent is compounding at home.',
    stat: '3x',
    statLabel: 'unicorn creation rate (5yr)',
  },
]

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

              <div className={`relative z-10 inline-flex items-center justify-center w-8 h-8 rounded-lg ${card.labelColor} text-xs font-black mb-5`}>
                {card.label}
              </div>

              <div className="relative z-10 mb-5">
                <div className={`text-4xl font-black leading-none ${card.statColor}`}>
                  {card.stat}
                </div>
                <div className="text-slate-500 text-xs mt-1">{card.statLabel}</div>
              </div>

              <h3 className="relative z-10 text-base font-bold mb-3 text-white">{card.title}</h3>
              <p className="relative z-10 text-slate-400 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
