'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    number: '01',
    accentColor: '#EF4444',
    accentBg: '#FEF2F2',
    borderClass: 'border-l-4 border-red-400',
    labelClass: 'text-red-600',
    title: "The deals aren't findable",
    body: "India's best early-stage rounds don't show up on AngelList. They close through WhatsApp groups and warm intros. If you're not in the room, you're not in the deal.",
    bullets: null,
    closer: null,
  },
  {
    number: '02',
    accentColor: '#F59E0B',
    accentBg: '#FFFBEB',
    borderClass: 'border-l-4 border-amber-400',
    labelClass: 'text-amber-600',
    title: 'The market is fragmented',
    body: "200+ cities. 10+ regulatory layers. Dozens of sectors moving at different speeds. Without local knowledge, you're flying blind.",
    bullets: null,
    closer: null,
  },
  {
    number: '03',
    accentColor: '#7C3AED',
    accentBg: '#F5F3FF',
    borderClass: 'border-l-4 border-violet-400',
    labelClass: 'text-violet-600',
    title: 'Investing from the US into India is structurally broken',
    body: 'Two regulatory systems. Zero handholding.',
    bullets: [
      { label: 'India side', color: 'text-emerald-700 bg-emerald-50', content: 'FEMA regulations, RBI approval layers, cross-border fund structuring' },
      { label: 'US side', color: 'text-sky-700 bg-sky-50', content: 'PFIC classification, FBAR reporting, no QSBS exemption for foreign companies, FATCA compliance' },
      { label: 'Both sides', color: 'text-violet-700 bg-violet-50', content: 'Currency risk, repatriation complexity, no standardised cap table docs, accounting standard gaps (GAAP vs IndAS)' },
    ],
    closer: 'Most global investors read the first paragraph and close the tab. Vestrs handles all of it.',
  },
]

export default function TheGap() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl leading-tight text-[#0F172A]">
            Global investors know India is happening. They just can&apos;t get in.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -3 }}
              className={`bg-white ${p.borderClass} rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-black mb-5`}
                style={{ background: p.accentBg, color: p.accentColor }}>
                {p.number}
              </div>

              <h3 className="text-base font-bold mb-3 text-[#0F172A] leading-snug">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.body}</p>

              {p.bullets && (
                <>
                  <div className="space-y-2.5 mb-4">
                    {p.bullets.map((b) => (
                      <div key={b.label} className="flex gap-2.5 items-start">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${b.color}`}>
                          {b.label}
                        </span>
                        <p className="text-slate-500 text-xs leading-relaxed">{b.content}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic border-t border-slate-100 pt-4 font-medium">
                    {p.closer}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
