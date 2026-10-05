import { useState } from 'react'
import { labelSwatches } from '../../data/work.js'

export default function LabelMenu({ onEdit, onAddSublabel, onDelete, onRecolor }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-1 text-slate-400">⋮</button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-6 z-30 w-48 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            <button onClick={() => { setOpen(false); onEdit() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">✎ Edit</button>
            <button onClick={() => { setOpen(false); onAddSublabel() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">+ Add Sublabel</button>
            <button onClick={() => { setOpen(false); onDelete() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">🗑 Delete Label</button>
            <div className="mt-2 grid grid-cols-5 gap-2 border-t border-slate-100 p-2 pt-3 dark:border-slate-700">
              {labelSwatches.map((c) => <button key={c} onClick={() => { onRecolor(c); setOpen(false) }} className="h-5 w-5 rounded-full" style={{ backgroundColor: c }} />)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
