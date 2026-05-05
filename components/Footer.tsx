export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-base font-bold">
          <span className="text-white">Vestrs</span>
          <span className="text-gradient-teal">.</span>
          <span className="text-white/30 font-normal text-sm ml-3">
            Built for global investors. Rooted in India.
          </span>
        </div>

        <div className="flex items-center gap-6 text-white/30 text-sm">
          <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          <span>© 2025 Vestrs.</span>
        </div>
      </div>
    </footer>
  )
}
