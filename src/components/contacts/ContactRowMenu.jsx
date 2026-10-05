import { useState } from 'react'

export default function ContactRowMenu({ onEdit, onDelete, onToggleFavorite, favorite }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen(!open)} className="px-1 text-slate-400">⋮</button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-6 z-30 w-40 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            <button onClick={() => { setOpen(false); onEdit() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">✎ Edit</button>
            <button onClick={() => { setOpen(false); onToggleFavorite() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">{favorite ? '★ Unfavorite' : '☆ Favorite'}</button>
            <button onClick={() => { setOpen(false); onDelete() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">🗑 Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
