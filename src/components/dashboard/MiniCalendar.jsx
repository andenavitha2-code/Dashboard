import { useState } from 'react'

const dayNames = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

export default function MiniCalendar({ initialYear = 2020, initialMonth = 8, highlightDay = 12 }) {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)     // 0-indexed

  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = (first.getDay() + 6) % 7               // Monday-first blank cells

  function go(step) {
    const d = new Date(year, month + step, 1)
    setYear(d.getFullYear())
    setMonth(d.getMonth())
  }

  return (
    <div className="text-center text-sm">
      <div className="mb-2 flex items-center justify-between">
        <button onClick={() => go(-1)}>‹</button>
        <p>{first.toLocaleString('en', { month: 'long' })} <span className="text-slate-400">{year}</span></p>
        <button onClick={() => go(1)}>›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-400">
        {dayNames.map((d) => <span key={d}>{d}</span>)}
        {Array.from({ length: offset }, (_, i) => <span key={'b' + i} />)}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <span key={i} className={year === initialYear && month === initialMonth && i + 1 === highlightDay ? 'rounded-full bg-brand text-white' : ''}>{i + 1}</span>
        ))}
      </div>
    </div>
  )
}
