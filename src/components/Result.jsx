import React from 'react'

export default function Result({ label, value, accent = false }) {
  return (
    <div className={`flex items-center justify-between text-sm rounded-lg px-3 py-2 border ${accent ? 'bg-blue-600/15 border-blue-400/30' : 'bg-slate-900/50 border-blue-500/20'}`}>
      <span className="text-blue-200/85">{label}</span>
      <span className={`font-medium ${accent ? 'text-white' : 'text-white'}`}>{value}</span>
    </div>
  )
}
