'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import GlobeVisual from './GlobeVisual'

type Star = { top: string; left: string; size: string; opacity: number }

function StarField() {
  const [stars, setStars] = useState<Star[]>([])
  useEffect(() => {
    setStars(
      Array.from({ length: 55 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.8 ? '2px' : '1px',
        opacity: 0.06 + Math.random() * 0.14,
      })),
    )
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-slate-400"
          style={{ width: s.size, height: s.size, top: s.top, left: s.left, opacity: s.opacity }} />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#F0FDF9] via-[#F8FAFC] to-[#EFF6FF]">
      <StarField />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Globe — no dynamic import needed, pure SVG/framer */}
      <div className="absolute right-[-5%] md:right-[-2%] top-1/2 -translate-y-1/2 w-[90vw] md:w-[55vw] lg:w-[52vw] h-[90vw] md:h-[55vw] lg:h-[52vw] max-w-[700px] max-h-[700px] opacity-35 md:opacity-85">
        <GlobeVisual />
      </div>

      {/* Left fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4FDF9] via-[#F8FAFC]/80 md:via-[#F8FAFC]/55 to-transparent pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 text-sm text-emerald-700 font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Private Beta · Invite Only
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.06] tracking-tight mb-6 text-[#0F172A]"
          >
            The next decade of startup wealth{' '}
            <span className="text-gradient-teal">won&apos;t be created in Silicon Valley alone.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl"
          >
            India is producing world-class founders, category-defining companies, and
            venture-scale returns — and global capital is only beginning to notice.
            Vestrs gives you access before it becomes obvious.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#waitlist"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative overflow-hidden bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white font-bold px-8 py-4 rounded-full text-base group text-center shadow-lg shadow-emerald-100"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative z-10">Join the Waitlist</span>
            </motion.a>

            <motion.a
              href="#why-india"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-full text-base hover:border-emerald-300 hover:text-emerald-700 transition-colors duration-200 text-center font-medium"
            >
              Why India, Why Now ↓
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent z-10" />
    </section>
  )
}
