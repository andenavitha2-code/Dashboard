import { useState } from 'react'

export default function RowMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen(!open)} className="px-1 text-slate-400">⋮</button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-6 z-30 w-36 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            <button onClick={() => { setOpen(false); onEdit() }} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Edit</button>
            <button onClick={() => setOpen(false)} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Duplicate</button>
            <button onClick={() => { setOpen(false); onDelete() }} className="block w-full rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
