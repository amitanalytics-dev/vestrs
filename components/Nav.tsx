'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home',            href: '#hero' },
  { label: 'The Opportunity', href: '#why-india' },
  { label: 'The Parallel',    href: '#the-parallel' },
  { label: 'The Problem',     href: '#the-gap' },
  { label: 'The Solution',    href: '#solution' },
  { label: 'The Story',        href: '#returns' },
  { label: 'Smart Money',     href: '#smart-money' },
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
    <>
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
        <div className="flex flex-col flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div
            className="px-4 py-2"
            style={{
              backgroundColor: '#0A0F38',
              border: '1px solid rgba(255,255,255,0.22)',
            }}
          >
            <span style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '14px',
              fontWeight: '400',
              letterSpacing: '0.35em',
              color: '#FFFFFF',
            }}>
              VESTRS
            </span>
          </div>
          <span className="text-gold-glitter text-[9px] font-bold tracking-[0.12em] uppercase mt-1 leading-none">
            Global Capital · Indian Determination
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-slate-400">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="hidden lg:inline-flex relative overflow-hidden bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white text-xs font-bold px-4 py-2 rounded-full group"
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

      {/* Gold bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #A67C00 0%, #FFD700 25%, #FFFAAA 50%, #FFD700 75%, #A67C00 100%)',
        boxShadow: '0 0 14px 4px rgba(255,215,0,0.5)',
      }} />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#07101D]/98 backdrop-blur-xl border-t border-white/8 overflow-hidden"
          >
            <div className="px-6 py-3 flex flex-col">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    setTimeout(() => {
                      document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })
                    }, 150)
                  }}
                  className="py-4 text-base text-slate-300 hover:text-white active:text-white transition-colors border-b border-white/[0.06] last:border-0 font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(false)
                  setTimeout(() => {
                    document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' })
                  }, 150)
                }}
                className="mt-4 mb-2 text-center bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white text-base font-bold py-4 rounded-xl"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>

      {/* Sticky mobile footer CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pt-3"
        style={{ background: 'linear-gradient(to top, #07101D 70%, transparent)' }}
      >
        <a
          href="#waitlist"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="block w-full text-center bg-gradient-to-r from-[#059669] to-[#0EA5E9] text-white text-sm font-bold py-4 rounded-xl shadow-lg shadow-black/40"
        >
          Join Waitlist
        </a>
      </div>
    </>
  )
}
