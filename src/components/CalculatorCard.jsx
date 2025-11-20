import React from 'react'

export default function CalculatorCard({ title, description, children }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-5 hover:border-blue-400/40 transition-colors">
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-sm text-blue-200/80 mb-4">{description}</p>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}
