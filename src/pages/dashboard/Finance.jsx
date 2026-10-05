import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AreaChart from '../../components/charts/AreaChart.jsx'
import BarChart from '../../components/charts/BarChart.jsx'
import VariantNav from '../../components/dashboard/VariantNav.jsx'
import DashboardTopBar from '../../components/dashboard/DashboardTopBar.jsx'
import MoreMenu from '../../components/ui/MoreMenu.jsx'
import * as d from '../../data/dashboard.js'

const card = 'rounded-lg bg-white p-5 dark:bg-slate-900'
const cardNumbers = ['5880 **** **** 8854', '4417 **** **** 2039']

export default function Finance() {
  const navigate = useNavigate()
  const [debtPaid, setDebtPaid] = useState(false)
  const [activeNumber, setActiveNumber] = useState(0)
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <div>
      <DashboardTopBar />
      <VariantNav />

      <div className="mb-5 grid gap-5 lg:grid-cols-[1fr_1fr_1fr_1.4fr]">
        {d.financeStats.map((s) => (
          <div key={s.label} className={card}>
            <p className="text-xs text-slate-400">{s.label}</p>
            <p className="text-xl font-medium">{s.value} <span className={s.change.startsWith('↑') ? 'text-xs text-green-500' : 'text-xs text-red-500'}>{s.change}</span></p>
          </div>
        ))}
        <div className="row-span-2 rounded-lg bg-gradient-to-br from-brand to-emerald-500 p-5 text-white lg:col-start-4 lg:row-start-1">
          <div className="mb-6 flex items-center justify-between"><h3>Balance</h3><MoreMenu title="Balance" className="" /></div>
          <p className="mb-4 text-3xl font-medium">$27,500.00</p>
          <span className="rounded bg-white/20 px-3 py-1 text-xs">Income</span>
          <div className="my-3 opacity-90"><AreaChart data={d.analyticsLine} color="#ffffff" height={70} /></div>
          <div className="flex justify-between text-xs"><span>Income: $500</span><span>Spending: $200</span></div>
        </div>
        <div className={card + ' lg:col-span-3'}><h3 className="mb-4 font-medium">Statistics</h3><BarChart data={d.financeBars} /></div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr_1fr]">
        <div className={card}>
          <h3 className="mb-4 font-medium">My Cards</h3>
          <div className="rounded-xl bg-gradient-to-br from-brand to-emerald-400 p-4 text-white">
            <div className="mb-6 flex justify-between text-xs"><span>Current Balance</span><span>VISA</span></div>
            <p className="mb-6 text-xl font-medium">80,700.00</p>
            <div className="flex justify-between text-xs"><span>Felecia Brown</span><span>•••• •••• •••• 8854</span></div>
          </div>
          <button onClick={() => navigate('/dashboard/wallet')} className="mt-3 text-sm text-brand">+ Add Card</button>
        </div>

        <div className={card}>
          <div className="relative mb-3">
            <button onClick={() => setPickerOpen(!pickerOpen)} className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-3 w-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
              {cardNumbers[activeNumber]}
              <span className="text-slate-400">▾</span>
            </button>
            {pickerOpen && (
              <div className="absolute z-10 mt-1 w-48 rounded-lg bg-white p-1 text-xs shadow-lg dark:bg-slate-800">
                {cardNumbers.map((n, i) => (
                  <button key={n} onClick={() => { setActiveNumber(i); setPickerOpen(false) }} className="block w-full rounded px-2 py-1.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700">{n}</button>
                ))}
              </div>
            )}
          </div>
          <p className="mb-1 text-xs"><span className="text-slate-400">Card Type:</span> Visa</p>
          <p className="mb-1 text-xs"><span className="text-slate-400">Card Holder:</span> Felecia Brown</p>
          <p className="mb-1 text-xs"><span className="text-slate-400">Expires:</span> 12/19</p>
          <p className="mb-1 text-xs"><span className="text-slate-400">Card Number:</span> 5880 5087 3288 8854</p>
          <p className="mb-1 text-xs"><span className="text-slate-400">Total Balance:</span> 80,700.00</p>
          <p className="mb-3 text-xs"><span className="text-slate-400">Total Debt:</span> {debtPaid ? '0.00' : '8,250.00'}</p>
          <div className="flex gap-3">
            <button onClick={() => setDebtPaid(true)} disabled={debtPaid} className="rounded-lg bg-brand px-4 py-1.5 text-xs text-white disabled:opacity-50">{debtPaid ? 'Paid' : 'Pay Debt'}</button>
            <button onClick={() => setDebtPaid(false)} className="text-xs text-slate-400">Cancel</button>
          </div>
        </div>

        <div className={card}>
          <div className="mb-3 flex items-center justify-between"><h3 className="font-medium">Transactions</h3><MoreMenu title="Transactions" /></div>
          {d.payments.map((p) => (
            <div key={p.name} className="mb-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-base dark:bg-slate-800">{p.icon}</span>
              <div className="flex-1 text-sm">{p.name}<br /><span className="text-[11px] text-slate-400">{p.time}</span></div>
              <span className={`text-sm ${p.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{p.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
