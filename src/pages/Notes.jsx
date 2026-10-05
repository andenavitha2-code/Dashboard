import { useState, useRef } from 'react'
import { initialNotes } from '../data/office.js'
import Modal from '../components/ui/Modal.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', text: '' })
  const [preview, setPreview] = useState(null)          // { note, style }
  const cardRefs = useRef({})

  function addNote(e) {
    e.preventDefault()
    setNotes([{ id: Date.now(), ...form, date: '12 June, 2020', pinned: false }, ...notes])
    setForm({ title: '', text: '' })
    setAdding(false)
  }
  function togglePin(id) {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)))
  }
  function openPreview(note) {
    const el = cardRefs.current[note.id]
    const rect = el.getBoundingClientRect()
    setPreview({ note, style: { position: 'fixed', top: Math.max(70, Math.min(rect.top, window.innerHeight - 280)), left: Math.max(8, Math.min(rect.left, window.innerWidth - 340)) } })
  }
  function startEdit(note) {
    setForm({ title: note.title, text: note.text })
    setEditing(note.id)
    setPreview(null)
  }
  function saveEdit(e) {
    e.preventDefault()
    setNotes(notes.map((n) => (n.id === editing ? { ...n, ...form } : n)))
    setEditing(null)
  }
  function deleteNote(id) {
    setNotes(notes.filter((n) => n.id !== id))
    setPreview(null)
  }

  // pinned notes first
  const sorted = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned))

  return (
    <div>
      <PageHeader title="Notes" buttonLabel="+ Add Note" onButtonClick={() => setAdding(true)} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((n) => (
          <div key={n.id} ref={(el) => (cardRefs.current[n.id] = el)} onClick={() => openPreview(n)}
            className="cursor-pointer rounded-lg bg-white p-5 dark:bg-slate-900">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>📌 {n.date}</span>
              <button onClick={(e) => { e.stopPropagation(); togglePin(n.id) }} className={n.pinned ? 'text-yellow-500' : 'text-slate-300'}>★</button>
            </div>
            <h3 className="mb-2 font-medium">{n.title}</h3>
            <p className="line-clamp-3 text-sm text-slate-500">{n.text}</p>
          </div>
        ))}
      </div>

      {preview && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setPreview(null)} />
          <div style={preview.style} className="z-40 w-80 max-w-[90vw] rounded-xl bg-white p-5 shadow-xl dark:bg-slate-800" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">📌 {preview.note.date}</span>
              <div className="flex gap-3 text-slate-400">
                <button onClick={() => startEdit(preview.note)}>✎</button>
                <button onClick={() => deleteNote(preview.note.id)}>🗑</button>
                <button onClick={() => navigator.clipboard?.writeText(`${preview.note.title}\n${preview.note.text}`)} title="Copy note">⋮</button>
                <button onClick={() => setPreview(null)}>×</button>
              </div>
            </div>
            <h3 className="mb-2 font-medium">{preview.note.title}</h3>
            <p className="text-sm text-slate-500">{preview.note.text}</p>
          </div>
        </>
      )}

      {adding && (
        <Modal title="Add Note" onClose={() => setAdding(false)}>
          <form onSubmit={addNote} className="space-y-3 text-xs text-slate-400">
            <label className="block">Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></label>
            <label className="block">Description<textarea rows="5" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className={inputClass} /></label>
            <button className="rounded-lg bg-brand px-6 py-2 text-sm text-white">Create</button>
          </form>
        </Modal>
      )}
      {editing && (
        <Modal title="Edit Note" onClose={() => setEditing(null)}>
          <form onSubmit={saveEdit} className="space-y-3 text-xs text-slate-400">
            <label className="block">Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></label>
            <label className="block">Description<textarea rows="5" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className={inputClass} /></label>
            <button className="rounded-lg bg-brand px-6 py-2 text-sm text-white">Save</button>
          </form>
        </Modal>
      )}
    </div>
  )
}
