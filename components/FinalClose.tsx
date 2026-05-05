'use client'

import { motion } from 'framer-motion'

export default function FinalClose() {
  return (
    <section className="relative py-40 bg-gradient-to-br from-[#060E18] via-[#0A1828] to-[#060E18] overflow-hidden">
      {/* Rich gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-emerald-500/[0.08] via-sky-500/[0.04] to-transparent rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-violet-500/[0.06] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-emerald-500/[0.06] rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-slate-500 text-lg mb-4 font-medium"
        >
          The question isn&apos;t whether India will produce global winners.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-10 text-white"
        >
          The question is:{' '}
          <span className="text-gradient-teal">will you be early?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white font-bold px-10 py-4 rounded-full text-base group shadow-2xl shadow-emerald-900/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <span className="relative z-10">Join the Waitlist</span>
            <span className="relative z-10">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
