import React from 'react'

export default function Result({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm bg-slate-900/50 border border-blue-500/20 rounded-lg px-3 py-2">
      <span className="text-blue-200/80">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}
