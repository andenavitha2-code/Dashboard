import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import { people } from '../../data/people.js'

const inputClass = 'w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'

// Used for both "Add Project" (project = null) and "Edit Project"
export default function ProjectModal({ project, onClose, onSave }) {
  const isEdit = project !== null
  const [form, setForm] = useState(project || {
    name: '', client: '', description: '', members: [], budget: '', status: 'Started', startDate: '', endDate: '',
  })

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function addMember(e) {
    const name = e.target.value
    if (name && !form.members.includes(name)) setForm({ ...form, members: [...form.members, name] })
  }
  function removeMember(name) {
    setForm({ ...form, members: form.members.filter((m) => m !== name) })
  }
  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal title={isEdit ? 'Edit Project' : 'Add Project'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
        {isEdit && (
          <label className="block text-xs text-slate-400">Status
            <select name="status" value={form.status} onChange={change} className={inputClass + ' mt-1'}>
              <option>Started</option><option>On Hold</option><option>Completed</option>
            </select>
          </label>
        )}
        <label className="block text-xs text-slate-400">Project Name
          <input name="name" value={form.name} onChange={change} required className={inputClass + ' mt-1'} />
        </label>
        <label className="block text-xs text-slate-400">Client Name
          <input name="client" value={form.client} onChange={change} className={inputClass + ' mt-1'} />
        </label>
        <label className="block text-xs text-slate-400">Description
          <textarea name="description" value={form.description} onChange={change} rows="3" className={inputClass + ' mt-1'} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs text-slate-400">Start Date
            <input type="date" name="startDate" value={form.startDate || ''} onChange={change} className={inputClass + ' mt-1'} />
          </label>
          <label className="block text-xs text-slate-400">End Date
            <input type="date" name="endDate" value={form.endDate || ''} onChange={change} className={inputClass + ' mt-1'} />
          </label>
        </div>
        <div className="text-xs text-slate-400">Members
          <div className="mt-1 flex flex-wrap gap-2 rounded-lg border border-slate-200 p-2 dark:border-slate-700">
            {form.members.map((m) => (
              <span key={m} className="rounded bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {m} <button type="button" onClick={() => removeMember(m)}>×</button>
              </span>
            ))}
            <select onChange={addMember} value="" className="flex-1 bg-transparent text-sm outline-none">
              <option value="">Add member...</option>
              {people.map((p) => <option key={p.name}>{p.name}</option>)}
            </select>
          </div>
        </div>
        <label className="block text-xs text-slate-400">Budget
          <input name="budget" value={form.budget} onChange={change} placeholder="$ 2.500.000" className={inputClass + ' mt-1'} />
        </label>
        <div className="text-right">
          <button className="rounded-lg bg-brand px-8 py-2 text-sm text-white">{isEdit ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </Modal>
  )
}
