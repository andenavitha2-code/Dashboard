import StackedBarChart from '../../components/charts/StackedBarChart.jsx'
import AreaChart from '../../components/charts/AreaChart.jsx'
import MultiDonutChart from '../../components/charts/MultiDonutChart.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import VariantNav from '../../components/dashboard/VariantNav.jsx'
import DashboardTopBar from '../../components/dashboard/DashboardTopBar.jsx'
import MoreMenu from '../../components/ui/MoreMenu.jsx'
import * as d from '../../data/dashboard.js'

const card = 'rounded-lg bg-white p-5 dark:bg-slate-900'

export default function Traffic() {
  return (
    <div>
      <DashboardTopBar />
      <VariantNav />

      <div className="mb-5 grid gap-5 sm:grid-cols-3">{d.trafficStats.map((s) => <StatCard key={s.label} {...s} />)}</div>

      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        <div className={card}>
          <h3 className="mb-1 font-medium">Statistics</h3>
          <StackedBarChart data={d.trafficBars} colors={['#0f5132', '#20c997', '#fde68a']} legend={['Sales', 'Expenses', 'Profit']} markers={['15.650', '2.550', '2.400']} />
        </div>
        <div className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-medium">Analytics</h3>
            <span className="flex gap-4 text-xs"><span className="text-green-500">↑ $5.850</span><span className="text-red-400">↓ $1.750</span></span>
          </div>
          <AreaChart data={d.analyticsLine} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {d.trafficSources.map((t) => (
          <div key={t.name} className={card}>
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base dark:bg-slate-800">{t.icon}</span>
              <MoreMenu title={t.name} />
            </div>
            <p className="text-xs text-slate-400">{t.name}</p>
            <p className="mb-3 font-medium">{t.value}</p>
            <p className="text-2xl font-medium">{t.sessions}<span className="text-xs text-slate-400">/Sessions</span></p>
          </div>
        ))}
        <div className={card + ' sm:col-span-2 lg:col-span-4'}>
          <div className="mb-3 flex items-center justify-between"><h3 className="font-medium">Online Users</h3><MoreMenu title="Online Users" /></div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <MultiDonutChart segments={d.onlineSegments} value="1.883" label="Online" />
            <div className="flex gap-8 text-xs">
              {d.onlineSegments.map((s) => (
                <div key={s.name} className="text-center">
                  <p><span style={{ color: s.color }}>●</span> {s.name} {s.value}%</p>
                  <p className="mt-1 text-lg font-medium" style={{ color: s.color }}>{s.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
