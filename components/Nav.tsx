'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Why India',    href: '#why-india' },
  { label: 'The Problem',  href: '#the-gap' },
  { label: 'Proof',        href: '#proof' },
  { label: 'Solution',     href: '#solution' },
  { label: 'Returns',      href: '#returns' },
  { label: 'The Parallel', href: '#the-parallel' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
          ? 'bg-[#07101D]/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col flex-shrink-0">
          <div className="text-xl font-bold tracking-tight leading-none">
            <span className="text-white">Vestrs</span>
            <span className="text-gradient-teal">.</span>
          </div>
          <span className="text-[9px] text-slate-500 tracking-[0.12em] uppercase mt-0.5 leading-none">
            Global Capital · Indian Determination
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-slate-400">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#07101D]/98 border-t border-white/8 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm text-slate-400 hover:text-white transition-colors border-b border-white/5 last:border-0"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
