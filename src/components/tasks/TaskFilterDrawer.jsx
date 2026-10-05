import { useState } from 'react'
import { taskLabels, taskMembers } from '../../data/work.js'
import { Avatar } from '../ui/Avatar.jsx'

const inputClass = 'w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-slate-700'

export default function TaskFilterDrawer({ filters, onApply, onClose }) {
  const [draft, setDraft] = useState(filters)

  function toggleLabel(name) {
    setDraft({ ...draft, labels: draft.labels.includes(name) ? draft.labels.filter((l) => l !== name) : [...draft.labels, name] })
  }
  function toggleMember(name) {
    setDraft({ ...draft, member: draft.member === name ? '' : name })
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20" onClick={onClose}>
      <div className="h-full w-[340px] max-w-full bg-white p-6 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl">Filter</h2>
          <button onClick={onClose} className="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">×</button>
        </div>
        <div className="space-y-5 text-sm text-slate-400">
          <input value={draft.search} onChange={(e) => setDraft({ ...draft, search: e.target.value })} placeholder="Search Tasks..." className={inputClass} />
          <div>
            <p className="mb-2">Labels</p>
            <div className="flex flex-wrap gap-2">
              {taskLabels.map((l) => (
                <button key={l.name} onClick={() => toggleLabel(l.name)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white ${draft.labels.includes(l.name) ? 'ring-2 ring-offset-1 dark:ring-offset-slate-900' : ''}`}
                  style={{ backgroundColor: l.swatch }}>
                  {l.name} {draft.labels.includes(l.name) && '✓'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2">Members</p>
            <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 p-2 dark:border-slate-700">
              {draft.member && (
                <span className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <Avatar name={draft.member} size="h-5 w-5" /> {draft.member} <button onClick={() => toggleMember(draft.member)}>×</button>
                </span>
              )}
              <select onChange={(e) => e.target.value && toggleMember(e.target.value)} value="" className="flex-1 bg-transparent text-sm outline-none">
                <option value="">Add member...</option>
                {taskMembers.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <label className="block">Due Date
            <select value={draft.due} onChange={(e) => setDraft({ ...draft, due: e.target.value })} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'}>
              <option>Due anytime</option><option>Overdue</option><option>Due today</option><option>Due this week</option>
            </select>
          </label>
          <label className="block">Status
            <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'}>
              <option value="">Any</option><option>Completed</option><option>Incomplete</option>
            </select>
          </label>
          <div className="flex items-center gap-4">
            <button onClick={() => onApply(draft)} className="rounded-lg bg-brand px-6 py-2.5 text-white">Apply Filters</button>
            <button onClick={() => onApply({ search: '', labels: [], member: '', due: 'Due anytime', status: '' })} className="text-brand underline">Reset all Filters</button>
          </div>
        </div>
      </div>
    </div>
  )
}
