// Donut chart with several colored segments. segments = [{ value, color }], sums to <= 100
export default function MultiDonutChart({ segments, value, label }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        {segments.map((s, i) => {
          const dash = (circumference * s.value) / 100
          const el = <circle key={i} cx="60" cy="60" r={radius} fill="none" stroke={s.color} strokeWidth="10"
            strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} strokeLinecap="round" />
          offset += dash
          return el
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <b className="text-2xl font-medium">{value}</b><span className="text-xs text-slate-400">{label}</span>
      </div>
    </div>
  )
}
