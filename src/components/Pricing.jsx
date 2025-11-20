import React from 'react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Great for quick calculations',
    features: [
      'All calculators',
      'Basic export (copy)',
      '1 custom scenario',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: '$5/mo',
    desc: 'Unlock power tools',
    features: [
      'Save scenarios to cloud',
      'CSV export',
      'Unlimited scenarios',
      'Priority support',
    ],
    highlight: true,
    cta: 'Go Pro',
  },
  {
    name: 'Team',
    price: '$15/mo',
    desc: 'For households and teams',
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Role permissions',
      'Email summaries',
    ],
    cta: 'Start Team',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Simple pricing</h2>
          <p className="text-blue-200/80 mt-2">Choose the plan that fits your needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map(t => (
            <div key={t.name} className={`rounded-2xl p-6 border ${t.highlight ? 'border-blue-400/60 bg-slate-800/60 shadow-lg shadow-blue-500/20' : 'border-blue-500/20 bg-slate-800/40'}`}>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">{t.name}</h3>
                <span className="text-blue-200/80">{t.price}</span>
              </div>
              <p className="text-blue-200/80 text-sm mb-4">{t.desc}</p>
              <ul className="space-y-2 mb-6">
                {t.features.map(f => (
                  <li key={f} className="text-sm text-blue-100/90 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg text-sm font-medium ${t.highlight ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-900/60 hover:bg-slate-900 text-white border border-blue-500/20'} transition-colors`}>
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
