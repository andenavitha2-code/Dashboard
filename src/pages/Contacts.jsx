import { useState } from 'react'
import { initialContacts, contactRoles } from '../data/office.js'
import { Link } from 'react-router-dom'
import Modal from '../components/ui/Modal.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import { Avatar } from '../components/ui/Avatar.jsx'
import ProfilePreview from '../components/contacts/ProfilePreview.jsx'
import ContactRowMenu from '../components/contacts/ContactRowMenu.jsx'
import ContactFormModal from '../components/contacts/ContactFormModal.jsx'

export default function Contacts() {
  const [contacts, setContacts] = useState(initialContacts)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('list')              // 'list' or 'cards'
  const [modal, setModal] = useState(null)               // null | 'add' | contact being edited
  const [selectedId, setSelectedId] = useState(initialContacts[0].id)
  const [deleting, setDeleting] = useState(null)

  const visible = contacts.filter((c) => `${c.first} ${c.last} ${c.email} ${c.location}`.toLowerCase().includes(search.toLowerCase()))
  const selected = contacts.find((c) => c.id === selectedId)
  const favorites = contacts.filter((c) => c.favorite && c.id !== selectedId)

  function saveContact(form) {
    if (modal === 'add') {
      const created = { ...form, id: Date.now(), favorite: false, status: 'Active' }
      setContacts([created, ...contacts])
      setSelectedId(created.id)
    } else {
      setContacts(contacts.map((c) => (c.id === form.id ? form : c)))
    }
    setModal(null)
  }
  function deleteContact(id) {
    setContacts(contacts.filter((c) => c.id !== id))
    setDeleting(null)
    if (selectedId === id) setSelectedId(contacts[0]?.id)
  }
  function toggleFavorite(id) {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)))
  }
  function viewProfile(id) {
    setSelectedId(id)
    setView('list')
  }

  return (
    <div>
      <PageHeader title="Contacts" buttonLabel="+ Add Contact" onButtonClick={() => setModal('add')} />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex min-w-[160px] flex-1 items-center gap-2 rounded-lg bg-white px-3 dark:bg-slate-900">
          <span className="text-slate-400">🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contact..." className="w-full bg-transparent py-2 text-sm outline-none" />
        </div>
        <details className="relative">
          <summary className="flex list-none items-center gap-1 rounded-lg bg-white px-3 py-2 text-sm dark:bg-slate-900">Actions ▾</summary>
          <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            <button onClick={() => setContacts(contacts.map((c) => ({ ...c, status: 'Active' })))} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Mark all Active</button>
            <button onClick={() => setContacts(contacts.map((c) => ({ ...c, status: 'Blocked' })))} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Block all</button>
          </div>
        </details>
        <button onClick={() => setView(view === 'list' ? 'cards' : 'list')} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900">{view === 'list' ? '▦' : '☰'}</button>
      </div>

      {view === 'list' ? (
        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="overflow-x-auto rounded-lg bg-white p-4 dark:bg-slate-900">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs text-slate-400"><tr><th className="p-2">NAME</th><th>EMAIL</th><th>LOCATION</th><th>PHONE</th><th>STATUS</th><th></th></tr></thead>
              <tbody>
                {visible.map((c) => (
                  <tr key={c.id} onClick={() => setSelectedId(c.id)}
                    className={`cursor-pointer border-t border-slate-100 dark:border-slate-800 ${selectedId === c.id ? 'bg-green-50/60 dark:bg-slate-800' : ''}`}>
                    <td className="p-2"><div className="flex items-center gap-2"><Avatar name={`${c.first} ${c.last}`} /><span>{c.first} {c.last}<br /><span className="text-xs text-slate-400">{c.job}</span></span></div></td>
                    <td>{c.email}</td><td>{c.location}</td><td>{c.phone}</td>
                    <td><StatusBadge status={c.status} /></td>
                    <td><ContactRowMenu onEdit={() => setModal(c)} onDelete={() => setDeleting(c)} onToggleFavorite={() => toggleFavorite(c.id)} favorite={c.favorite} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-lg bg-white p-5 dark:bg-slate-900"><ProfilePreview contact={selected} favorites={favorites} /></div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((c) => (
            <div key={c.id} className="relative rounded-lg bg-white p-5 text-center dark:bg-slate-900">
              <div className="absolute right-3 top-3"><ContactRowMenu onEdit={() => setModal(c)} onDelete={() => setDeleting(c)} onToggleFavorite={() => toggleFavorite(c.id)} favorite={c.favorite} /></div>
              <div className="mx-auto mb-3 w-fit"><Avatar name={`${c.first} ${c.last}`} size="h-20 w-20" /></div>
              <h3 className="font-medium">{c.first} {c.last}</h3>
              <span className={`rounded px-2 py-0.5 text-xs ${contactRoles[c.job] || 'bg-slate-100 text-slate-600'}`}>{c.job}</span>
              <p className="mt-3 text-xs text-slate-400">{c.location}<br />{c.email}<br />{c.phone}</p>
              <div className="mt-3 flex justify-center gap-3 text-xs">
                <button onClick={() => viewProfile(c.id)} className="rounded-lg border border-slate-200 px-3 py-1.5 dark:border-slate-700">Profile</button>
                <Link to="/chat" className="rounded-lg bg-brand px-3 py-1.5 text-white">Message</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && <ContactFormModal contact={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={saveContact} />}

      {deleting && (
        <Modal title="Delete Contact" onClose={() => setDeleting(null)}>
          <p className="mb-5 text-sm text-slate-500">Are you sure you want to delete {deleting.first} {deleting.last}?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleting(null)} className="rounded-lg border border-slate-200 px-5 py-2 text-sm dark:border-slate-700">Cancel</button>
            <button onClick={() => deleteContact(deleting.id)} className="rounded-lg bg-red-500 px-5 py-2 text-sm text-white">Delete</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
