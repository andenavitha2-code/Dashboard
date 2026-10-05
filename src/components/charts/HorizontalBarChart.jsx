// Horizontal stacked bars. data = [{ label: '25', a: 300, b: 120 }]
export default function HorizontalBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.a + d.b))
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-4">{d.label}</span>
          <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="bg-[#0f5132]" style={{ width: `${(d.a / max) * 100}%` }} />
            <div className="bg-[#20c997]" style={{ width: `${(d.b / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
