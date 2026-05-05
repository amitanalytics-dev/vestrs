'use client'

import { motion } from 'framer-motion'

function hex2rgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

function mColor(m: string) {
  const v = parseFloat(m)
  if (isNaN(v)) return '#94a3b8'
  if (v >= 100) return '#f0abfc'
  if (v >= 20)  return '#4ade80'
  if (v >= 10)  return '#86efac'
  if (v >= 5)   return '#facc15'
  return '#fb923c'
}

// [name, domain, color, industry, multiple, valuation]
const companies: [string, string, string, string, string, string][] = [
  ['Flipkart',     'flipkart.com',     '#1e88e5', 'E-commerce',  '400x',  '$35B'],
  ['Freshworks',   'freshworks.com',   '#25c16f', 'SaaS',        '500x',  '$5.5B'],
  ['Zomato',       'zomato.com',       '#e23744', 'Foodtech',    '200x',  '$20B'],
  ['Razorpay',     'razorpay.com',     '#2eb5c1', 'Fintech',     '150x',  '$7.5B'],
  ["BYJU'S",       'byjus.com',        '#0b3d91', 'Edtech',      '80x',   '$1B'],
  ['Meesho',       'meesho.com',       '#9b5de5', 'E-commerce',  '100x',  '$3.9B'],
  ['Nykaa',        'nykaa.com',        '#fc4f8c', 'Beauty',      '100x',  '$6B'],
  ['PolicyBazaar', 'policybazaar.com', '#ef4444', 'Insurtech',   '100x',  '$3B'],
  ['Dream11',      'dream11.com',      '#e63946', 'Gaming',      '50x',   '$8B'],
  ['MakeMyTrip',   'makemytrip.com',   '#e60026', 'Travel',      '60x',   '$3.5B'],
  ['Chargebee',    'chargebee.com',    '#f97316', 'SaaS',        '40x',   '$3.5B'],
  ['PhonePe',      'phonepe.com',      '#7c3aed', 'Fintech',     '50x',   '$12B'],
  ['Amagi',        'amagi.tv',         '#dc2626', 'Media Tech',  '35x',   '$1.4B'],
  ['Zepto',        'zepto.in',         '#a855f7', 'Q-Commerce',  '60x',   '$5B'],
  ['Paytm',        'paytm.com',        '#1a6fc4', 'Fintech',     '30x',   '$2B'],
  ['InMobi',       'inmobi.com',       '#ff5733', 'Adtech',      '30x',   '$12B'],
  ['ShareChat',    'sharechat.com',    '#f7a51e', 'Social',      '30x',   '$4B'],
  ['BlackBuck',    'blackbuck.com',    '#1e40af', 'Logistics',   '28x',   '$1B'],
  ['Lenskart',     'lenskart.com',     '#0ea5e9', 'Eyewear',     '25x',   '$4.5B'],
  ['Darwinbox',    'darwinbox.com',    '#1d4ed8', 'HR Tech',     '25x',   '$1.2B'],
  ['Ola',          'olacabs.com',      '#555555', 'Mobility',    '25x',   '$7B'],
  ['Zetwerk',      'zetwerk.com',      '#0891b2', 'Mfg Tech',    '22x',   '$2.7B'],
  ['Infra.Market', 'infra.market',     '#d97706', 'B2B',         '22x',   '$2.5B'],
  ['Swiggy',       'swiggy.com',       '#fc8019', 'Foodtech',    '30x',   '$11B'],
  ['Groww',        'groww.in',         '#00b386', 'Fintech',     '50x',   '$3.2B'],
  ['Moglix',       'moglix.com',       '#f59e0b', 'B2B',         '20x',   '$2.6B'],
  ['Acko',         'acko.com',         '#7c3aed', 'Insurtech',   '20x',   '$1.7B'],
  ['Slice',        'sliceit.app',      '#f0522b', 'Fintech',     '20x',   '$2B'],
  ['NoBroker',     'nobroker.com',     '#f43f5e', 'Proptech',    '18x',   '$1B'],
  ['OfBusiness',   'ofbusiness.in',    '#0d9488', 'B2B',         '18x',   '$5B'],
  ['Spinny',       'spinny.com',       '#3b82f6', 'Auto Tech',   '18x',   '$1.8B'],
  ['MPL',          'mpl.live',         '#6366f1', 'Gaming',      '15x',   '$2.3B'],
  ['LeadSquared',  'leadsquared.com',  '#4f46e5', 'SaaS',        '15x',   '$1B'],
  ['Open Fin.',    'open.money',       '#7c3aed', 'Fintech',     '15x',   '$500M'],
  ['Vedantu',      'vedantu.com',      '#4d5cde', 'Edtech',      '15x',   '$1B'],
  ['XpressBees',   'xpressbees.com',   '#f97316', 'Logistics',   '14x',   '$950M'],
  ['Unacademy',    'unacademy.com',    '#0880ae', 'Edtech',      '12x',   '$2B'],
  ['Udaan',        'udaan.com',        '#e11d48', 'B2B',         '12x',   '$2B'],
  ['Fractal',      'fractal.ai',       '#2563eb', 'Analytics',   '12x',   '$1B'],
  ['Pristyn Care', 'pristyncare.com',  '#06b6d4', 'Healthtech',  '12x',   '$1.5B'],
  ['Rapido',       'rapido.bike',      '#ca8a04', 'Mobility',    '12x',   '$1.1B'],
  ['OneCard',      'getonecard.app',   '#ef4444', 'Fintech',     '12x',   '$1.4B'],
  ['BharatPe',     'bharatpe.com',     '#e8192c', 'Fintech',     '10x',   '$2B'],
  ['GlobalBees',   'globalbees.com',   '#65a30d', 'D2C',         '10x',   '$1B'],
  ['DealShare',    'dealshare.in',     '#10b981', 'E-commerce',  '10x',   '$400M'],
  ['CRED',         'cred.club',        '#6366f1', 'Fintech',     '80x',   '$6.4B'],
  ['Mensa Brands', 'mensabrands.com',  '#db2777', 'D2C',         '8x',    '$1B'],
  ['Stanza',       'stanzaliving.com', '#64748b', 'Proptech',    '8x',    '$400M'],
  ['Droom',        'droom.in',         '#818cf8', 'Auto Tech',   '8x',    '$1B'],
  ['PharmEasy',    'pharmeasy.in',     '#22c55e', 'Healthtech',  '4x',    '$1.5B'],
]

export default function Proof() {
  return (
    <section id="proof" className="relative py-32 bg-[#060D18] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase">
            Signals, Not Exceptions
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-center mb-3 text-white"
        >
          The exits have already started.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 text-base mb-4"
        >
          50 Indian unicorns. Early-stage returns vs. current valuation.
        </motion.p>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex justify-center gap-5 mb-12 flex-wrap"
        >
          {([['100x+', '#f0abfc'], ['20x+', '#4ade80'], ['10x+', '#86efac'], ['5x+', '#facc15'], ['<5x', '#fb923c']] as [string, string][]).map(([label, color]) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              {label} return
            </span>
          ))}
        </motion.div>

        {/* 3-row window — scroll to reveal all 50 companies */}
        <div className="relative">
          {/* Top fade — masks rows that have scrolled past */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#060D18] to-transparent z-10 pointer-events-none" />
          {/* Bottom hint — shows more content below */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060D18] via-[#060D18]/70 to-transparent z-10 pointer-events-none" />

          <div
            className="overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{ maxHeight: '500px', scrollbarWidth: 'none' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-8">
              {companies.map(([name, domain, color, industry, multiple, valuation], i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: (i % 10) * 0.03 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex flex-col bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 cursor-default"
                >
                  {/* Logo + name */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                      style={{ background: hex2rgba(color, 0.18) }}
                    >
                      <span className="font-black text-xs absolute select-none" style={{ color }}>
                        {name.charAt(0)}
                      </span>
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
                        alt={name}
                        width={24}
                        height={24}
                        className="relative z-10 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                    <span className="font-semibold text-xs text-white truncate leading-tight">{name}</span>
                  </div>

                  {/* Industry */}
                  <div className="mb-3">
                    <span
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: hex2rgba(color, 0.12), color }}
                    >
                      {industry}
                    </span>
                  </div>

                  {/* Multiple + Valuation */}
                  <div className="mt-auto border-t border-white/[0.08] pt-3 flex items-end justify-between gap-1 min-w-0">
                    <div className="min-w-0">
                      <div
                        className="font-black text-lg leading-none"
                        style={{ color: mColor(multiple) }}
                      >
                        {multiple}
                      </div>
                      <div className="text-slate-600 text-[9px] mt-0.5 whitespace-nowrap">max investor return</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-sm leading-none text-slate-300">{valuation}</div>
                      <div className="text-slate-600 text-[9px] mt-0.5">valuation</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 text-slate-500 text-xs pointer-events-none">
            <svg className="w-3 h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            scroll to see all 50
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          These early-stage investors turned{' '}
          <span className="text-white font-semibold">₹1 into ₹8–₹500</span>.
          {' '}The next crop is forming now.
        </motion.p>
      </div>
    </section>
  )
}
