import BarChart from '../../components/charts/BarChart.jsx'
import AreaChart from '../../components/charts/AreaChart.jsx'
import DonutChart from '../../components/charts/DonutChart.jsx'
import HorizontalBarChart from '../../components/charts/HorizontalBarChart.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import VariantNav from '../../components/dashboard/VariantNav.jsx'
import DashboardTopBar from '../../components/dashboard/DashboardTopBar.jsx'
import { Avatar } from '../../components/ui/Avatar.jsx'
import * as d from '../../data/dashboard.js'

const card = 'rounded-lg bg-white p-5 dark:bg-slate-900'

export default function Sales() {
  return (
    <div>
      <DashboardTopBar />
      <VariantNav />

      <div className="mb-5 grid gap-5 sm:grid-cols-3">
        {d.salesStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        <div className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Statistics</h3>
            <span className="flex gap-3 text-xs text-slate-400"><span>● 2.500</span><span>● 1.200</span></span>
          </div>
          <BarChart data={d.weekBars} />
          <div className="mt-2 flex justify-center gap-5 text-xs text-slate-400"><span>● Income</span><span>● Expense</span></div>
        </div>
        <div className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Analytics</h3>
            <span className="flex gap-4 text-xs"><span className="text-green-500">↑ $5.850</span><span className="text-red-400">↓ $1.750</span></span>
          </div>
          <AreaChart data={d.analyticsLine} />
        </div>
      </div>
      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        <div className={card}>
          <h3 className="mb-4 font-medium">Sales</h3>
          <DonutChart percent={70} value="3.500" label="Total" />
          <div className="mt-4 flex justify-around text-xs">
            <p>● Current Week<br /><b className="text-sm font-medium">2.500</b> <span className="text-green-500">↑8.8%</span></p>
            <p>● Last Week<br /><b className="text-sm font-medium">1.000</b> <span className="text-red-500">↓5.8%</span></p>
          </div>
        </div>
        <div className={card}>
          <h3 className="mb-4 font-medium">Statistics</h3>
          <HorizontalBarChart data={d.horizontalBars} />
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className={card + ' overflow-x-auto lg:col-span-2'}>
          <h3 className="mb-4 font-medium">Last Orders</h3>
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400"><tr><th className="pb-2">Customer Name</th><th>Order No.</th><th>Amount</th><th>Payment Type</th><th>Date</th></tr></thead>
            <tbody>
              {d.lastOrders.map((o) => (
                <tr key={o.order} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-3"><div className="flex items-center gap-2"><Avatar name={o.name} />{o.name}</div></td>
                  <td>{o.order}</td><td className="font-medium">{o.amount}</td><td>{o.payment}</td><td>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={card}>
          <h3 className="mb-4 font-medium">Transactions</h3>
          {d.dashTransactions.map((t) => (
            <div key={t.name} className="mb-3 flex items-center gap-3">
              <Avatar name={t.name} size="h-9 w-9" />
              <div className="flex-1 text-sm">{t.name}<br /><span className="text-[11px] text-slate-400">{t.time}</span></div>
              <span className={`text-sm ${t.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
