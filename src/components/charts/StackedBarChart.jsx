// Three-series stacked bar chart with a small color-coded legend and value markers.
// data = [{ label: 'Mon', values: [a, b, c] }], colors/legend length 3
export default function StackedBarChart({ data, colors, legend, markers }) {
  const max = Math.max(...data.map((d) => d.values.reduce((s, v) => s + v, 0)))
  const height = 140

  return (
    <div>
      {markers && (
        <div className="mb-2 flex gap-4 text-xs text-slate-400">
          {markers.map((m, i) => <span key={i}><span style={{ color: colors[i] }}>●</span> {m}</span>)}
        </div>
      )}
      <svg viewBox={`0 0 ${data.length * 50} ${height + 20}`} className="w-full">
        {data.map((d, i) => {
          let yOffset = height
          return (
            <g key={d.label} transform={`translate(${i * 50 + 12}, 0)`}>
              {d.values.map((v, si) => {
                const h = (v / max) * height
                yOffset -= h
                return <rect key={si} y={yOffset} width="24" height={h} rx="3" fill={colors[si]} />
              })}
              <text x="12" y={height + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.label}</text>
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex justify-center gap-5 text-xs text-slate-400">
        {legend.map((l, i) => <span key={l}><span style={{ color: colors[i] }}>●</span> {l}</span>)}
      </div>
    </div>
  )
}
