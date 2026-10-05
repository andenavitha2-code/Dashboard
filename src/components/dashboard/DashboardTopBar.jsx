import { useState } from 'react'

const periods = ['Last 7 days', 'Last 30 days', 'This month', 'This year']

function downloadReport(title) {
  const csv = `Report,${title}\nGenerated,${new Date().toLocaleString()}\n`
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-report.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function DownloadButton({ title }) {
  return <button onClick={() => downloadReport(title)} title="Download report" className="rounded-lg bg-white px-3 py-2 text-sm dark:bg-slate-900">⭳</button>
}

export function PeriodSelect() {
  const [period, setPeriod] = useState(periods[0])
  return (
    <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-lg bg-white px-3 py-2 text-sm outline-none dark:bg-slate-900">
      {periods.map((p) => <option key={p}>{p}</option>)}
    </select>
  )
}

// Standard "Overview" header used across the dashboard variants.
// Pass `right` to replace the download+period controls (e.g. an "Add Task" button on the Tasks page).
export default function DashboardTopBar({ title = 'Overview', right }) {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-normal sm:text-3xl">{title}</h1>
      <div className="flex items-center gap-3">
        {right || (<><DownloadButton title={title} /><PeriodSelect /></>)}
      </div>
    </div>
  )
}
