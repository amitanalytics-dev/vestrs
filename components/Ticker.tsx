'use client'

const ITEMS = [
  { icon: '🇮🇳', text: "World's 3rd largest startup ecosystem — 100+ unicorns and growing" },
  { icon: '📈', text: 'Freshworks: $1M seed → $12B Nasdaq IPO · ~500x return' },
  { icon: '💰', text: 'UPI processed $2.2T in 2023 — world\'s largest real-time payments network' },
  { icon: '🏆', text: 'Zomato: Info Edge\'s seed cheque returned 200x+ at IPO' },
  { icon: '👥', text: '65% of 1.4B people are under 35 — biggest young digital consumer base' },
  { icon: '📊', text: 'Median early-stage VC return in India: 18–25x in 5–7 years (IVCA 2023)' },
  { icon: '🎓', text: '1.5M engineers graduate annually — world-class talent at global cost advantage' },
  { icon: '⚡', text: 'Fastest-growing $1T digital economy — projected $5T by 2030' },
  { icon: '📱', text: '87% fintech adoption — highest globally (EY Fintech Adoption Index)' },
  { icon: '🌐', text: 'Dream11: Kalaari Capital\'s early bet returned ~50x in 6 years' },
  { icon: '💡', text: 'Flipkart: $1M Series A (2010) → $20B Walmart exit · ~400x' },
  { icon: '🦄', text: '50+ new unicorns minted in 3 years · one new unicorn every 3 weeks' },
  { icon: '🏛️', text: 'Startup India: ₹10,000Cr Fund of Funds backing early-stage VCs since 2016' },
  { icon: '🔥', text: 'Nykaa: TVS Capital\'s early stake → ~100x return at IPO' },
  { icon: '💎', text: 'PolicyBazaar: Info Edge\'s early cheque → 100x+ at IPO' },
  { icon: '🚀', text: '800M+ internet users growing 40M per year — the next billion consumers are here' },
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="relative bg-[#04090F] border-y border-orange-500/[0.15] py-3 overflow-hidden">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#04090F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#04090F] to-transparent z-10 pointer-events-none" />

      <div className="ticker-track flex w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-[11px] text-orange-200/65 whitespace-nowrap border-r border-orange-500/[0.14]"
          >
            <span className="text-sm">{item.icon}</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
