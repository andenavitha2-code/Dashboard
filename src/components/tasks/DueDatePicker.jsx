import { useState } from 'react'

const dayNames = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

export default function DueDatePicker({ value, time, onChange, onClear, onClose }) {
  const initial = value ? new Date(value + 'T00:00:00') : new Date(2020, 8, 8)
  const [month, setMonth] = useState(initial.getMonth())
  const [year, setYear] = useState(initial.getFullYear())
  const [pickedTime, setPickedTime] = useState(time || '10:00 AM')

  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const toKey = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  function go(step) {
    const d = new Date(year, month + step, 1)
    setYear(d.getFullYear()); setMonth(d.getMonth())
  }
  function pick(d) {
    onChange(toKey(d), pickedTime)
  }

  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div className="absolute left-0 top-7 z-30 w-72 rounded-xl bg-white p-3 text-sm shadow-lg dark:bg-slate-800">
        <div className="mb-2 flex items-center justify-between text-xs">
          <button onClick={() => go(-1)}>‹</button>
          <span>{first.toLocaleString('en', { month: 'long' })} {year}</span>
          <button onClick={() => go(1)}>›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400">
          {dayNames.map((d) => <span key={d}>{d}</span>)}
          {Array.from({ length: offset }, (_, i) => <span key={'b' + i} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const key = toKey(i + 1)
            return (
              <button key={i} onClick={() => pick(i + 1)} className={`rounded py-1 ${value === key ? 'bg-brand text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>{i + 1}</button>
            )
          })}
        </div>
        <label className="mt-3 flex items-center justify-between text-xs text-slate-400">Due at
          <input type="text" value={pickedTime} onChange={(e) => setPickedTime(e.target.value)} className="w-24 rounded border border-slate-200 bg-transparent px-2 py-1 text-right text-slate-700 outline-none dark:border-slate-700 dark:text-slate-200" />
        </label>
        <button onClick={() => { onClear(); onClose() }} className="mt-3 w-full rounded-lg bg-brand py-2 text-xs text-white">Clear Due Date</button>
      </div>
    </>
  )
}
