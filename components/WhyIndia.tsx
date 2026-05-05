'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    color: 'emerald',
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    statColor: 'text-gradient-teal',
    label: '01',
    title: 'Digital rails, built at scale',
    body: 'UPI processed 18 billion transactions last month. Aadhaar covers 1.4 billion identities. India built in 5 years what took the US 30. The plumbing is done.',
    stat: '18B',
    statLabel: 'UPI transactions / month',
  },
  {
    color: 'violet',
    borderColor: 'border-violet-400',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    statColor: 'text-gradient-purple',
    label: '02',
    title: '350 million middle class. Growing.',
    body: 'India will add more middle-class consumers in the next decade than the entire population of the US. Every category — fintech, health, food, logistics — is being rebuilt from scratch.',
    stat: '350M',
    statLabel: 'new consumers entering',
  },
  {
    color: 'amber',
    borderColor: 'border-amber-400',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    statColor: 'text-gradient-amber',
    label: '03',
    title: 'The founder quality shift',
    body: 'Ex-Google, ex-Meta, ex-McKinsey founders are choosing India. IIT graduates are no longer defaulting to the Valley. The talent is compounding at home.',
    stat: '3x',
    statLabel: 'unicorn creation rate (5yr)',
  },
]

export default function WhyIndia() {
  return (
    <section id="why-india" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-emerald-600 text-xs font-bold tracking-[0.2em] uppercase">
            The Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl leading-tight text-[#0F172A]">
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
              className={`relative bg-white border-t-4 ${card.borderColor} rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${card.bgColor} ${card.textColor} text-xs font-black mb-5`}>
                {card.label}
              </div>

              <div className="mb-5">
                <div className={`text-4xl font-black leading-none ${card.statColor}`}>
                  {card.stat}
                </div>
                <div className="text-slate-400 text-xs mt-1">{card.statLabel}</div>
              </div>

              <h3 className="text-base font-bold mb-3 text-[#0F172A]">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
