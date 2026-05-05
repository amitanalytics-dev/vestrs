'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const benefits = [
  '"Why India, Why Now" — our flagship deep-dive report',
  'Sector-by-sector breakdowns (fintech, SaaS, D2C, climate)',
  'Curated deal previews before public rounds',
  'Direct founder access for waitlist members',
  'Priority onboarding when we open',
]

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <section id="waitlist" className="py-32 bg-[#030d1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#0FFFC1] text-xs font-bold tracking-[0.2em] uppercase">
              Early Access
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-3 leading-tight">
              You don&apos;t start by investing.
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#0FFFC1]">
              You start by understanding.
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              Join the Vestrs waitlist. Get the research, the insights, and the deals
              — before anyone else.
            </p>

            <div className="space-y-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-4 h-4 rounded-full border border-[#0FFFC1]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-[#0FFFC1] rounded-full" />
                  </div>
                  <span className="text-white/55 text-sm leading-relaxed">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/[0.04] border border-white/[0.1] rounded-3xl p-8 md:p-10 backdrop-blur-sm"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-2">
                    <span className="bg-[#0FFFC1]/10 border border-[#0FFFC1]/20 text-[#0FFFC1] text-xs font-bold px-3 py-1 rounded-full">
                      Access is limited · Cohort-based · Batches of 50
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mt-5 mb-2">Claim your spot</h3>
                  <p className="text-white/40 text-sm mb-8">
                    We&apos;re opening the next cohort soon.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-white/[0.05] border border-white/[0.12] rounded-xl px-5 py-4 text-white placeholder-white/25 text-base outline-none focus:border-[#0FFFC1]/50 focus:bg-white/[0.07] transition-all duration-200"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#0FFFC1] text-[#030d1a] font-bold py-4 rounded-xl text-base hover:bg-white transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Joining...' : 'Claim Your Spot →'}
                    </button>
                  </form>

                  <p className="text-white/25 text-xs mt-5 text-center">
                    No spam. No pitch decks. Just signal.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0FFFC1]/15 border border-[#0FFFC1]/30 flex items-center justify-center mx-auto mb-5">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#0FFFC1" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">You&apos;re on the list.</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                    We&apos;ll reach out when the next cohort opens. Expect research, insights,
                    and deal previews in your inbox first.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
