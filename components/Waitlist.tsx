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

const dotColors = ['bg-emerald-400', 'bg-sky-400', 'bg-violet-400', 'bg-amber-400', 'bg-emerald-400']

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  return (
    <section id="waitlist" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-emerald-600 text-xs font-bold tracking-[0.2em] uppercase">Early Access</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-2 leading-tight text-[#0F172A]">
              You don&apos;t start by investing.
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gradient-teal">
              You start by understanding.
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-10">
              Join the Vestrs waitlist. Get the research, the insights, and the deals — before anyone else.
            </p>

            <div className="space-y-3.5">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div className={`w-2 h-2 rounded-full ${dotColors[i]} flex-shrink-0 mt-1.5`} />
                  <span className="text-slate-600 text-sm leading-relaxed">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-[#F0FDF9] to-[#EFF6FF] border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-2">
                    <span className="bg-gradient-to-r from-emerald-100 to-sky-100 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      Access is limited · Cohort-based · Batches of 50
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mt-5 mb-2 text-[#0F172A]">Claim your spot</h3>
                  <p className="text-slate-400 text-sm mb-8">We&apos;re opening the next cohort soon.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-4 text-[#0F172A] placeholder-slate-300 text-base outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                    />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="relative overflow-hidden w-full bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white font-bold py-4 rounded-xl text-base disabled:opacity-60 disabled:cursor-not-allowed group shadow-md shadow-emerald-100"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                      <span className="relative z-10">{loading ? 'Joining...' : 'Claim Your Spot →'}</span>
                    </motion.button>
                  </form>

                  <p className="text-slate-300 text-xs mt-5 text-center">No spam. No pitch decks. Just signal.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-100">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-[#0F172A]">You&apos;re on the list.</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    We&apos;ll reach out when the next cohort opens. Expect research, insights, and deal previews first.
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
