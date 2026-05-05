'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    label: '01',
    title: 'Digital rails, built at scale',
    body: 'UPI processed 18 billion transactions last month. Aadhaar covers 1.4 billion identities. India built in 5 years what took the US 30. The plumbing is done.',
    stat: '18B',
    statLabel: 'UPI transactions / month',
  },
  {
    label: '02',
    title: '350 million middle class. Growing.',
    body: 'India will add more middle-class consumers in the next decade than the entire population of the US. Every category — fintech, health, food, logistics — is being rebuilt from scratch.',
    stat: '350M',
    statLabel: 'new consumers entering',
  },
  {
    label: '03',
    title: 'The founder quality shift',
    body: 'Ex-Google, ex-Meta, ex-McKinsey founders are choosing India. IIT graduates are no longer defaulting to the Valley. The talent is compounding at home.',
    stat: '3x',
    statLabel: 'unicorn creation rate (5yr)',
  },
]

export default function WhyIndia() {
  return (
    <section id="why-india" className="py-32 bg-[#030d1a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-[#0FFFC1] text-xs font-bold tracking-[0.2em] uppercase">
            The Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl leading-tight">
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
              className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-[#0FFFC1]/25 transition-colors duration-300 group overflow-hidden"
            >
              <div className="absolute top-6 right-6 text-[#0FFFC1]/10 text-6xl font-black leading-none select-none">
                {card.label}
              </div>

              <div className="mb-6">
                <div className="text-3xl font-black text-[#0FFFC1] leading-none">
                  {card.stat}
                </div>
                <div className="text-white/35 text-xs mt-1">{card.statLabel}</div>
              </div>

              <h3 className="text-lg font-bold mb-3 leading-snug">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
