'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ErrorBoundary from './ErrorBoundary'

const GlobeScene = dynamic(() => import('./GlobeScene'), { ssr: false })

type Star = { top: string; left: string; size: string; opacity: number }

function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const s: Star[] = Array.from({ length: 80 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.8 ? '2px' : '1px',
      opacity: 0.1 + Math.random() * 0.4,
    }))
    setStars(s)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ width: s.size, height: s.size, top: s.top, left: s.left, opacity: s.opacity }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030d1a]">
      <StarField />

      {/* Background radial */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a2440]/40 via-[#030d1a]/80 to-[#030d1a]" />

      {/* Globe */}
      <div className="absolute right-[-5%] md:right-[-2%] top-1/2 -translate-y-1/2 w-[90vw] md:w-[55vw] lg:w-[52vw] h-[90vw] md:h-[55vw] lg:h-[52vw] max-w-[750px] max-h-[750px] opacity-50 md:opacity-90">
        <ErrorBoundary fallback={<div className="w-full h-full" />}>
          <Suspense fallback={<div className="w-full h-full" />}>
            <GlobeScene />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Left fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030d1a] via-[#030d1a]/85 md:via-[#030d1a]/60 to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0FFFC1]/10 border border-[#0FFFC1]/20 rounded-full px-4 py-1.5 text-sm text-[#0FFFC1] font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 bg-[#0FFFC1] rounded-full animate-pulse" />
            Private Beta · Invite Only
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.06] tracking-tight mb-6"
          >
            The next decade of startup wealth{' '}
            <span className="text-[#0FFFC1]">
              won&apos;t be created in Silicon Valley alone.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-white/55 leading-relaxed mb-10 max-w-xl"
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
            <a
              href="#waitlist"
              className="bg-[#0FFFC1] text-[#030d1a] font-bold px-8 py-4 rounded-full text-base hover:bg-white transition-colors duration-200 text-center"
            >
              Join the Waitlist
            </a>
            <a
              href="#why-india"
              className="border border-white/20 text-white px-8 py-4 rounded-full text-base hover:border-[#0FFFC1]/50 hover:text-[#0FFFC1] transition-colors duration-200 text-center"
            >
              Why India, Why Now ↓
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030d1a] to-transparent z-10" />
    </section>
  )
}
