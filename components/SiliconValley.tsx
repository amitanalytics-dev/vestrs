'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const timeline = [
  {
    era: '1995',
    label: 'Early US Internet',
    names: 'Amazon · Google · eBay · Yahoo',
    returns: '1000x+',
    returnVal: 1000,
    pillColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    yearColor: 'text-slate-600',
    note: 'Investors who were early made careers, not just returns.',
    highlight: false,
  },
  {
    era: '2005',
    label: 'Early China Internet',
    names: 'Alibaba · Tencent · Baidu · JD.com',
    returns: '500x+',
    returnVal: 500,
    pillColor: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
    yearColor: 'text-slate-500',
    note: 'A decade of compounding global latecomers missed entirely.',
    highlight: false,
  },
  {
    era: '2025',
    label: 'India — Right Now',
    names: 'Next Flipkart · Next Razorpay · Next ?',
    returns: 'TBD',
    returnVal: null,
    pillColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
    yearColor: 'text-gradient-teal',
    note: 'Infrastructure built. Founders ready. Window open.',
    highlight: true,
  },
]

const MAX_RETURN = 1000

function MiniBar({
  value,
  color,
  isIndia,
}: {
  value: number | null
  color: string
  isIndia: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  if (isIndia) {
    return (
      <div ref={ref} className="flex items-center gap-3 mt-4">
        <span className="text-slate-600 text-[10px] uppercase tracking-widest font-bold w-16 flex-shrink-0">
          Returns
        </span>
        <div className="flex-1 h-5 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center px-3 overflow-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 1, 0, 1] } : {}}
            transition={{ duration: 1.2, delay: 0.4, repeat: Infinity, repeatDelay: 1.5 }}
            className="text-emerald-400 text-[10px] font-black tracking-widest"
          >
            WRITING NOW ▮
          </motion.span>
        </div>
      </div>
    )
  }

  const pct = value ? (value / MAX_RETURN) * 100 : 0

  return (
    <div ref={ref} className="flex items-center gap-3 mt-4">
      <span className="text-slate-600 text-[10px] uppercase tracking-widest font-bold w-16 flex-shrink-0">
        Returns
      </span>
      <div className="flex-1 h-5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${pct}%` } : { width: '0%' }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
      <span className="text-slate-500 text-[10px] font-bold w-10 text-right flex-shrink-0">
        {value}x
      </span>
    </div>
  )
}

export default function SiliconValley() {
  return (
    <section id="the-parallel" className="relative py-32 bg-[#060D18] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left col */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase">The Parallel</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight text-white">
              You&apos;ve seen this movie before.
            </h2>
            <ul className="space-y-3 mb-6">
              {[
                'Every decade, one market goes from emerging to inevitable.',
                'Early investors don\'t just make returns — they make careers.',
                'India is at that inflection. Most global capital still hasn\'t arrived.',
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400 text-base leading-snug">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="text-white font-bold text-base">That&apos;s where you come in.</p>
          </motion.div>

          {/* Right col — timeline cards */}
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ x: 4 }}
                className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                  item.highlight
                    ? 'bg-gradient-to-r from-emerald-950/60 to-sky-950/60 border-emerald-500/30 shadow-lg shadow-emerald-900/20'
                    : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07]'
                }`}
              >
                {/* Pulse ring on India card */}
                {item.highlight && (
                  <span className="absolute top-4 left-4 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                )}

                {item.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Right Now
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-5">
                  {/* Giant year */}
                  <div
                    className={`text-6xl font-black leading-none flex-shrink-0 ${item.yearColor}`}
                    style={{ minWidth: '5.5rem' }}
                  >
                    {item.era}
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <div className="font-bold text-sm text-white">{item.label}</div>
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${item.pillColor}`}>
                        {item.returns}
                      </span>
                    </div>
                    <div className="text-slate-500 text-xs mb-2">{item.names}</div>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.note}</p>
                    <MiniBar
                      value={item.returnVal}
                      color={
                        i === 0
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-gradient-to-r from-sky-500 to-blue-400'
                      }
                      isIndia={item.highlight}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
