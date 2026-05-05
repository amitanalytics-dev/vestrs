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
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-[#0F172A]">Vestrs</span>
          <span className="text-gradient-teal">.</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-500">
          <a href="#why-india" className="hover:text-slate-900 transition-colors duration-200">Why India</a>
          <a href="#proof" className="hover:text-slate-900 transition-colors duration-200">Proof</a>
          <a href="#solution" className="hover:text-slate-900 transition-colors duration-200">Solution</a>
        </div>

        <motion.a
          href="#waitlist"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative overflow-hidden bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white text-sm font-bold px-5 py-2.5 rounded-full group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <span className="relative z-10">Join Waitlist</span>
        </motion.a>
      </div>
    </motion.nav>
  )
}
