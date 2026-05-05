'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'

const problems = [
  {
    number: '01',
    accentColor: '#F87171',
    borderClass: 'border-l-4 border-red-400',
    labelClass: 'text-red-400',
    title: "The deals aren't findable",
    body: "India's best early-stage rounds don't show up on AngelList. They close through WhatsApp groups and warm intros. If you're not in the room, you're not in the deal.",
    bullets: [
      {
        label: 'Where deals live',
        color: 'bg-red-500/10 border border-red-500/25 text-red-400',
        content: 'Top rounds close in private WhatsApp groups, founder networks, and warm VC referrals — not on any public platform',
      },
      {
        label: 'Who controls access',
        color: 'bg-orange-500/10 border border-orange-500/25 text-orange-400',
        content: "Lead investors are India's tier-1 VCs who don't share deal flow with unknown foreign angels",
      },
      {
        label: 'Speed of close',
        color: 'bg-amber-500/10 border border-amber-500/25 text-amber-400',
        content: 'Pre-Series A rounds often close in 2–3 weeks. Without a local scout, you never even see the email',
      },
    ],
    closer: 'Vestrs is already in those rooms. You plug straight in.',
  },
  {
    number: '02',
    accentColor: '#FBBF24',
    borderClass: 'border-l-4 border-amber-400',
    labelClass: 'text-amber-400',
    title: 'The market is fragmented',
    body: "200+ cities. 10+ regulatory layers. Dozens of sectors moving at different speeds. Without local knowledge, you're flying blind.",
    bullets: [
      {
        label: 'Geography',
        color: 'bg-amber-500/10 border border-amber-500/25 text-amber-400',
        content: '28 states, 200+ cities — each with its own consumer behaviour, regulation, and competitive dynamics',
      },
      {
        label: 'Sectors',
        color: 'bg-orange-500/10 border border-orange-500/25 text-orange-400',
        content: "Fintech, SaaS, D2C, agritech, healthtech — every vertical has its own cycle, jargon, and market map. Knowing one doesn't mean knowing another",
      },
      {
        label: 'Intel',
        color: 'bg-red-500/10 border border-red-500/25 text-red-400',
        content: "Without on-ground advisors and founder relationships, you cannot separate true signal from noise in India's fast-moving startup scene",
      },
    ],
    closer: 'Vestrs gives you local depth without needing a local office.',
  },
  {
    number: '03',
    accentColor: '#A78BFA',
    borderClass: 'border-l-4 border-violet-400',
    labelClass: 'text-violet-400',
    title: 'Investing from the US into India is structurally broken',
    body: 'Two regulatory systems. Zero handholding.',
    bullets: [
      {
        label: 'India side',
        color: 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400',
        content: 'FEMA regulations, RBI approval layers, cross-border fund structuring',
      },
      {
        label: 'US side',
        color: 'bg-sky-500/10 border border-sky-500/25 text-sky-400',
        content: 'PFIC classification, FBAR reporting, no QSBS exemption for foreign companies, FATCA compliance',
      },
      {
        label: 'Both sides',
        color: 'bg-violet-500/10 border border-violet-500/25 text-violet-400',
        content: 'Currency risk, repatriation complexity, no standardised cap table docs, accounting standard gaps (GAAP vs IndAS)',
      },
    ],
    closer: 'Most global investors read the first paragraph and close the tab. Vestrs handles all of it.',
  },
]

export default function TheGap() {
  return (
    <section id="the-gap" className="relative py-32 bg-[#07101D] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-red-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 max-w-2xl leading-tight text-white">
            Global investors know India is happening.{' '}
            <span className="text-gradient-teal">They just can&apos;t get in.</span>
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
              className={`flex flex-col bg-white/[0.04] ${p.borderClass} border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300`}
            >
              <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-black mb-5 bg-white/[0.07] ${p.labelClass}`}>
                {p.number}
              </div>

              <h3 className="text-base font-bold mb-3 text-white leading-snug">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.body}</p>

              {/*
                Grid with two columns:
                  col 1 = max-content → all badges share the width of the widest badge in this card,
                           so every text block starts at the same x-position
                  col 2 = 1fr        → text fills remaining width and wraps cleanly within its column
              */}
              <div
                className="mb-5"
                style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: '10px', rowGap: '10px' }}
              >
                {p.bullets.map((b) => (
                  <Fragment key={b.label}>
                    {/* Badge — whitespace-nowrap prevents the label itself from wrapping */}
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap self-start mt-0.5 ${b.color}`}
                    >
                      {b.label}
                    </span>

                    {/* Content — min-w-0 allows text to shrink and wrap within its column */}
                    <p className="text-slate-400 text-xs leading-relaxed min-w-0">
                      {b.content}
                    </p>
                  </Fragment>
                ))}
              </div>

              <div className="mt-auto border-t border-white/8 pt-4">
                <p className="text-slate-300 text-sm italic font-medium">{p.closer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
