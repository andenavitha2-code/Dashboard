// Line chart with a soft fill underneath, drawn with SVG. data = [{ label:'Mon', value: 20 }]
export default function AreaChart({ data, color = '#0f5132', height = 140 }) {
  const max = Math.max(...data.map((d) => d.value))
  const stepX = 480 / (data.length - 1)
  const points = data.map((d, i) => [i * stepX, height - (d.value / max) * height])
  const linePath = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ' ' + p[1]).join(' ')
  const areaPath = linePath + ` L${points[points.length - 1][0]} ${height} L0 ${height} Z`

  return (
    <svg viewBox={`0 0 480 ${height + 20}`} className="w-full">
      <path d={areaPath} fill={color} opacity="0.08" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" />
      {points.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="white" stroke={color} strokeWidth="2" />)}
      {data.map((d, i) => <text key={d.label} x={i * stepX} y={height + 15} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.label}</text>)}
    </svg>
  )
}
