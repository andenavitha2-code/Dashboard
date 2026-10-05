import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import { calendarSwatches } from '../../data/work.js'

const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'

export default function NewCalendarModal({ onClose, onCreate }) {
  const [name, setName] = useState('Personal')
  const [description, setDescription] = useState('')
  const [swatchIndex, setSwatchIndex] = useState(0)

  function submit(e) {
    e.preventDefault()
    onCreate({ name, ...calendarSwatches[swatchIndex] })
  }

  return (
    <Modal title="New Calendar" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-xs text-slate-400">Name
          <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
        </label>
        <label className="block text-xs text-slate-400">Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="Type something" className={inputClass} />
        </label>
        <div>
          <p className="mb-2 text-xs text-slate-400">Color</p>
          <div className="flex flex-wrap gap-2">
            {calendarSwatches.map((s, i) => (
              <button key={s.swatch} type="button" onClick={() => setSwatchIndex(i)}
                className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: s.swatch }}>
                {swatchIndex === i && <span className="text-white">✓</span>}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full rounded-lg bg-brand py-2.5 text-sm text-white">Create</button>
      </form>
    </Modal>
  )
}
