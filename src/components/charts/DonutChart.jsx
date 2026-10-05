// Donut chart drawn with SVG. percent = 0 - 100
export default function DonutChart({ percent, value, label }) {
  const radius = 52
  const length = 2 * Math.PI * radius

  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#22943c" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={length} strokeDashoffset={length - (length * percent) / 100} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <b className="text-2xl font-medium">{value}</b><span className="text-xs text-slate-400">{label}</span>
      </div>
    </div>
  )
}
