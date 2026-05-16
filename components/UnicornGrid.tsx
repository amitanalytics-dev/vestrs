'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Unicorn = { n: string; s: string; v: string; m: string; c: string; d: string }

const UNICORNS: Unicorn[] = [
  { n: 'Flipkart',      s: 'E-commerce',  v: '$35B',   m: '400x', c: '#1e88e5', d: "India's largest homegrown marketplace. Walmart acquired it for $16B in 2018 — the biggest Indian tech exit on record." },
  { n: 'Freshworks',    s: 'SaaS',        v: '$5.5B',  m: '500x', c: '#25c16f', d: 'Customer engagement software serving 60,000+ businesses globally. Listed on Nasdaq in 2021.' },
  { n: 'Zomato',        s: 'Foodtech',    v: '$20B',   m: '200x', c: '#e23744', d: "India's largest food delivery platform. Listed on BSE in 2021, now expanding into quick commerce." },
  { n: 'Razorpay',      s: 'Fintech',     v: '$7.5B',  m: '150x', c: '#2eb5c1', d: "India's leading payment gateway processing $60B+ annually. Backed by Sequoia and Y Combinator." },
  { n: 'CRED',          s: 'Fintech',     v: '$6.4B',  m: '80x',  c: '#6366f1', d: "Credit card bill payments and rewards for India's premium consumers. 11M+ verified members." },
  { n: 'Meesho',        s: 'E-commerce',  v: '$3.9B',  m: '100x', c: '#9b5de5', d: 'Social commerce platform targeting Tier 2 and 3 markets. 140M+ transacting users across India.' },
  { n: 'Nykaa',         s: 'Beauty',      v: '$6B',    m: '100x', c: '#fc4f8c', d: "India's leading omnichannel beauty platform. Listed on NSE in 2021. Expanding into fashion." },
  { n: 'PolicyBazaar',  s: 'Insurtech',   v: '$3B',    m: '100x', c: '#ef4444', d: "India's largest online insurance aggregator. Listed on NSE in 2021. 7M+ policies sold." },
  { n: 'Dream11',       s: 'Gaming',      v: '$8B',    m: '50x',  c: '#e63946', d: "India's largest fantasy sports platform with 190M+ registered users. Profitable since 2019." },
  { n: 'PhonePe',       s: 'Fintech',     v: '$12B',   m: '50x',  c: '#7c3aed', d: 'Top UPI payments app with 490M+ registered users and 50%+ market share.' },
  { n: 'Groww',         s: 'Fintech',     v: '$3.2B',  m: '50x',  c: '#00b386', d: 'Simplified investment platform for mutual funds and stocks. 10M+ active investors.' },
  { n: 'MakeMyTrip',    s: 'Travel',      v: '$3.5B',  m: '60x',  c: '#e60026', d: "India's leading online travel platform for flights, hotels, and holidays. Listed on Nasdaq." },
  { n: 'Zepto',         s: 'Q-Commerce',  v: '$5B',    m: '60x',  c: '#a855f7', d: '10-minute grocery delivery across 10 Indian cities. Raised $1B+ and growing 100%+ YoY.' },
  { n: 'Chargebee',     s: 'SaaS',        v: '$3.5B',  m: '40x',  c: '#f97316', d: 'Subscription billing and revenue operations platform serving 4,000+ businesses globally.' },
  { n: 'Amagi',         s: 'Media Tech',  v: '$1.4B',  m: '35x',  c: '#dc2626', d: 'Cloud-based broadcast and streaming technology serving 800+ channels in 150+ countries.' },
  { n: 'InMobi',        s: 'Adtech',      v: '$12B',   m: '30x',  c: '#ff5733', d: "India's first unicorn. Mobile advertising platform reaching 1.5B+ consumers globally." },
  { n: 'Swiggy',        s: 'Foodtech',    v: '$11B',   m: '30x',  c: '#fc8019', d: "India's second-largest food delivery and quick commerce platform. IPO filed in 2024." },
  { n: 'Paytm',         s: 'Fintech',     v: '$2B',    m: '30x',  c: '#1a6fc4', d: "India's pioneering digital payments super-app. Listed on NSE in 2021. 100M+ monthly users." },
  { n: 'ShareChat',     s: 'Social',      v: '$4B',    m: '30x',  c: '#f7a51e', d: "India's largest vernacular social network in 15 languages. 180M+ monthly active users." },
  { n: 'BlackBuck',     s: 'Logistics',   v: '$1B',    m: '28x',  c: '#1e40af', d: 'Digital freight network connecting shippers and truckers across India. 1M+ drivers on platform.' },
  { n: 'Lenskart',      s: 'Eyewear',     v: '$4.5B',  m: '25x',  c: '#0ea5e9', d: 'Omnichannel eyewear brand with 1,000+ stores. Expanding across Southeast Asia and Middle East.' },
  { n: 'Darwinbox',     s: 'HR Tech',     v: '$1.2B',  m: '25x',  c: '#1d4ed8', d: 'Cloud HR platform serving 700+ enterprises. Competes directly with Workday in Asian markets.' },
  { n: 'Ola',           s: 'Mobility',    v: '$7B',    m: '25x',  c: '#888888', d: "India's leading ride-hailing company pivoting to EVs through Ola Electric, now publicly listed." },
  { n: 'Zetwerk',       s: 'Mfg Tech',    v: '$2.7B',  m: '22x',  c: '#0891b2', d: 'B2B manufacturing marketplace connecting buyers with global suppliers. $2B+ GMV run rate.' },
  { n: 'Infra.Market',  s: 'B2B',         v: '$2.5B',  m: '22x',  c: '#d97706', d: 'Construction materials procurement platform for builders and developers. 50,000+ customers.' },
  { n: 'Moglix',        s: 'B2B',         v: '$2.6B',  m: '20x',  c: '#f59e0b', d: 'Industrial B2B marketplace for MRO and indirect procurement. Serves Fortune 500 manufacturers.' },
  { n: 'Acko',          s: 'Insurtech',   v: '$1.7B',  m: '20x',  c: '#7c3aed', d: 'Digital-first insurance company offering auto, health, and travel cover. 70M+ customers.' },
  { n: 'OfBusiness',    s: 'B2B',         v: '$5B',    m: '18x',  c: '#0d9488', d: "Raw material procurement and credit platform for SMEs. $3B+ ARR. One of India's fastest-growing." },
  { n: 'NoBroker',      s: 'Proptech',    v: '$1B',    m: '18x',  c: '#f43f5e', d: 'Zero-brokerage real estate platform enabling direct owner-to-tenant transactions across India.' },
  { n: 'Spinny',        s: 'Auto Tech',   v: '$1.8B',  m: '18x',  c: '#3b82f6', d: 'Full-stack used car platform with quality-certified inventory and end-to-end buying experience.' },
  { n: 'Slice',         s: 'Fintech',     v: '$2B',    m: '20x',  c: '#f0522b', d: 'Credit card and payments app targeting young Indians. Merged with North East Small Finance Bank.' },
  { n: 'MPL',           s: 'Gaming',      v: '$2.3B',  m: '15x',  c: '#6366f1', d: "Mobile gaming platform with 90M+ users. Also launched OneCard, India's mobile-first credit card." },
  { n: 'LeadSquared',   s: 'SaaS',        v: '$1B',    m: '15x',  c: '#4f46e5', d: 'Marketing automation and CRM for high-velocity sales teams in India and globally.' },
  { n: 'Vedantu',       s: 'Edtech',      v: '$1B',    m: '15x',  c: '#4d5cde', d: "Live online tutoring platform for K-12 students. Pioneer of India's edtech boom post-COVID." },
  { n: 'XpressBees',    s: 'Logistics',   v: '$950M',  m: '14x',  c: '#f97316', d: 'B2B logistics and last-mile delivery network serving 2,000+ pin codes across India.' },
  { n: 'Unacademy',     s: 'Edtech',      v: '$2B',    m: '12x',  c: '#0880ae', d: 'Online learning platform for competitive exam prep. 10,000+ educators, 50M+ learners.' },
  { n: 'Udaan',         s: 'B2B',         v: '$2B',    m: '12x',  c: '#e11d48', d: 'B2B trade platform connecting manufacturers, wholesalers, and retailers across India.' },
  { n: 'Fractal',       s: 'Analytics',   v: '$1B',    m: '12x',  c: '#2563eb', d: 'AI and data analytics firm serving Fortune 500 companies globally. Backed by TPG and Apax.' },
  { n: 'Pristyn Care',  s: 'Healthtech',  v: '$1.5B',  m: '12x',  c: '#06b6d4', d: "Tech-enabled surgical care provider with 100+ clinics across India's major cities." },
  { n: 'Rapido',        s: 'Mobility',    v: '$1.1B',  m: '12x',  c: '#ca8a04', d: 'Bike taxi and auto-rickshaw platform serving 100+ Indian cities with 25M+ customers.' },
  { n: 'OneCard',       s: 'Fintech',     v: '$1.4B',  m: '12x',  c: '#ef4444', d: "Mobile-first metal credit card targeting India's salaried professionals. 1M+ cards issued." },
  { n: 'BharatPe',      s: 'Fintech',     v: '$2B',    m: '10x',  c: '#e8192c', d: "QR-based payments and lending platform for India's small merchants. 10M+ merchant partners." },
  { n: 'GlobalBees',    s: 'D2C',         v: '$1B',    m: '10x',  c: '#65a30d', d: 'D2C brand accelerator acquiring and scaling profitable online consumer brands in India.' },
  { n: 'Mensa Brands',  s: 'D2C',         v: '$1B',    m: '8x',   c: '#db2777', d: 'House of brands acquiring profitable D2C companies. Fastest Indian startup to reach $1B valuation.' },
  { n: 'PharmEasy',     s: 'Healthtech',  v: '$1.5B',  m: '4x',   c: '#22c55e', d: 'Online pharmacy and diagnostics platform. Merged with Thyrocare and serves 22M+ patients.' },
  { n: 'Droom',         s: 'Auto Tech',   v: '$1B',    m: '8x',   c: '#818cf8', d: 'Online automobile marketplace for buying and selling new and used vehicles with trust scores.' },
  { n: 'DealShare',     s: 'E-commerce',  v: '$400M',  m: '10x',  c: '#10b981', d: 'Social commerce platform for value-conscious shoppers in Tier 2–4 India. Group-buying model.' },
  { n: 'Stanza Living', s: 'Proptech',    v: '$400M',  m: '8x',   c: '#64748b', d: 'Managed student housing platform with 75,000+ beds across 24 Indian cities.' },
  { n: "BYJU'S",        s: 'Edtech',      v: '$1B',    m: '80x',  c: '#0b3d91', d: "India's most funded edtech startup. Grew to become the world's most valued edtech company at peak." },
  { n: 'Open Finance',  s: 'Fintech',     v: '$500M',  m: '15x',  c: '#8b5cf6', d: 'Neo-banking platform for SMEs combining current accounts, payments, and automated bookkeeping.' },
]

function shuffleIndices(len: number): number[] {
  const arr = Array.from({ length: len }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function UnicornGrid() {
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
    <section id="unicorns" className="relative py-24 bg-[#060D18] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">
            India&apos;s Unicorns
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-white"
        >
          50 companies. One decade.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 text-base mb-12"
        >
          Early institutional returns vs. current valuation — cycling live.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          {slots.map((co, i) => (
            <div
              key={i}
              style={{
                transform: flippingIdx === i ? 'rotateY(90deg)' : 'rotateY(0deg)',
                transition: 'transform 0.35s ease',
              }}
            >
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 h-[210px] overflow-hidden hover:border-white/[0.16] transition-colors duration-300">
                <div
                  className="text-[9px] font-bold tracking-[0.18em] uppercase mb-2 inline-block px-2 py-0.5 rounded-full"
                  style={{
                    color: co.c,
                    background: `${co.c}18`,
                    border: `0.5px solid ${co.c}40`,
                  }}
                >
                  {co.s}
                </div>
                <div className="text-xl font-bold text-white mb-1 leading-tight truncate">{co.n}</div>
                <div className="text-3xl font-black text-emerald-400 leading-none mb-1">{co.m}</div>
                <div className="text-xs text-slate-500 mb-3 font-medium">{co.v} valuation</div>
                <div className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{co.d}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-600 text-xs mt-10 max-w-2xl mx-auto"
        >
          Historical returns of early institutional investors only. Not representative of returns available through Vestrs. Past performance does not indicate future results.
        </motion.p>
      </div>
    </section>
  )
}
