'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import GuidedText from './GuidedText'

const GlobeVisual = dynamic(() => import('./GlobeVisual'), { ssr: false })

type Star = { top: string; left: string; size: string; opacity: number }

function StarField() {
  const [stars, setStars] = useState<Star[]>([])
  useEffect(() => {
    setStars(
      Array.from({ length: 80 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.85 ? '2px' : '1px',
        opacity: 0.1 + Math.random() * 0.4,
      })),
    )
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, top: s.top, left: s.left, opacity: s.opacity }} />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#07101D] via-[#0A1828] to-[#060E1A]">
      <StarField />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-emerald-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/[0.07] rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Globe */}
      <div className="absolute right-[-5%] md:right-[-2%] top-1/2 -translate-y-1/2 w-[90vw] md:w-[55vw] lg:w-[52vw] h-[90vw] md:h-[55vw] lg:h-[52vw] max-w-[700px] max-h-[700px] opacity-50 md:opacity-90">
        <GlobeVisual />
      </div>

      {/* Left fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07101D] via-[#07101D]/85 md:via-[#07101D]/60 to-transparent pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Early Access · Cohort-based · 50 seats per round
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.06] tracking-tight mb-6 text-white"
          >
            The next decade of startup wealth{' '}
            <span className="text-gradient-teal">won&apos;t be created in Silicon Valley alone.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10 max-w-xl"
          >
            <GuidedText
              text="112 unicorns. A billion-person digital economy. Ex-Goldman, ex-Google, ex-McKinsey founders choosing India over the Valley. The window is wide open — and most global capital hasn't walked through it yet. Vestrs gets you in first."
              speed={270}
              delay={1100}
              autoplay
              loop={false}
              className="text-lg leading-relaxed"
            />
          </motion.div>

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
              className="relative overflow-hidden bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white font-bold px-8 py-4 rounded-full text-base group text-center shadow-lg shadow-emerald-900/40"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative z-10">Join the Waitlist</span>
            </motion.a>

            <motion.a
              href="#why-india"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="border-2 border-white/15 text-slate-300 px-8 py-4 rounded-full text-base hover:border-emerald-400/50 hover:text-emerald-400 transition-colors duration-200 text-center font-medium"
            >
              Why India, Why Now ↓
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07101D] to-transparent z-10" />
    </section>
  )
}
