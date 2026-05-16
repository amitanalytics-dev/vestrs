'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import GuidedText from './GuidedText'

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

type Unicorn = { n: string; s: string; v: string; m: string; c: string; d: string }

const UNICORNS: Unicorn[] = [
  { n: 'Flipkart',      s: 'E-commerce',  v: '$35B',   m: '400x', c: '#1e88e5', d: "India's largest homegrown marketplace. Walmart acquired it for $16B — the biggest Indian tech exit." },
  { n: 'Freshworks',    s: 'SaaS',        v: '$5.5B',  m: '500x', c: '#25c16f', d: 'Customer engagement software serving 60,000+ businesses globally. Listed on Nasdaq in 2021.' },
  { n: 'Zomato',        s: 'Foodtech',    v: '$20B',   m: '200x', c: '#e23744', d: "India's largest food delivery platform. Listed on BSE in 2021, now in quick commerce." },
  { n: 'Razorpay',      s: 'Fintech',     v: '$7.5B',  m: '150x', c: '#2eb5c1', d: "India's leading payment gateway processing $60B+ annually. Backed by Sequoia and YC." },
  { n: 'CRED',          s: 'Fintech',     v: '$6.4B',  m: '80x',  c: '#6366f1', d: "Credit card bill payments and rewards for India's premium consumers. 11M+ members." },
  { n: 'Meesho',        s: 'E-commerce',  v: '$3.9B',  m: '100x', c: '#9b5de5', d: 'Social commerce targeting Tier 2 and 3 markets. 140M+ transacting users.' },
  { n: 'Nykaa',         s: 'Beauty',      v: '$6B',    m: '100x', c: '#fc4f8c', d: "India's leading omnichannel beauty platform. Listed on NSE in 2021." },
  { n: 'PolicyBazaar',  s: 'Insurtech',   v: '$3B',    m: '100x', c: '#ef4444', d: "India's largest online insurance aggregator. Listed on NSE in 2021. 7M+ policies." },
  { n: 'Dream11',       s: 'Gaming',      v: '$8B',    m: '50x',  c: '#e63946', d: "India's largest fantasy sports platform with 190M+ registered users. Profitable since 2019." },
  { n: 'PhonePe',       s: 'Fintech',     v: '$12B',   m: '50x',  c: '#7c3aed', d: 'Top UPI payments app with 490M+ registered users and 50%+ market share.' },
  { n: 'Groww',         s: 'Fintech',     v: '$3.2B',  m: '50x',  c: '#00b386', d: 'Simplified investment platform for mutual funds and stocks. 10M+ active investors.' },
  { n: 'MakeMyTrip',    s: 'Travel',      v: '$3.5B',  m: '60x',  c: '#e60026', d: "India's leading online travel platform. Listed on Nasdaq." },
  { n: 'Zepto',         s: 'Q-Commerce',  v: '$5B',    m: '60x',  c: '#a855f7', d: '10-minute grocery delivery across 10 Indian cities. Raised $1B+ growing 100%+ YoY.' },
  { n: 'Chargebee',     s: 'SaaS',        v: '$3.5B',  m: '40x',  c: '#f97316', d: 'Subscription billing platform serving 4,000+ businesses globally.' },
  { n: 'Amagi',         s: 'Media Tech',  v: '$1.4B',  m: '35x',  c: '#dc2626', d: 'Cloud broadcast and streaming tech serving 800+ channels in 150+ countries.' },
  { n: 'InMobi',        s: 'Adtech',      v: '$12B',   m: '30x',  c: '#ff5733', d: "India's first unicorn. Mobile advertising reaching 1.5B+ consumers globally." },
  { n: 'Swiggy',        s: 'Foodtech',    v: '$11B',   m: '30x',  c: '#fc8019', d: "India's second-largest food delivery and quick commerce platform. IPO filed in 2024." },
  { n: 'Paytm',         s: 'Fintech',     v: '$2B',    m: '30x',  c: '#1a6fc4', d: "India's pioneering digital payments super-app. Listed on NSE in 2021." },
  { n: 'ShareChat',     s: 'Social',      v: '$4B',    m: '30x',  c: '#f7a51e', d: "India's largest vernacular social network in 15 languages. 180M+ MAUs." },
  { n: 'BlackBuck',     s: 'Logistics',   v: '$1B',    m: '28x',  c: '#1e40af', d: 'Digital freight network. 1M+ drivers on platform across India.' },
  { n: 'Lenskart',      s: 'Eyewear',     v: '$4.5B',  m: '25x',  c: '#0ea5e9', d: 'Omnichannel eyewear brand with 1,000+ stores across Asia and Middle East.' },
  { n: 'Darwinbox',     s: 'HR Tech',     v: '$1.2B',  m: '25x',  c: '#1d4ed8', d: 'Cloud HR platform serving 700+ enterprises. Competes with Workday in Asian markets.' },
  { n: 'Ola',           s: 'Mobility',    v: '$7B',    m: '25x',  c: '#888888', d: "India's leading ride-hailing company pivoting to EVs through Ola Electric." },
  { n: 'Zetwerk',       s: 'Mfg Tech',    v: '$2.7B',  m: '22x',  c: '#0891b2', d: 'B2B manufacturing marketplace. $2B+ GMV run rate.' },
  { n: 'Infra.Market',  s: 'B2B',         v: '$2.5B',  m: '22x',  c: '#d97706', d: 'Construction materials procurement for builders and developers. 50,000+ customers.' },
  { n: 'Moglix',        s: 'B2B',         v: '$2.6B',  m: '20x',  c: '#f59e0b', d: 'Industrial B2B marketplace for MRO procurement. Serves Fortune 500 manufacturers.' },
  { n: 'Acko',          s: 'Insurtech',   v: '$1.7B',  m: '20x',  c: '#7c3aed', d: 'Digital-first insurance for auto, health, and travel. 70M+ customers.' },
  { n: 'OfBusiness',    s: 'B2B',         v: '$5B',    m: '18x',  c: '#0d9488', d: "Raw material procurement and credit for SMEs. $3B+ ARR. One of India's fastest-growing." },
  { n: 'NoBroker',      s: 'Proptech',    v: '$1B',    m: '18x',  c: '#f43f5e', d: 'Zero-brokerage real estate platform for direct owner-to-tenant transactions.' },
  { n: 'Spinny',        s: 'Auto Tech',   v: '$1.8B',  m: '18x',  c: '#3b82f6', d: 'Full-stack used car platform with quality-certified inventory.' },
  { n: 'Slice',         s: 'Fintech',     v: '$2B',    m: '20x',  c: '#f0522b', d: 'Credit card and payments app for young Indians. Merged with North East Small Finance Bank.' },
  { n: 'MPL',           s: 'Gaming',      v: '$2.3B',  m: '15x',  c: '#6366f1', d: "Mobile gaming platform with 90M+ users." },
  { n: 'LeadSquared',   s: 'SaaS',        v: '$1B',    m: '15x',  c: '#4f46e5', d: 'Marketing automation and CRM for high-velocity sales teams globally.' },
  { n: 'Vedantu',       s: 'Edtech',      v: '$1B',    m: '15x',  c: '#4d5cde', d: "Live online tutoring for K-12 students. Pioneer of India's edtech boom." },
  { n: 'XpressBees',    s: 'Logistics',   v: '$950M',  m: '14x',  c: '#f97316', d: 'B2B logistics and last-mile delivery across 2,000+ pin codes in India.' },
  { n: 'Unacademy',     s: 'Edtech',      v: '$2B',    m: '12x',  c: '#0880ae', d: 'Online learning for competitive exam prep. 10,000+ educators, 50M+ learners.' },
  { n: 'Udaan',         s: 'B2B',         v: '$2B',    m: '12x',  c: '#e11d48', d: 'B2B trade platform connecting manufacturers, wholesalers, and retailers.' },
  { n: 'Fractal',       s: 'Analytics',   v: '$1B',    m: '12x',  c: '#2563eb', d: 'AI and analytics serving Fortune 500 companies globally. Backed by TPG.' },
  { n: 'Pristyn Care',  s: 'Healthtech',  v: '$1.5B',  m: '12x',  c: '#06b6d4', d: 'Tech-enabled surgical care with 100+ clinics across India.' },
  { n: 'Rapido',        s: 'Mobility',    v: '$1.1B',  m: '12x',  c: '#ca8a04', d: 'Bike taxi and auto-rickshaw platform across 100+ cities. 25M+ customers.' },
  { n: 'OneCard',       s: 'Fintech',     v: '$1.4B',  m: '12x',  c: '#ef4444', d: "Mobile-first metal credit card for India's salaried professionals. 1M+ issued." },
  { n: 'BharatPe',      s: 'Fintech',     v: '$2B',    m: '10x',  c: '#e8192c', d: "QR payments and lending for India's small merchants. 10M+ partners." },
  { n: 'GlobalBees',    s: 'D2C',         v: '$1B',    m: '10x',  c: '#65a30d', d: 'D2C brand accelerator acquiring and scaling profitable consumer brands.' },
  { n: 'Mensa Brands',  s: 'D2C',         v: '$1B',    m: '8x',   c: '#db2777', d: 'House of brands. Fastest Indian startup to reach $1B valuation.' },
  { n: 'PharmEasy',     s: 'Healthtech',  v: '$1.5B',  m: '4x',   c: '#22c55e', d: 'Online pharmacy and diagnostics. Merged with Thyrocare. 22M+ patients.' },
  { n: 'Droom',         s: 'Auto Tech',   v: '$1B',    m: '8x',   c: '#818cf8', d: 'Online automobile marketplace for new and used vehicles with trust scores.' },
  { n: 'DealShare',     s: 'E-commerce',  v: '$400M',  m: '10x',  c: '#10b981', d: 'Social commerce for value-conscious shoppers in Tier 2–4 India.' },
  { n: 'Stanza Living', s: 'Proptech',    v: '$400M',  m: '8x',   c: '#64748b', d: 'Managed student housing with 75,000+ beds across 24 Indian cities.' },
  { n: "BYJU'S",        s: 'Edtech',      v: '$1B',    m: '80x',  c: '#0b3d91', d: "India's most funded edtech startup. Became the world's most valued edtech at peak." },
  { n: 'Open Finance',  s: 'Fintech',     v: '$500M',  m: '15x',  c: '#8b5cf6', d: 'Neo-banking platform for SMEs combining accounts, payments, and bookkeeping.' },
]

function shuffleIndices(len: number): number[] {
  const arr = Array.from({ length: len }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function HeroGrid() {
  const [slots, setSlots] = useState<Unicorn[]>([])
  const [flippingIdx, setFlippingIdx] = useState<number | null>(null)
  const orderRef = useRef<number[]>([])
  const ptrRef = useRef(9)

  useEffect(() => {
    const order = shuffleIndices(UNICORNS.length)
    orderRef.current = order
    setSlots(order.slice(0, 9).map(i => UNICORNS[i]))

    const timer = setInterval(() => {
      const cellIdx = Math.floor(Math.random() * 9)
      const nextIdx = orderRef.current[ptrRef.current % orderRef.current.length]
      ptrRef.current++
      const next = UNICORNS[nextIdx]
      setFlippingIdx(cellIdx)
      setTimeout(() => {
        setSlots(prev => {
          const updated = [...prev]
          updated[cellIdx] = next
          return updated
        })
        setFlippingIdx(null)
      }, 210)
    }, 2500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-3 gap-3" style={{ perspective: '1200px' }}>
      {slots.map((co, i) => (
        <div
          key={i}
          style={{
            transform: flippingIdx === i ? 'rotateY(90deg)' : 'rotateY(0deg)',
            transition: 'transform 0.35s ease',
          }}
        >
          <div className="bg-white/[0.06] border border-white/[0.10] rounded-xl p-4 h-[158px] overflow-hidden hover:border-white/[0.18] transition-colors duration-300">
            <div
              className="text-[8px] font-bold tracking-[0.15em] uppercase mb-2 inline-block px-1.5 py-0.5 rounded-full"
              style={{ color: co.c, background: `${co.c}18`, border: `0.5px solid ${co.c}40` }}
            >
              {co.s}
            </div>
            <div className="text-sm font-bold text-white mb-1 leading-tight truncate">{co.n}</div>
            <div className="text-[1.6rem] font-black text-emerald-400 leading-none mb-1">{co.m}</div>
            <div className="text-[10px] text-slate-500 mb-2 font-medium">{co.v}</div>
            <div className="text-[10px] text-slate-600 leading-relaxed line-clamp-2">{co.d}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#07101D] via-[#0A1828] to-[#060E1A]">
      <StarField />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-emerald-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/[0.07] rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-[148px] pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — hero copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400 font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Limited time · 100 founding member spots only
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
                <span className="relative z-10">Join the club — become a founding member</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right — unicorn flip grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <HeroGrid />
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07101D] to-transparent z-10" />
    </section>
  )
}
