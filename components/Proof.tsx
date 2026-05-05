'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const companies = [
  {
    name: 'Flipkart',
    domain: 'flipkart.com',
    tagline: 'Started as a two-person book delivery operation in Bangalore.',
    outcome: 'Walmart acquisition',
    value: '$16B',
  },
  {
    name: 'Zomato',
    domain: 'zomato.com',
    tagline: 'Built in a market everyone said was too chaotic to win.',
    outcome: 'IPO market cap',
    value: '$14B',
  },
  {
    name: 'Freshworks',
    domain: 'freshworks.com',
    tagline: 'First Indian SaaS company to list on Nasdaq. Built from Chennai.',
    outcome: 'ARR + Nasdaq IPO',
    value: '$1B+',
  },
  {
    name: 'Zerodha',
    domain: 'zerodha.com',
    tagline: 'Zero external funding. Profitable from year one.',
    outcome: 'Bootstrapped valuation',
    value: '$3.6B',
  },
  {
    name: 'Razorpay',
    domain: 'razorpay.com',
    tagline: 'Two IIT Roorkee graduates. Rejected by YC. Got in the next batch.',
    outcome: 'Valuation · 8M+ businesses',
    value: '$7.5B',
  },
  {
    name: 'CRED',
    domain: 'cred.club',
    tagline: 'Built a premium fintech brand in a market obsessed with discounts.',
    outcome: 'Valuation in under 5 years',
    value: '$6.4B',
  },
  {
    name: 'Nykaa',
    domain: 'nykaa.com',
    tagline: 'A 50-year-old founder disrupted beauty retail in India from scratch.',
    outcome: 'IPO · profitable D2C',
    value: '$7.4B',
  },
  {
    name: 'Dream11',
    domain: 'dream11.com',
    tagline: 'Survived regulatory crackdowns to become India\'s first gaming unicorn.',
    outcome: 'Valuation · profitable',
    value: '$8B',
  },
  {
    name: 'InMobi',
    domain: 'inmobi.com',
    tagline: "India's first unicorn. Built a global mobile ad network before mobile was mainstream.",
    outcome: 'Valuation · 90+ countries',
    value: '$12B',
  },
  {
    name: 'Paytm',
    domain: 'paytm.com',
    tagline: 'Demonetisation turned a small wallet into a national financial utility overnight.',
    outcome: '350M+ users · super-app',
    value: '350M',
  },
]

function CompanyLogo({ name, domain }: { name: string; domain: string }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="relative w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
      <span className="text-white/50 font-bold text-sm z-0">{name[0]}</span>
      {!imgFailed && (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain p-1.5"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  )
}

export default function Proof() {
  return (
    <section id="proof" className="py-32 bg-[#051628]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="text-[#0FFFC1] text-xs font-bold tracking-[0.2em] uppercase">
            Signals, Not Exceptions
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center mb-3"
        >
          <h2 className="text-4xl md:text-5xl font-bold">The exits have already started.</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-white/40 text-base mb-16"
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
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 hover:border-[#0FFFC1]/25 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <CompanyLogo name={co.name} domain={co.domain} />
                <span className="font-semibold text-sm truncate">{co.name}</span>
              </div>

              <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-3">
                {co.tagline}
              </p>

              <div className="border-t border-white/[0.08] pt-3">
                <div className="text-[#0FFFC1] font-black text-xl leading-none">
                  {co.value}
                </div>
                <div className="text-white/35 text-xs mt-1 leading-tight">{co.outcome}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/35 text-sm mt-10"
        >
          Early investors in each of these made 50x–200x. The next wave is forming now.
        </motion.p>
      </div>
    </section>
  )
}
