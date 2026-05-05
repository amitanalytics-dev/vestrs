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

const companies = [
  { name: 'Flipkart',     domain: 'flipkart.com',      color: '#1e88e5', industry: 'E-commerce',  multiple: '400x' },
  { name: 'Freshworks',   domain: 'freshworks.com',    color: '#25c16f', industry: 'SaaS',         multiple: '500x' },
  { name: 'Zomato',       domain: 'zomato.com',        color: '#e23744', industry: 'Foodtech',     multiple: '200x' },
  { name: 'Razorpay',     domain: 'razorpay.com',      color: '#2eb5c1', industry: 'Fintech',      multiple: '150x' },
  { name: "BYJU'S",       domain: 'byjus.com',         color: '#0b3d91', industry: 'Edtech',       multiple: '80x'  },
  { name: 'Meesho',       domain: 'meesho.com',        color: '#9b5de5', industry: 'E-commerce',   multiple: '80x'  },
  { name: 'Nykaa',        domain: 'nykaa.com',         color: '#fc4f8c', industry: 'Beauty',       multiple: '100x' },
  { name: 'PolicyBazaar', domain: 'policybazaar.com',  color: '#ef4444', industry: 'Insurtech',    multiple: '100x' },
  { name: 'Dream11',      domain: 'dream11.com',       color: '#e63946', industry: 'Gaming',       multiple: '50x'  },
  { name: 'MakeMyTrip',   domain: 'makemytrip.com',    color: '#e60026', industry: 'Travel',       multiple: '60x'  },
  { name: 'Chargebee',    domain: 'chargebee.com',     color: '#f97316', industry: 'SaaS',         multiple: '40x'  },
  { name: 'PhonePe',      domain: 'phonepe.com',       color: '#7c3aed', industry: 'Fintech',      multiple: '40x'  },
  { name: 'Amagi',        domain: 'amagi.tv',          color: '#dc2626', industry: 'Media Tech',   multiple: '35x'  },
  { name: 'Zepto',        domain: 'zepto.in',          color: '#a855f7', industry: 'Q-Commerce',   multiple: '30x'  },
  { name: 'Paytm',        domain: 'paytm.com',         color: '#1a6fc4', industry: 'Fintech',      multiple: '30x'  },
  { name: 'InMobi',       domain: 'inmobi.com',        color: '#ff5733', industry: 'Adtech',       multiple: '30x'  },
  { name: 'ShareChat',    domain: 'sharechat.com',     color: '#f7a51e', industry: 'Social',       multiple: '30x'  },
  { name: 'BlackBuck',    domain: 'blackbuck.com',     color: '#1e40af', industry: 'Logistics',    multiple: '28x'  },
  { name: 'Darwinbox',    domain: 'darwinbox.com',     color: '#1d4ed8', industry: 'HR Tech',      multiple: '25x'  },
  { name: 'Lenskart',     domain: 'lenskart.com',      color: '#0ea5e9', industry: 'Eyewear',      multiple: '25x'  },
  { name: 'Ola',          domain: 'olacabs.com',       color: '#555555', industry: 'Mobility',     multiple: '25x'  },
  { name: 'Zetwerk',      domain: 'zetwerk.com',       color: '#0891b2', industry: 'Mfg Tech',     multiple: '22x'  },
  { name: 'Infra.Market', domain: 'infra.market',      color: '#d97706', industry: 'B2B',          multiple: '22x'  },
  { name: 'Slice',        domain: 'sliceit.app',       color: '#f0522b', industry: 'Fintech',      multiple: '20x'  },
  { name: 'Swiggy',       domain: 'swiggy.com',        color: '#fc8019', industry: 'Foodtech',     multiple: '20x'  },
  { name: 'Groww',        domain: 'groww.in',          color: '#00b386', industry: 'Fintech',      multiple: '20x'  },
  { name: 'Moglix',       domain: 'moglix.com',        color: '#f59e0b', industry: 'B2B',          multiple: '20x'  },
  { name: 'Acko',         domain: 'acko.com',          color: '#7c3aed', industry: 'Insurtech',    multiple: '20x'  },
  { name: 'NoBroker',     domain: 'nobroker.com',      color: '#f43f5e', industry: 'Proptech',     multiple: '18x'  },
  { name: 'OfBusiness',   domain: 'ofbusiness.in',     color: '#0d9488', industry: 'B2B',          multiple: '18x'  },
  { name: 'Spinny',       domain: 'spinny.com',        color: '#3b82f6', industry: 'Auto Tech',    multiple: '18x'  },
  { name: 'XpressBees',   domain: 'xpressbees.com',   color: '#f97316', industry: 'Logistics',    multiple: '14x'  },
  { name: 'MPL',          domain: 'mpl.live',          color: '#6366f1', industry: 'Gaming',       multiple: '15x'  },
  { name: 'Vedantu',      domain: 'vedantu.com',       color: '#4d5cde', industry: 'Edtech',       multiple: '15x'  },
  { name: 'Open Fin.',    domain: 'open.money',        color: '#7c3aed', industry: 'Fintech',      multiple: '15x'  },
  { name: 'LeadSquared',  domain: 'leadsquared.com',  color: '#4f46e5', industry: 'SaaS',         multiple: '15x'  },
  { name: 'Unacademy',    domain: 'unacademy.com',     color: '#0880ae', industry: 'Edtech',       multiple: '12x'  },
  { name: 'Udaan',        domain: 'udaan.com',         color: '#e11d48', industry: 'B2B',          multiple: '12x'  },
  { name: 'Fractal',      domain: 'fractal.ai',        color: '#2563eb', industry: 'Analytics',    multiple: '12x'  },
  { name: 'Pristyn Care', domain: 'pristyncare.com',   color: '#06b6d4', industry: 'Healthtech',   multiple: '12x'  },
  { name: 'Rapido',       domain: 'rapido.bike',       color: '#ca8a04', industry: 'Mobility',     multiple: '12x'  },
  { name: 'OneCard',      domain: 'getonecard.app',    color: '#ef4444', industry: 'Fintech',      multiple: '12x'  },
  { name: 'BharatPe',     domain: 'bharatpe.com',      color: '#e8192c', industry: 'Fintech',      multiple: '10x'  },
  { name: 'GlobalBees',   domain: 'globalbees.com',    color: '#65a30d', industry: 'D2C',          multiple: '10x'  },
  { name: 'DealShare',    domain: 'dealshare.in',      color: '#10b981', industry: 'E-commerce',   multiple: '10x'  },
  { name: 'CRED',         domain: 'cred.club',         color: '#6366f1', industry: 'Fintech',      multiple: '8x'   },
  { name: 'Mensa Brands', domain: 'mensabrands.com',   color: '#db2777', industry: 'D2C',          multiple: '8x'   },
  { name: 'Stanza',       domain: 'stanzaliving.com',  color: '#64748b', industry: 'Proptech',     multiple: '8x'   },
  { name: 'Droom',        domain: 'droom.in',          color: '#818cf8', industry: 'Auto Tech',    multiple: '8x'   },
  { name: 'PharmEasy',    domain: 'pharmeasy.in',      color: '#22c55e', industry: 'Healthtech',   multiple: '4x'   },
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
          50 Indian unicorns. Early-stage investor returns.
        </motion.p>

        {/* Multiple legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {[['100x+', '#f0abfc'], ['20x+', '#4ade80'], ['10x+', '#86efac'], ['5x+', '#facc15'], ['<5x', '#fb923c']].map(([label, color]) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              {label}
            </span>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {companies.map((co, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: (i % 10) * 0.03 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 cursor-default"
            >
              {/* Logo + name */}
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                  style={{ background: hex2rgba(co.color, 0.18) }}
                >
                  <span
                    className="font-black text-sm absolute select-none"
                    style={{ color: co.color }}
                  >
                    {co.name.charAt(0)}
                  </span>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${co.domain}&sz=128`}
                    alt={co.name}
                    width={28}
                    height={28}
                    className="relative z-10 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <span className="font-semibold text-sm text-white truncate leading-tight">{co.name}</span>
              </div>

              {/* Industry */}
              <div className="mb-3">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: hex2rgba(co.color, 0.12), color: co.color }}
                >
                  {co.industry}
                </span>
              </div>

              {/* Multiple */}
              <div className="mt-auto border-t border-white/[0.08] pt-3">
                <div
                  className="font-black text-xl leading-none"
                  style={{ color: mColor(co.multiple) }}
                >
                  {co.multiple}
                </div>
                <div className="text-slate-500 text-[10px] mt-1">early-stage return</div>
              </div>
            </motion.div>
          ))}
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
