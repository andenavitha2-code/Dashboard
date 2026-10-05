// Event preview popup, positioned near the clicked bar. Matches the Figma: colored square + title,
// clock + date/time range, description, calendar name, with edit/delete/more/close icons.
import { useState } from 'react'

export default function EventPopover({ event, cal, onClose, onEdit, onDelete }) {
  const [copied, setCopied] = useState(false)
  const start = new Date(event.start + 'T00:00:00')     // parse as local midnight, not UTC
  const weekday = start.toLocaleDateString('en', { weekday: 'long' })
  const monthDay = start.toLocaleDateString('en', { month: 'long', day: 'numeric' })
  const fmt = (h) => `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`

  function copyDetails() {
    const text = `${event.title} - ${weekday}, ${monthDay} ${fmt(event.startHour)}-${fmt(event.endHour)}`
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/10 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${cal.dot}`} />
            <h3 className="font-medium">{event.title}</h3>
          </div>
          <div className="flex gap-3 text-slate-400">
            <button onClick={onEdit} title="Edit">✎</button>
            <button onClick={onDelete} title="Delete">🗑</button>
            <button onClick={copyDetails} title={copied ? 'Copied!' : 'Copy details'}>{copied ? '✓' : '•••'}</button>
            <button onClick={onClose} title="Close">×</button>
          </div>
        </div>
        <div className="mb-3 flex items-start gap-2 text-sm text-slate-500">
          <span>🕐</span><span>{weekday}, {monthDay} &bull; {fmt(event.startHour)} - {fmt(event.endHour)}</span>
        </div>
        <div className="mb-3 flex items-start gap-2 text-sm text-slate-500">
          <span>≡</span><p>{event.description}</p>
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-500">
          <span>📅</span><span>{cal.name}</span>
        </div>
      </div>
    </div>
  )
}
