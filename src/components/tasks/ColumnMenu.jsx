import { useState } from 'react'
import { labelSwatchOptions } from '../../data/work.js'

export default function ColumnMenu({ onComplete, onArchive, onDelete, onRecolor, onMove, onSort }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="px-1 text-slate-400">•••</button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-6 z-30 w-48 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            <button onClick={() => { setOpen(false); onMove && onMove() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">⇄ Move</button>
            <button onClick={() => { setOpen(false); onSort && onSort() }} className="flex w-full items-center justify-between rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700"><span>↕ Sort Tasks</span><span>›</span></button>
            <button onClick={() => { setOpen(false); onComplete() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">✓ Complete Tasks</button>
            <button onClick={() => { setOpen(false); onArchive() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">🗄 Archive Tasks</button>
            <button onClick={() => { setOpen(false); onDelete() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">🗑 Delete Tasks</button>
            <div className="mt-2 grid grid-cols-5 gap-2 border-t border-slate-100 p-2 pt-3 dark:border-slate-700">
              {labelSwatchOptions.map((c) => <button key={c} onClick={() => { onRecolor(c); setOpen(false) }} className="h-5 w-5 rounded-full" style={{ backgroundColor: c }} />)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
