'use client'

import { motion } from 'framer-motion'

export default function FinalClose() {
  return (
    <section className="relative py-40 bg-[#051628] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0FFFC1]/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-white/40 text-lg mb-4 font-medium"
        >
          The question isn&apos;t whether India will produce global winners.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-10"
        >
          The question is:{' '}
          <span className="text-[#0FFFC1]">will you be early?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-[#0FFFC1] text-[#030d1a] font-bold px-10 py-4 rounded-full text-base hover:bg-white transition-colors duration-200"
          >
            Join the Waitlist
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
