import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-blue-500/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 grid place-items-center shadow-lg shadow-blue-500/20 ring-1 ring-inset ring-white/10">
            <span className="text-white font-bold">£</span>
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight group-hover:text-blue-100 transition-colors">Finance Suite</h1>
            <p className="text-xs text-blue-200/70">Smart calculators for everyday money</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-4 text-sm text-blue-100/80">
          <a href="#calculators" className="hover:text-white transition-colors">Calculators</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <a href="#pricing" className="text-sm text-white bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg shadow shadow-blue-600/30">Get Pro</a>
      </div>
    </header>
  )
}
