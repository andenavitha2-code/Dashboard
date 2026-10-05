export default function StatCard({ label, value, change, icon }) {
  const up = change.startsWith('↑')
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-5 dark:bg-slate-900">
      <div>
        <p className="mb-1 text-xs text-slate-400">{label}</p>
        <p className="text-2xl font-medium">{value} <span className={`text-xs ${up ? 'text-green-500' : 'text-red-500'}`}>{change}</span></p>
      </div>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-lg text-brand dark:bg-slate-800">{icon}</span>
    </div>
  )
}
