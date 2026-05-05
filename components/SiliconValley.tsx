'use client'

import { motion } from 'framer-motion'

const timeline = [
  {
    era: '1995',
    label: 'Early US Internet',
    names: 'Amazon · Google · eBay · Yahoo',
    returns: '1000x+',
    note: 'The investors who were early made careers, not just returns. Most missed it because it seemed too early.',
    highlight: false,
  },
  {
    era: '2005',
    label: 'Early China Internet',
    names: 'Alibaba · Tencent · Baidu · JD.com',
    returns: '500x+',
    note: 'A decade of compounding that global latecomers missed entirely. Those who entered early retired on it.',
    highlight: false,
  },
  {
    era: '2025',
    label: 'India — Right Now',
    names: 'Next Flipkart · Next Razorpay · Next ?',
    returns: '???',
    note: "The infrastructure is built. The founders are ready. The consumers are online. The window is open. Most global investors still haven't walked through it.",
    highlight: true,
  },
]

export default function SiliconValley() {
  return (
    <section id="the-parallel" className="relative py-32 bg-[#060D18] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
            <p className="text-slate-400 leading-relaxed mb-5 text-base">
              Early China. Early US internet. Every decade, a window opens where a
              market transitions from emerging to inevitable. The investors who enter
              early don&apos;t just make returns — they make careers.
            </p>
            <p className="text-slate-400 leading-relaxed mb-5 text-base">
              India is at that inflection point right now. 112 unicorns. $50B+ in
              IPO exits since 2021. World-class founders who used to leave for the
              Valley — staying home. What&apos;s missing is patient, conviction-based
              global capital.
            </p>
            <p className="text-white font-bold text-base">That&apos;s where you come in.</p>
          </motion.div>

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
                {item.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      Right Now
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-5">
                  <div className={`text-2xl font-black leading-none flex-shrink-0 ${item.highlight ? 'text-gradient-teal' : 'text-slate-600'}`}>
                    {item.era}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm mb-0.5 text-white">{item.label}</div>
                    <div className="text-slate-500 text-xs mb-2">{item.names}</div>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.note}</p>
                  </div>
                  <div className={`flex-shrink-0 text-right font-black text-xl leading-none ${item.highlight ? 'text-gradient-teal' : 'text-slate-600'}`}>
                    {item.returns}
                    <div className="text-slate-600 text-[10px] font-normal mt-0.5">early median</div>
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
