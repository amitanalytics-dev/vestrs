'use client'

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
      { label: 'Where deals live',    color: 'text-red-700 bg-red-100',    content: "Top rounds close in private WhatsApp groups, founder networks, and warm VC referrals — not on any public platform" },
      { label: 'Who controls access', color: 'text-orange-700 bg-orange-100', content: "Lead investors are India's tier-1 VCs who don't share deal flow with unknown foreign angels" },
      { label: 'Speed of close',      color: 'text-amber-700 bg-amber-100', content: "Pre-Series A rounds often close in 2–3 weeks. Without a local scout, you never even see the email" },
    ],
    closer: "Vestrs is already in those rooms. You plug straight in.",
  },
  {
    number: '02',
    accentColor: '#FBBF24',
    borderClass: 'border-l-4 border-amber-400',
    labelClass: 'text-amber-400',
    title: 'The market is fragmented',
    body: "200+ cities. 10+ regulatory layers. Dozens of sectors moving at different speeds. Without local knowledge, you're flying blind.",
    bullets: [
      { label: 'Geography',   color: 'text-amber-700 bg-amber-100',  content: "28 states, 200+ cities — each with its own consumer behaviour, regulation, and competitive dynamics" },
      { label: 'Sectors',     color: 'text-orange-700 bg-orange-100', content: "Fintech, SaaS, D2C, agritech, healthtech — every vertical has its own cycle, jargon, and market map. Knowing one doesn't mean knowing another" },
      { label: 'Intel',       color: 'text-red-700 bg-red-100',      content: "Without on-ground advisors and founder relationships, you cannot separate true signal from noise in India's fast-moving startup scene" },
    ],
    closer: "Vestrs gives you local depth without needing a local office.",
  },
  {
    number: '03',
    accentColor: '#A78BFA',
    borderClass: 'border-l-4 border-violet-400',
    labelClass: 'text-violet-400',
    title: 'Investing from the US into India is structurally broken',
    body: 'Two regulatory systems. Zero handholding.',
    bullets: [
      { label: 'India side', color: 'text-emerald-700 bg-emerald-100', content: 'FEMA regulations, RBI approval layers, cross-border fund structuring' },
      { label: 'US side',    color: 'text-sky-700 bg-sky-100',        content: 'PFIC classification, FBAR reporting, no QSBS exemption for foreign companies, FATCA compliance' },
      { label: 'Both sides', color: 'text-violet-700 bg-violet-100',  content: 'Currency risk, repatriation complexity, no standardised cap table docs, accounting standard gaps (GAAP vs IndAS)' },
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
              className={`bg-white/[0.04] ${p.borderClass} border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300`}
            >
              <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-black mb-5 bg-white/[0.07] ${p.labelClass}`}>
                {p.number}
              </div>

              <h3 className="text-base font-bold mb-3 text-white leading-snug">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.body}</p>

              <div className="space-y-2.5 mb-4">
                {p.bullets.map((b) => (
                  <div key={b.label} className="flex gap-2.5 items-start">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${b.color}`}>
                      {b.label}
                    </span>
                    <p className="text-slate-400 text-xs leading-relaxed">{b.content}</p>
                  </div>
                ))}
              </div>

              <p className="text-slate-300 text-sm italic border-t border-white/8 pt-4 font-medium">
                {p.closer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
