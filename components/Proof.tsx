'use client'

import { motion } from 'framer-motion'

const companies = [
  { name: 'Flipkart', initial: 'F', color: '#F57224', bg: '#FFF4ED', tagline: 'Two-person book delivery in Bangalore.', outcome: 'Walmart acquisition', value: '$16B' },
  { name: 'Zomato', initial: 'Z', color: '#E23744', bg: '#FFF1F2', tagline: 'Built in a market everyone said was too chaotic.', outcome: 'IPO market cap', value: '$14B' },
  { name: 'Freshworks', initial: 'F', color: '#25C16F', bg: '#F0FDF4', tagline: 'First Indian SaaS on Nasdaq. Built from Chennai.', outcome: 'ARR + Nasdaq IPO', value: '$1B+' },
  { name: 'Zerodha', initial: 'Z', color: '#387ED1', bg: '#EFF6FF', tagline: 'Zero external funding. Profitable from year one.', outcome: 'Bootstrapped valuation', value: '$3.6B' },
  { name: 'Razorpay', initial: 'R', color: '#3395FF', bg: '#EFF6FF', tagline: 'Rejected by YC. Got in the next batch.', outcome: 'Valuation · 8M+ businesses', value: '$7.5B' },
  { name: 'CRED', initial: 'C', color: '#7C3AED', bg: '#F5F3FF', tagline: 'Premium fintech in a market obsessed with discounts.', outcome: 'Valuation in under 5 years', value: '$6.4B' },
  { name: 'Nykaa', initial: 'N', color: '#EC4899', bg: '#FDF2F8', tagline: '50-year-old founder disrupted beauty retail.', outcome: 'IPO · profitable D2C', value: '$7.4B' },
  { name: 'Dream11', initial: 'D', color: '#0EA5E9', bg: '#F0F9FF', tagline: 'Survived regulatory crackdowns to win the market.', outcome: "India's first gaming unicorn", value: '$8B' },
  { name: 'InMobi', initial: 'I', color: '#0066CC', bg: '#EFF6FF', tagline: "India's first unicorn. Built before mobile was mainstream.", outcome: 'Valuation · 90+ countries', value: '$12B' },
  { name: 'Paytm', initial: 'P', color: '#00BAF2', bg: '#F0F9FF', tagline: 'Demonetisation turned a wallet into a national utility.', outcome: '350M+ users · super-app', value: '350M' },
]

export default function Proof() {
  return (
    <section id="proof" className="py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-violet-600 text-xs font-bold tracking-[0.2em] uppercase">
            Signals, Not Exceptions
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-[#0F172A]"
        >
          The exits have already started.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-400 text-base mb-16"
        >
          Ten companies. Ten proof points. One pattern.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {companies.map((co, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
            >
              {/* Brand-colored logo badge */}
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm"
                  style={{ background: co.bg, color: co.color }}
                >
                  {co.initial}
                </div>
                <span className="font-semibold text-sm text-[#0F172A] truncate">{co.name}</span>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
                {co.tagline}
              </p>

              <div className="border-t border-slate-100 pt-3">
                <div
                  className="font-black text-xl leading-none"
                  style={{ color: co.color }}
                >
                  {co.value}
                </div>
                <div className="text-slate-400 text-xs mt-1 leading-tight">{co.outcome}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-slate-400 text-sm mt-10"
        >
          Early investors in each of these made 50x–200x. The next wave is forming now.
        </motion.p>
      </div>
    </section>
  )
}
