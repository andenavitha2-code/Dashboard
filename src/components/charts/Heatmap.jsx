// Weekly posting-time heatmap. active = [{ day, hour, label }]. Clicking a lit cell shows its label.
import { useState } from 'react'

const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
const hours = Array.from({ length: 24 }, (_, i) => i)

export default function Heatmap({ active }) {
  const [openKey, setOpenKey] = useState(null)
  const find = (day, hour) => active.find((a) => a.day === day && a.hour === hour)

  return (
    <div className="overflow-x-auto">
      <div className="relative inline-grid grid-cols-[28px_repeat(24,20px)] gap-1 text-[9px] text-slate-400">
        <span />
        {hours.map((h) => <span key={h} className="text-center">{h === 0 ? '12A' : h < 12 ? h + 'A' : h === 12 ? '12P' : h - 12 + 'P'}</span>)}
        {days.map((day) => (
          <>
            <span key={day} className="flex items-center">{day}</span>
            {hours.map((h) => {
              const cell = find(day, h)
              const key = day + h
              return (
                <div key={key} className="relative">
                  <button type="button" disabled={!cell} onClick={() => setOpenKey(openKey === key ? null : key)}
                    className={`h-5 w-5 rounded ${cell ? 'bg-emerald-400 hover:bg-emerald-500' : 'bg-emerald-50 dark:bg-slate-800'}`} />
                  {openKey === key && cell && (
                    <div className="absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] text-white shadow-lg">
                      {cell.label}
                      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  )}
                </div>
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
