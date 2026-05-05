'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030d1a]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-white">Vestrs</span>
          <span className="text-[#0FFFC1]">.</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#why-india" className="hover:text-white transition-colors duration-200">Why India</a>
          <a href="#proof" className="hover:text-white transition-colors duration-200">Proof</a>
          <a href="#solution" className="hover:text-white transition-colors duration-200">Solution</a>
        </div>

        <a
          href="#waitlist"
          className="bg-[#0FFFC1] text-[#030d1a] text-sm font-bold px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
        >
          Join Waitlist
        </a>
      </div>
    </motion.nav>
  )
}
