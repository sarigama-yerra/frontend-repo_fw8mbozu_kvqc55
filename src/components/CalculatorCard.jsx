import React from 'react'

export default function CalculatorCard({ id, title, description, icon, children }) {
  return (
    <section id={id} className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative rounded-2xl p-5 bg-slate-800/60 border border-blue-500/20 backdrop-blur-sm shadow-sm hover:shadow-blue-900/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-start gap-3 mb-2">
          {icon && (
            <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-600/20 text-blue-300 grid place-items-center border border-blue-500/30">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-white font-semibold leading-tight">{title}</h3>
            {description && <p className="text-sm text-blue-200/80 mt-0.5">{description}</p>}
          </div>
        </div>
        <div className="space-y-3">
          {children}
        </div>
      </div>
    </section>
  )
}
