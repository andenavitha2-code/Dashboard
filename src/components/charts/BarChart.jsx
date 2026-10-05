// Simple stacked bar chart drawn with SVG. data = [{ label: 'Mon', a: 20, b: 10 }]
export default function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.a + d.b))
  const height = 140

  return (
    <svg viewBox={`0 0 ${data.length * 50} ${height + 20}`} className="w-full">
      {data.map((d, i) => {
        const aHeight = (d.a / max) * height
        const bHeight = (d.b / max) * height
        return (
          <g key={d.label} transform={`translate(${i * 50 + 12}, 0)`}>
            <rect y={height - aHeight} width="24" height={aHeight} rx="3" fill="#0f5132" />
            <rect y={height - aHeight - bHeight} width="24" height={bHeight} rx="3" fill="#20c997" />
            <text x="12" y={height + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}
