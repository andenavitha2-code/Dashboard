import { useState } from 'react'

const projects = ['Design Plans', 'Wireframe UI Kit', 'Admin Dashboard', 'Sochi - Hotel Booking']

export default function ProjectSwitcher({ active, onSelect }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-2xl font-normal sm:text-3xl">
        {active} <span className="text-xl text-slate-400">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-12 z-30 w-60 rounded-xl bg-white p-3 text-sm shadow-lg dark:bg-slate-800">
            <p className="mb-2 text-xs text-slate-400">Projects</p>
            <div className="mb-2 flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1.5 dark:bg-slate-700">
              <span className="text-slate-400">🔍</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Project..." className="w-full bg-transparent text-xs outline-none" />
            </div>
            {projects.filter((p) => p.toLowerCase().includes(query.toLowerCase())).map((p) => (
              <button key={p} onClick={() => { onSelect(p); setOpen(false) }} className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700">
                {p} {active === p && <span className="text-brand">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
