import { useState } from 'react'
import { people } from '../../data/people.js'

const inputClass = 'w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-slate-700'

export default function FilterDrawer({ filters, onApply, onClose }) {
  const [draft, setDraft] = useState(filters)

  function change(e) {
    setDraft({ ...draft, [e.target.name]: e.target.value })
  }

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-[360px] max-w-full bg-white p-6 shadow-xl dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl">Filter</h2>
        <button onClick={onClose} className="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">×</button>
      </div>
      <div className="space-y-5 text-sm text-slate-400">
        <input name="search" value={draft.search} onChange={change} placeholder="Search Projects..." className={inputClass} />
        <label className="block">Members
          <select name="member" value={draft.member} onChange={change} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'}>
            <option value="">All members</option>
            {people.map((p) => <option key={p.name}>{p.name}</option>)}
          </select>
        </label>
        <label className="block">Status
          <select name="status" value={draft.status} onChange={change} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'}>
            <option value="">Any status</option><option>Started</option><option>On Hold</option><option>Completed</option>
          </select>
        </label>
        <div className="flex items-center gap-4">
          <button onClick={() => onApply(draft)} className="rounded-lg bg-brand px-6 py-2.5 text-white">Apply Filters</button>
          <button onClick={() => onApply({ search: '', member: '', status: '' })} className="text-brand underline">Reset all Filters</button>
        </div>
      </div>
    </div>
  )
}
