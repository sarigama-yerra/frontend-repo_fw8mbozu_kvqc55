import React, { useMemo, useState } from 'react'
import Header from './components/Header'
import CalculatorCard from './components/CalculatorCard'
import Input from './components/Input'
import Result from './components/Result'
import Pricing from './components/Pricing'

function formatCurrency(n) {
  if (!isFinite(n)) return '-'
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

function clampNumber(n, min = -1e12, max = 1e12) {
  return Math.min(Math.max(n ?? 0, min), max)
}

export default function App() {
  const monthlyRate = (apr) => apr / 100 / 12

  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />

      <main className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_0%_0%,rgba(59,130,246,0.16),transparent_40%),radial-gradient(600px_circle_at_100%_0%,rgba(14,165,233,0.12),transparent_40%)] pointer-events-none" />

        <section id="hero" className="mx-auto max-w-7xl px-6 pt-10 pb-6">
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">All-in-one finance calculators</h2>
            <p className="text-blue-200/80 mt-3 max-w-2xl">Plan loans, savings, retirement, and more with instant results and friendly defaults. Built for speed, clarity, and confidence.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm shadow shadow-blue-600/30">Get Pro</a>
              <a href="#calculators" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white text-sm border border-blue-500/20">Explore calculators</a>
            </div>
          </div>

          <div id="calculators" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoanPaymentCalc />
            <SavingsGrowthCalc />
            <CompoundInterestCalc />
            <MortgageAffordabilityCalc />
            <RetirementCalc />
            <DebtPayoffCalc />
            <RoiCalc />
            <BreakEvenCalc />
            <EmergencyFundCalc />
            <InflationAdjusterCalc />
          </div>
        </section>

        <Pricing />

        <section id="faq" className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h3 className="text-2xl font-bold mb-6">Frequently asked questions</h3>
            <div className="grid md:grid-cols-2 gap-6 text-blue-100/90 text-sm">
              <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
                <p className="font-semibold text-white mb-1">Are the calculations accurate?</p>
                <p>Yes. We use standard financial formulas with sensible bounds to handle edge cases like 0% rates.</p>
              </div>
              <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
                <p className="font-semibold text-white mb-1">Do I need an account?</p>
                <p>No. Everything works out of the box. Pro adds cloud saves and exports.</p>
              </div>
              <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
                <p className="font-semibold text-white mb-1">Will you add charts?</p>
                <p>Yes—if you want visual breakdowns, we can add charts per calculator.</p>
              </div>
              <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
                <p className="font-semibold text-white mb-1">Is my data saved?</p>
                <p>All inputs stay in your browser unless you choose to save with Pro.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10">
          <div className="mx-auto max-w-7xl px-6 text-center text-blue-200/70 text-sm">
            Built for smarter money decisions.
          </div>
        </footer>
      </main>
    </div>
  )
}

function LoanPaymentCalc() {
  const [principal, setPrincipal] = useState(25000)
  const [apr, setApr] = useState(6.9)
  const [years, setYears] = useState(5)

  const { payment, totalInterest, totalCost } = useMemo(() => {
    const r = apr / 100 / 12
    const n = years * 12
    if (r === 0) {
      const pmt = principal / n
      return { payment: pmt, totalInterest: 0, totalCost: principal }
    }
    const pmt = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const cost = pmt * n
    return { payment: pmt, totalInterest: cost - principal, totalCost: cost }
  }, [principal, apr, years])

  return (
    <CalculatorCard id="loan" title="Loan payment" description="Monthly payment and totals for any installment loan">
      <Input label="Loan amount" suffix="$" value={principal} onChange={(v)=>setPrincipal(clampNumber(v,0))} />
      <Input label="APR" suffix="%" value={apr} onChange={(v)=>setApr(clampNumber(v,0,100))} />
      <Input label="Term" suffix="years" value={years} onChange={(v)=>setYears(clampNumber(v,1,40))} />
      <Result label="Monthly payment" value={formatCurrency(payment)} accent />
      <Result label="Total interest" value={formatCurrency(totalInterest)} />
      <Result label="Total cost" value={formatCurrency(totalCost)} />
    </CalculatorCard>
  )
}

function SavingsGrowthCalc() {
  const [initial, setInitial] = useState(2000)
  const [monthly, setMonthly] = useState(200)
  const [rate, setRate] = useState(5)
  const [years, setYears] = useState(10)

  const { future, contributions, interest } = useMemo(() => {
    const r = rate / 100 / 12
    const n = years * 12
    const fvLump = initial * Math.pow(1 + r, n)
    const fvAnnuity = monthly * ((Math.pow(1 + r, n) - 1) / r)
    const futureVal = isFinite(r) && r !== 0 ? fvLump + fvAnnuity : initial + monthly * n
    const contrib = initial + monthly * n
    return { future: futureVal, contributions: contrib, interest: futureVal - contrib }
  }, [initial, monthly, rate, years])

  return (
    <CalculatorCard id="savings" title="Savings growth" description="Project savings with monthly contributions">
      <Input label="Starting balance" suffix="$" value={initial} onChange={(v)=>setInitial(clampNumber(v,0))} />
      <Input label="Monthly contribution" suffix="$" value={monthly} onChange={(v)=>setMonthly(clampNumber(v,0))} />
      <Input label="Interest rate" suffix="% APR" value={rate} onChange={(v)=>setRate(clampNumber(v,0,50))} />
      <Input label="Duration" suffix="years" value={years} onChange={(v)=>setYears(clampNumber(v,1,60))} />
      <Result label="Future value" value={formatCurrency(future)} accent />
      <Result label="Total contributions" value={formatCurrency(contributions)} />
      <Result label="Total interest" value={formatCurrency(interest)} />
    </CalculatorCard>
  )
}

function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(5000)
  const [rate, setRate] = useState(7)
  const [times, setTimes] = useState(12)
  const [years, setYears] = useState(8)

  const { amount, interest } = useMemo(() => {
    const r = rate / 100
    const n = times
    const t = years
    const A = principal * Math.pow(1 + r / n, n * t)
    return { amount: A, interest: A - principal }
  }, [principal, rate, times, years])

  return (
    <CalculatorCard id="compound" title="Compound interest" description="Growth without additional contributions">
      <Input label="Principal" suffix="$" value={principal} onChange={(v)=>setPrincipal(clampNumber(v,0))} />
      <Input label="Annual rate" suffix="%" value={rate} onChange={(v)=>setRate(clampNumber(v,0,100))} />
      <Input label="Compounds per year" value={times} onChange={(v)=>setTimes(clampNumber(v,1,365))} />
      <Input label="Years" value={years} onChange={(v)=>setYears(clampNumber(v,1,100))} />
      <Result label="Final amount" value={formatCurrency(amount)} accent />
      <Result label="Total interest" value={formatCurrency(interest)} />
    </CalculatorCard>
  )
}

function MortgageAffordabilityCalc() {
  const [income, setIncome] = useState(8000)
  const [debts, setDebts] = useState(500)
  const [apr, setApr] = useState(6.5)
  const [years, setYears] = useState(30)
  const { maxPayment, maxLoan } = useMemo(() => {
    const housingCap = income * 0.28
    const totalCap = income * 0.36 - debts
    const payment = Math.max(0, Math.min(housingCap, totalCap))
    const r = apr / 100 / 12
    const n = years * 12
    if (r === 0) return { maxPayment: payment, maxLoan: payment * n }
    const principal = payment * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
    return { maxPayment: payment, maxLoan: principal }
  }, [income, debts, apr, years])

  return (
    <CalculatorCard id="mortgage" title="Mortgage affordability" description="Estimate the maximum loan based on income and debts">
      <Input label="Monthly gross income" suffix="$" value={income} onChange={(v)=>setIncome(clampNumber(v,0))} />
      <Input label="Other monthly debts" suffix="$" value={debts} onChange={(v)=>setDebts(clampNumber(v,0))} />
      <Input label="Mortgage APR" suffix="%" value={apr} onChange={(v)=>setApr(clampNumber(v,0,30))} />
      <Input label="Term" suffix="years" value={years} onChange={(v)=>setYears(clampNumber(v,1,40))} />
      <Result label="Max monthly payment" value={formatCurrency(maxPayment)} />
      <Result label="Estimated max loan" value={formatCurrency(maxLoan)} accent />
    </CalculatorCard>
  )
}

function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(20000)
  const [monthly, setMonthly] = useState(600)
  const [returnRate, setReturnRate] = useState(7)
  const [inflation, setInflation] = useState(2.5)

  const { future, realFuture } = useMemo(() => {
    const years = Math.max(0, retireAge - currentAge)
    const r = returnRate / 100 / 12
    const n = years * 12
    const fvLump = currentSavings * Math.pow(1 + r, n)
    const fvAnnuity = r !== 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n
    const nominal = fvLump + fvAnnuity
    const realAdj = Math.pow(1 + inflation / 100, years)
    const real = nominal / realAdj
    return { future: nominal, realFuture: real }
  }, [currentAge, retireAge, currentSavings, monthly, returnRate, inflation])

  return (
    <CalculatorCard id="retirement" title="Retirement" description="Project your nest egg at retirement">
      <Input label="Current age" value={currentAge} onChange={(v)=>setCurrentAge(clampNumber(v,18,70))} />
      <Input label="Retire age" value={retireAge} onChange={(v)=>setRetireAge(clampNumber(v,30,80))} />
      <Input label="Current savings" suffix="$" value={currentSavings} onChange={(v)=>setCurrentSavings(clampNumber(v,0))} />
      <Input label="Monthly contribution" suffix="$" value={monthly} onChange={(v)=>setMonthly(clampNumber(v,0))} />
      <Input label="Return" suffix="%/yr" value={returnRate} onChange={(v)=>setReturnRate(clampNumber(v,0,20))} />
      <Input label="Inflation" suffix="%/yr" value={inflation} onChange={(v)=>setInflation(clampNumber(v,0,10))} />
      <Result label="Projected (nominal)" value={formatCurrency(future)} />
      <Result label="Projected (today's $)" value={formatCurrency(realFuture)} accent />
    </CalculatorCard>
  )
}

function DebtPayoffCalc() {
  const [balance, setBalance] = useState(10000)
  const [apr, setApr] = useState(19.99)
  const [payment, setPayment] = useState(300)

  const { months, interest } = useMemo(() => {
    const r = apr / 100 / 12
    let b = balance
    let m = 0
    let intPaid = 0
    let safety = 2000
    while (b > 0 && m < safety) {
      const interestMonth = b * r
      intPaid += interestMonth
      b = b + interestMonth - payment
      if (b > 0 && b < payment) {
        m += 1
        intPaid += b * r
        b = 0
        break
      }
      m += 1
      if (payment <= interestMonth) {
        m = Infinity
        break
      }
    }
    return { months: isFinite(m) ? m : NaN, interest: isFinite(intPaid) ? intPaid : NaN }
  }, [balance, apr, payment])

  return (
    <CalculatorCard id="debt" title="Debt payoff" description="Estimate months to zero with a fixed payment">
      <Input label="Balance" suffix="$" value={balance} onChange={(v)=>setBalance(clampNumber(v,0))} />
      <Input label="APR" suffix="%" value={apr} onChange={(v)=>setApr(clampNumber(v,0,100))} />
      <Input label="Monthly payment" suffix="$" value={payment} onChange={(v)=>setPayment(clampNumber(v,0))} />
      <Result label="Months to payoff" value={Number.isNaN(months) ? '—' : `${months}`} />
      <Result label="Total interest" value={Number.isNaN(interest) ? '—' : formatCurrency(interest)} accent />
    </CalculatorCard>
  )
}

function RoiCalc() {
  const [cost, setCost] = useState(10000)
  const [gain, setGain] = useState(12000)

  const roi = useMemo(() => {
    const profit = gain - cost
    const pct = cost !== 0 ? (profit / cost) * 100 : 0
    return { profit, pct }
  }, [cost, gain])

  return (
    <CalculatorCard id="roi" title="ROI" description="Return on investment and profit">
      <Input label="Cost" suffix="$" value={cost} onChange={(v)=>setCost(clampNumber(v,-1e9,1e9))} />
      <Input label="Final value" suffix="$" value={gain} onChange={(v)=>setGain(clampNumber(v,-1e9,1e9))} />
      <Result label="Profit" value={formatCurrency(roi.profit)} />
      <Result label="ROI" value={`${roi.pct.toFixed(2)}%`} accent />
    </CalculatorCard>
  )
}

function BreakEvenCalc() {
  const [fixed, setFixed] = useState(5000)
  const [price, setPrice] = useState(50)
  const [variable, setVariable] = useState(20)

  const { units, revenue } = useMemo(() => {
    const margin = price - variable
    const u = margin > 0 ? Math.ceil(fixed / margin) : NaN
    return { units: u, revenue: isFinite(u) ? u * price : NaN }
  }, [fixed, price, variable])

  return (
    <CalculatorCard id="breakeven" title="Break-even" description="Units and revenue to cover fixed costs">
      <Input label="Fixed costs" suffix="$" value={fixed} onChange={(v)=>setFixed(clampNumber(v,0))} />
      <Input label="Price per unit" suffix="$" value={price} onChange={(v)=>setPrice(clampNumber(v,0))} />
      <Input label="Variable cost per unit" suffix="$" value={variable} onChange={(v)=>setVariable(clampNumber(v,0))} />
      <Result label="Break-even units" value={Number.isNaN(units) ? '—' : `${units}`} />
      <Result label="Break-even revenue" value={Number.isNaN(revenue) ? '—' : formatCurrency(revenue)} accent />
    </CalculatorCard>
  )
}

function EmergencyFundCalc() {
  const [monthly, setMonthly] = useState(2500)
  const [months, setMonths] = useState(6)

  const target = useMemo(() => monthly * months, [monthly, months])

  return (
    <CalculatorCard id="emergency" title="Emergency fund" description="How much cash to keep for safety">
      <Input label="Monthly expenses" suffix="$" value={monthly} onChange={(v)=>setMonthly(clampNumber(v,0))} />
      <Input label="Months of coverage" value={months} onChange={(v)=>setMonths(clampNumber(v,1,24))} />
      <Result label="Target fund" value={formatCurrency(target)} accent />
    </CalculatorCard>
  )
}

function InflationAdjusterCalc() {
  const [amount, setAmount] = useState(10000)
  const [inflation, setInflation] = useState(3)
  const [years, setYears] = useState(10)

  const { future, present } = useMemo(() => {
    const f = amount * Math.pow(1 + inflation / 100, years)
    const p = amount / Math.pow(1 + inflation / 100, years)
    return { future: f, present: p }
  }, [amount, inflation, years])

  return (
    <CalculatorCard id="inflation" title="Inflation adjuster" description="Convert between today's and future dollars">
      <Input label="Amount (today's $)" suffix="$" value={amount} onChange={(v)=>setAmount(clampNumber(v,0))} />
      <Input label="Inflation" suffix="%/yr" value={inflation} onChange={(v)=>setInflation(clampNumber(v,0,15))} />
      <Input label="Years" value={years} onChange={(v)=>setYears(clampNumber(v,0,60))} />
      <Result label="Future value" value={formatCurrency(future)} />
      <Result label={`Present value of ${formatCurrency(amount)} in ${years}y`} value={formatCurrency(present)} accent />
    </CalculatorCard>
  )
}
