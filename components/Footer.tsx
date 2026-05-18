export default function Footer() {
  return (
    <footer className="bg-[#030810]">
      {/* Gold top border */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #A67C00 0%, #FFD700 25%, #FFFAAA 50%, #FFD700 75%, #A67C00 100%)',
        boxShadow: '0 0 14px 4px rgba(255,215,0,0.5)',
      }} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-[10px] leading-relaxed text-slate-600 max-w-4xl">
          THIS INFORMATION FOUND ON THIS WEBSITE DOES NOT CONSTITUTE AN OFFER TO SELL SECURITIES. AN OFFER TO SELL SECURITIES MAY BE MADE ONLY BY DISTRIBUTION OF A PRIVATE PLACEMENT MEMORANDUM, PRIVATE PLACEMENT MEMORANDUM SUPPLEMENT AND RELATED DOCUMENTS (TOGETHER, THE &ldquo;MEMORANDUM&rdquo;), WHICH WILL BE MADE AVAILABLE IN THE FUTURE TO PERSONS INTERESTED CONSIDERING AN INVESTMENT IN A FUND OFFERED BY VESTRS LLC. THE MEMORANDUM FOR A FUND WILL CONTAIN THE TERMS OF THE OFFERING OF SECURITIES AND THE RISKS OF INVESTING IN THE SECURITIES. THE INFORMATION FOUND ON THIS WEBSITE IS QUALIFIED IN ITS ENTIRETY BY THE MEMORANDUM. ALL POTENTIAL INVESTORS MUST READ THE MEMORANDUM, AND NO PERSON MAY INVEST WITHOUT ACKNOWLEDGING RECEIPT AND COMPLETE REVIEW OF THE MEMORANDUM.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col">
          <span style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '0.35em',
            color: '#FFFFFF',
          }}>
            VESTRS
          </span>
          <span className="text-slate-600 font-normal text-sm mt-1">
            Built for global investors. Rooted in India.
          </span>
        </div>
      </div>
    </footer>
  )
}
