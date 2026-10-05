import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import { Avatar } from '../ui/Avatar.jsx'

const people = ['Regina Cooper', 'Jane Wilson', 'Dustin Williamson', 'Brandon Pena', 'Shane Black', 'Priscilla Edwards']

export default function InviteModal({ team, onClose, onInvite }) {
  const [query, setQuery] = useState('')
  const [invited, setInvited] = useState(['Regina Cooper', 'Jane Wilson', 'Dustin Williamson', 'Brandon Pena'])

  function toggle(name) {
    setInvited(invited.includes(name) ? invited.filter((n) => n !== name) : [...invited, name])
  }

  return (
    <Modal title="Invite New Members" onClose={onClose}>
      <p className="mb-3 text-xs text-slate-400">Invite Members to <b>{team.name.replace('#', '')} Team</b></p>
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent text-sm outline-none" />
        <span className="text-slate-400">🔍</span>
      </div>
      <p className="mb-2 text-xs text-slate-400">Invited({invited.length})</p>
      <div className="mb-4 max-h-56 space-y-2 overflow-y-auto">
        {people.filter((p) => p.toLowerCase().includes(query.toLowerCase())).map((p) => (
          <button key={p} type="button" onClick={() => toggle(p)} className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
            <Avatar name={p} size="h-8 w-8" /><span className="flex-1">{p}</span>
            {invited.includes(p) && <span className="text-brand">✓</span>}
          </button>
        ))}
      </div>
      <button onClick={() => onInvite(invited)} className="w-full rounded-lg bg-brand py-2.5 text-sm text-white">Invite</button>
    </Modal>
  )
}
