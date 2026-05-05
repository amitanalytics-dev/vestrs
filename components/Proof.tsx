'use client'

import { motion } from 'framer-motion'

const companies = [
  {
    name: 'Flipkart', domain: 'flipkart.com', initial: 'F', color: '#F97316', bg: 'rgba(249,115,22,0.15)',
    tagline: 'Two-person book delivery → Walmart acquisition for $16B.',
    outcome: 'Walmart acquisition', value: '$16B',
  },
  {
    name: 'Zomato', domain: 'zomato.com', initial: 'Z', color: '#F87171', bg: 'rgba(248,113,113,0.15)',
    tagline: 'Built in a market everyone said was too chaotic to win.',
    outcome: 'IPO market cap', value: '$14B',
  },
  {
    name: 'Swiggy', domain: 'swiggy.com', initial: 'S', color: '#FB923C', bg: 'rgba(251,146,60,0.13)',
    tagline: "Raced Zomato for India's 1.4B stomachs — then IPO'd in 2024.",
    outcome: 'IPO Nov 2024', value: '$11.3B',
  },
  {
    name: 'PhonePe', domain: 'phonepe.com', initial: 'P', color: '#818CF8', bg: 'rgba(129,140,248,0.12)',
    tagline: "Spun out of Flipkart. Became India's #1 UPI app with 500M+ users.",
    outcome: '500M+ users · UPI leader', value: '$12B',
  },
  {
    name: 'Freshworks', domain: 'freshworks.com', initial: 'F', color: '#34D399', bg: 'rgba(52,211,153,0.12)',
    tagline: 'First Indian SaaS company to list on Nasdaq.',
    outcome: 'Nasdaq IPO', value: '$1B+ ARR',
  },
  {
    name: 'Zerodha', domain: 'zerodha.com', initial: 'Z', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',
    tagline: "Zero external funding. Zero losses. Built India's largest broker.",
    outcome: 'Bootstrapped', value: '$3.6B',
  },
  {
    name: 'Razorpay', domain: 'razorpay.com', initial: 'R', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)',
    tagline: 'Rejected by YC. Got in the next batch. Now powers 8M+ businesses.',
    outcome: '8M+ businesses', value: '$7.5B',
  },
  {
    name: 'CRED', domain: 'cred.club', initial: 'C', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)',
    tagline: 'Built premium fintech in a market obsessed with discounts.',
    outcome: 'Valuation under 5 yrs', value: '$6.4B',
  },
  {
    name: 'Nykaa', domain: 'nykaa.com', initial: 'N', color: '#F472B6', bg: 'rgba(244,114,182,0.12)',
    tagline: '50-year-old founder disrupted beauty retail. IPO at peak profits.',
    outcome: 'IPO · profitable D2C', value: '$7.4B',
  },
  {
    name: 'Dream11', domain: 'dream11.com', initial: 'D', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)',
    tagline: "Survived every regulatory crackdown to become India's #1 gaming platform.",
    outcome: "India's first gaming unicorn", value: '$8B',
  },
  {
    name: 'InMobi', domain: 'inmobi.com', initial: 'I', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',
    tagline: "India's first tech unicorn — built before mobile was even mainstream.",
    outcome: '90+ countries', value: '$12B',
  },
  {
    name: 'Paytm', domain: 'paytm.com', initial: 'P', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)',
    tagline: 'Demonetisation turned a digital wallet into a national utility.',
    outcome: '350M+ users · super-app', value: '350M users',
  },
  {
    name: 'Groww', domain: 'groww.in', initial: 'G', color: '#10B981', bg: 'rgba(16,185,129,0.12)',
    tagline: 'Made stock investing as simple as ordering food. 40M+ investors onboarded.',
    outcome: '40M+ investors', value: '$3B',
  },
  {
    name: 'Delhivery', domain: 'delhivery.com', initial: 'D', color: '#22D3EE', bg: 'rgba(34,211,238,0.12)',
    tagline: "Built India's e-commerce logistics backbone from scratch. IPO'd in 2022.",
    outcome: 'IPO 2022 · logistics OS', value: '$5.5B',
  },
  {
    name: 'Meesho', domain: 'meesho.com', initial: 'M', color: '#F472B6', bg: 'rgba(244,114,182,0.12)',
    tagline: "Turned homemakers into entrepreneurs. India's Tier 2–3 commerce engine.",
    outcome: '140M+ transacting users', value: '$3.9B',
  },
  {
    name: 'Ola Electric', domain: 'olaelectric.com', initial: 'O', color: '#FBBF24', bg: 'rgba(251,191,36,0.12)',
    tagline: "Bet on EVs when everyone said India wasn't ready. IPO proved them wrong.",
    outcome: 'IPO Aug 2024 · EV leader', value: '$4B+',
  },
  {
    name: 'BrowserStack', domain: 'browserstack.com', initial: 'B', color: '#FB923C', bg: 'rgba(251,146,60,0.12)',
    tagline: 'Built developer infra from Mumbai. Google, Microsoft, Twitter pay monthly.',
    outcome: 'Used by Google, MSFT', value: '$4B',
  },
  {
    name: 'Chargebee', domain: 'chargebee.com', initial: 'C', color: '#A78BFA', bg: 'rgba(167,139,250,0.12)',
    tagline: 'India-built SaaS billing platform. The silent engine behind global subscriptions.',
    outcome: 'Global SaaS billing', value: '$3.5B',
  },
  {
    name: 'OfBusiness', domain: 'ofbusiness.in', initial: 'O', color: '#34D399', bg: 'rgba(52,211,153,0.12)',
    tagline: 'Profitable B2B commerce at ₹20,000 Cr+ revenue — while others burned cash.',
    outcome: 'Profitable · ₹20K Cr rev', value: '$5B',
  },
  {
    name: 'PolicyBazaar', domain: 'policybazaar.com', initial: 'P', color: '#38BDF8', bg: 'rgba(56,189,248,0.12)',
    tagline: "Brought transparency to India's opaque insurance market. IPO'd with profit.",
    outcome: 'IPO 2021 · insurance', value: '$3B',
  },
]

export default function Proof() {
  return (
    <section id="proof" className="relative py-32 bg-[#060D18] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase">
            Signals, Not Exceptions
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-white"
        >
          The exits have already started.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 text-base mb-16"
        >
          Twenty companies. Twenty proof points. One pattern.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {companies.map((co, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 cursor-default"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                  style={{ background: co.bg }}
                >
                  <span className="font-black text-sm absolute select-none" style={{ color: co.color }}>
                    {co.initial}
                  </span>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${co.domain}&sz=128`}
                    alt={co.name}
                    width={28} height={28}
                    className="relative z-10 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <span className="font-semibold text-sm text-white truncate">{co.name}</span>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">{co.tagline}</p>

              <div className="border-t border-white/8 pt-3">
                <div className="font-black text-xl leading-none" style={{ color: co.color }}>
                  {co.value}
                </div>
                <div className="text-slate-500 text-xs mt-1 leading-tight">{co.outcome}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          Early investors in each of these made{' '}
          <span className="text-white font-semibold">50x–200x</span>. The next wave is forming now.
        </motion.p>
      </div>
    </section>
  )
}
