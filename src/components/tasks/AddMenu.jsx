import { useState } from 'react'

export default function AddMenu({ onAddTask }) {
  const [open, setOpen] = useState(false)
  const items = [
    { icon: '📋', label: 'Task', action: onAddTask },
    { icon: '▦', label: 'Board', action: () => {} },
    { icon: '📁', label: 'Project', action: () => {} },
    { icon: '👤', label: 'Invite', action: () => {} },
  ]

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm text-white">Add <span>▾</span></button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-30 w-40 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            {items.map((it) => (
              <button key={it.label} onClick={() => { setOpen(false); it.action() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">
                <span>{it.icon}</span>{it.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
