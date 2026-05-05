'use client'

const THESIS = [
  { icon: '🇮🇳', text: "World's 3rd largest startup ecosystem — 100+ unicorns and counting" },
  { icon: '📈', text: "Freshworks: Accel India's $1M seed → $12B Nasdaq IPO · ~500x" },
  { icon: '🚀', text: '800M+ internet users growing 40M per year — the next billion are online' },
  { icon: '💡', text: "Flipkart: Accel India's $1M Series A (2010) → $20B Walmart exit · ~400x" },
  { icon: '💰', text: "UPI processed $2.2 trillion in 2023 — world's largest real-time payment network" },
  { icon: '🏆', text: "Zomato: Info Edge's seed bet → 200x+ return at IPO" },
  { icon: '👥', text: '65% of 1.4 billion people under 35 — biggest young digital consumer base on Earth' },
  { icon: '📊', text: 'Median early-stage VC return in India: 18–25x in 5–7 years (IVCA 2023)' },
  { icon: '⚡', text: "India's digital economy: $1T today → projected $5T by 2030" },
  { icon: '🏛️', text: 'Startup India: ₹10,000Cr Fund of Funds backing early-stage VCs since 2016' },
  { icon: '📱', text: '87% fintech adoption rate — highest globally (EY Fintech Adoption Index)' },
  { icon: '🌐', text: "Dream11: Kalaari Capital's early cheque → ~50x in 6 years" },
  { icon: '🔥', text: "Nykaa: TVS Capital's early stake → ~100x at IPO" },
  { icon: '💎', text: "PolicyBazaar: Info Edge's early bet → 100x+ at IPO" },
  { icon: '🦄', text: '50+ new unicorns minted in 3 years — one every 3 weeks' },
]

// [name, color, multiple]
const CHIPS: [string, string, string][] = [
  ['Flipkart',     '#1e88e5', '400x'],  ['Freshworks',   '#25c16f', '500x'],
  ['Zomato',       '#e23744', '200x'],  ['Razorpay',     '#2eb5c1', '150x'],
  ['Nykaa',        '#fc4f8c', '100x'],  ['PolicyBazaar', '#ef4444', '100x'],
  ["BYJU'S",       '#0b3d91', '80x'],   ['Meesho',       '#9b5de5', '100x'],
  ['Dream11',      '#e63946', '50x'],   ['MakeMyTrip',   '#e60026', '60x'],
  ['PhonePe',      '#7c3aed', '50x'],   ['Chargebee',    '#f97316', '40x'],
  ['Amagi',        '#dc2626', '35x'],   ['Paytm',        '#1a6fc4', '30x'],
  ['InMobi',       '#ff5733', '30x'],   ['ShareChat',    '#f7a51e', '30x'],
  ['Zepto',        '#a855f7', '60x'],   ['BlackBuck',    '#1e40af', '28x'],
  ['Lenskart',     '#0ea5e9', '25x'],   ['Darwinbox',    '#1d4ed8', '25x'],
  ['Ola',          '#888888', '25x'],   ['MakeMyTrip',   '#e60026', '60x'],
  ['Zetwerk',      '#0891b2', '22x'],   ['Infra.Market', '#d97706', '22x'],
  ['Swiggy',       '#fc8019', '30x'],   ['Groww',        '#00b386', '50x'],
  ['Moglix',       '#f59e0b', '20x'],   ['Acko',         '#7c3aed', '20x'],
  ['Slice',        '#f0522b', '20x'],   ['OfBusiness',   '#0d9488', '18x'],
  ['Spinny',       '#3b82f6', '18x'],   ['NoBroker',     '#f43f5e', '18x'],
  ['MPL',          '#6366f1', '15x'],   ['LeadSquared',  '#4f46e5', '15x'],
  ['Vedantu',      '#4d5cde', '15x'],   ['Unacademy',    '#0880ae', '12x'],
  ['Fractal',      '#2563eb', '12x'],   ['Pristyn',      '#06b6d4', '12x'],
  ['Rapido',       '#ca8a04', '12x'],   ['OneCard',      '#ef4444', '12x'],
  ['BharatPe',     '#e8192c', '10x'],   ['GlobalBees',   '#65a30d', '10x'],
  ['DealShare',    '#10b981', '10x'],   ['CRED',         '#6366f1', '80x'],
  ['Droom',        '#818cf8', '8x'],    ['Stanza',       '#64748b', '8x'],
  ['PharmEasy',    '#22c55e', '4x'],    ['XpressBees',   '#f97316', '14x'],
]

function mColor(m: string) {
  const v = parseFloat(m)
  if (v >= 100) return '#f0abfc'
  if (v >= 20)  return '#4ade80'
  if (v >= 10)  return '#86efac'
  if (v >= 5)   return '#facc15'
  return '#fb923c'
}

export default function Ticker() {
  const thesisDoubled = [...THESIS, ...THESIS]
  const chipsDoubled  = [...CHIPS,  ...CHIPS]

  return (
    <div className="fixed top-[62px] left-0 right-0 z-40">
      {/* Top band — thesis points */}
      <div className="overflow-hidden border-y border-orange-500/[0.15] py-[5px] bg-[#030b1a]/95 backdrop-blur-md">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#030b1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#030b1a] to-transparent z-10 pointer-events-none" />
        <div className="ticker-top flex w-max">
          {thesisDoubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-6 text-[10.5px] text-orange-200/70 whitespace-nowrap border-r border-orange-500/[0.14]"
            >
              <span className="text-[13px]">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom band — company chips */}
      <div className="overflow-hidden border-b border-white/[0.05] py-[5px] bg-[#020810]/95 backdrop-blur-md">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#020810] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#020810] to-transparent z-10 pointer-events-none" />
        <div className="ticker-bottom flex gap-[6px] w-max px-2">
          {chipsDoubled.map(([name, color, multiple], i) => (
            <span
              key={i}
              className="inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-full whitespace-nowrap flex-shrink-0"
              style={{
                background: `${color}12`,
                border: `0.5px solid ${color}30`,
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: color }}
              />
              <span className="text-[10px] font-semibold text-white/80">{name}</span>
              <span
                className="text-[10px] font-bold"
                style={{ color: mColor(multiple) }}
              >
                {multiple}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
