export default function Footer() {
  return (
    <footer className="bg-[#030810] py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-base font-bold">
          <span className="text-white">Vestrs</span>
          <span className="text-gradient-teal">.</span>
          <span className="text-slate-600 font-normal text-sm ml-3">
            Built for global investors. Rooted in India.
          </span>
        </div>

        <div className="flex items-center gap-6 text-slate-600 text-sm">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          <span>© 2025 Vestrs.</span>
        </div>
      </div>
    </footer>
  )
}
