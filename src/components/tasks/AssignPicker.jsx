import { useState } from 'react'
import { taskMembers } from '../../data/work.js'
import { Avatar } from '../ui/Avatar.jsx'

export default function AssignPicker({ assigned, onToggle, onClose }) {
  const [query, setQuery] = useState('')
  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div className="absolute left-0 top-7 z-30 w-56 rounded-xl bg-white p-3 text-sm shadow-lg dark:bg-slate-800">
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1 dark:bg-slate-700">
          <span className="text-slate-400">🔍</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find Person..." className="w-full bg-transparent text-xs outline-none" />
        </div>
        {taskMembers.filter((m) => m.toLowerCase().includes(query.toLowerCase())).map((m) => (
          <button key={m} type="button" onClick={() => onToggle(m)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700">
            <Avatar name={m} size="h-6 w-6" /><span className="flex-1 text-xs">{m}</span>
            {assigned.includes(m) && <span className="text-brand">✓</span>}
          </button>
        ))}
      </div>
    </>
  )
}
