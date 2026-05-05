'use client'

import { motion } from 'framer-motion'

const problems = [
  {
    number: '01',
    title: "The deals aren't findable",
    body: "India's best early-stage rounds don't show up on AngelList. They close through WhatsApp groups and warm intros. If you're not in the room, you're not in the deal.",
    bullets: null,
    closer: null,
  },
  {
    number: '02',
    title: 'The market is fragmented',
    body: "200+ cities. 10+ regulatory layers. Dozens of sectors moving at different speeds. Without local knowledge, you're flying blind.",
    bullets: null,
    closer: null,
  },
  {
    number: '03',
    title: 'Investing from the US into India is structurally broken',
    body: 'Two regulatory systems. Zero handholding.',
    bullets: [
      {
        label: 'India side',
        content: 'FEMA regulations, RBI approval layers, cross-border fund structuring',
      },
      {
        label: 'US side',
        content:
          'PFIC classification, FBAR reporting, no QSBS exemption for foreign companies, FATCA compliance',
      },
      {
        label: 'Both sides',
        content:
          'Currency risk, repatriation complexity, no standardised cap table docs, accounting standard gaps (GAAP vs IndAS)',
      },
    ],
    closer:
      'Most global investors read the first paragraph and close the tab. Vestrs handles all of it.',
  },
]

export default function TheGap() {
  return (
    <section className="py-32 bg-[#030d1a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-[#0FFFC1] text-xs font-bold tracking-[0.2em] uppercase">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl leading-tight">
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
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-[#0FFFC1]/20 transition-colors duration-300"
            >
              <div className="text-[#0FFFC1]/15 text-6xl font-black leading-none mb-5 select-none">
                {p.number}
              </div>

              <h3 className="text-lg font-bold mb-3 leading-snug">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{p.body}</p>

              {p.bullets && (
                <>
                  <div className="space-y-3 mb-5">
                    {p.bullets.map((b) => (
                      <div key={b.label} className="border-l-2 border-[#0FFFC1]/30 pl-3">
                        <span className="text-[#0FFFC1] text-[10px] font-bold uppercase tracking-widest block mb-0.5">
                          {b.label}
                        </span>
                        <p className="text-white/45 text-xs leading-relaxed">{b.content}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/65 text-sm italic border-t border-white/[0.06] pt-4">
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
