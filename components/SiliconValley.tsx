'use client'

import { motion } from 'framer-motion'

const timeline = [
  {
    era: '1995',
    label: 'Early US Internet',
    names: 'Amazon · Google · eBay',
    returns: '1000x+',
    note: 'Investors who were early made careers, not just returns.',
  },
  {
    era: '2005',
    label: 'Early China Internet',
    names: 'Alibaba · Tencent · Baidu',
    returns: '500x+',
    note: 'A decade of compounding that global latecomers missed entirely.',
  },
  {
    era: '2025',
    label: 'India — Now',
    names: 'Next Flipkart · Next Razorpay · Next ?',
    returns: '???',
    note: 'The window is open. Most global investors still haven\'t walked through it.',
    highlight: true,
  },
]

export default function SiliconValley() {
  return (
    <section className="py-32 bg-[#051628]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#0FFFC1] text-xs font-bold tracking-[0.2em] uppercase">
              The Parallel
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              You&apos;ve seen this movie before.
            </h2>
            <p className="text-white/55 leading-relaxed mb-5 text-base">
              Early China. Early US internet. Every decade, a window opens where a
              market transitions from emerging to inevitable. The investors who enter
              early don&apos;t just make returns — they make careers.
            </p>
            <p className="text-white/55 leading-relaxed mb-5 text-base">
              India is at that inflection point. The infrastructure is built. The
              founders are ready. The consumers are online. What&apos;s missing is patient,
              conviction-based global capital.
            </p>
            <p className="text-white font-semibold text-base">
              That&apos;s where you come in.
            </p>
          </motion.div>

          {/* Right — Timeline */}
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative rounded-2xl p-6 border transition-colors duration-300 ${
                  item.highlight
                    ? 'bg-[#0FFFC1]/[0.06] border-[#0FFFC1]/30'
                    : 'bg-white/[0.03] border-white/[0.08]'
                }`}
              >
                {item.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#0FFFC1]/15 text-[#0FFFC1] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Right Now
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div
                      className={`text-2xl font-black leading-none ${
                        item.highlight ? 'text-[#0FFFC1]' : 'text-white/25'
                      }`}
                    >
                      {item.era}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm mb-0.5">{item.label}</div>
                    <div className="text-white/35 text-xs mb-2">{item.names}</div>
                    <p className="text-white/45 text-xs leading-relaxed">{item.note}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div
                      className={`font-black text-xl leading-none ${
                        item.highlight ? 'text-[#0FFFC1]' : 'text-white/30'
                      }`}
                    >
                      {item.returns}
                    </div>
                    <div className="text-white/25 text-[10px] mt-0.5">early median</div>
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
