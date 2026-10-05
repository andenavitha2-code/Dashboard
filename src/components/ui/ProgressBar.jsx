export default function ProgressBar({ value }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
      <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${value}%` }} />
    </div>
  )
}
