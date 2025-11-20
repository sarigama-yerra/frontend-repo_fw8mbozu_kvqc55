import React from 'react'

export default function Input({ label, suffix, value, onChange, step = 'any', min, max, helper }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm text-blue-200/85">{label}</div>
        {helper && <div className="text-[11px] text-blue-200/60">{helper}</div>}
      </div>
      <div className="flex items-center gap-2 bg-slate-900/60 border border-blue-500/20 rounded-lg px-3 py-2 focus-within:border-blue-400/40 focus-within:ring-1 focus-within:ring-blue-400/30 transition-colors">
        {suffix && suffix.startsWith('$') && <span className="text-blue-200/70 text-sm">{suffix}</span>}
        <input
          type="number"
          className="w-full bg-transparent outline-none text-white placeholder:text-blue-200/50"
          value={value}
          onChange={e => onChange?.(parseFloat(e.target.value) || 0)}
          step={step}
          min={min}
          max={max}
        />
        {suffix && !suffix.startsWith('$') && <span className="text-blue-200/70 text-sm">{suffix}</span>}
      </div>
    </label>
  )
}
