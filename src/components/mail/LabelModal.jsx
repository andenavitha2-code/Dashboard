import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import { labelSwatches } from '../../data/work.js'

export default function LabelModal({ label, onClose, onSave }) {
  const [name, setName] = useState(label ? label.name : '')
  const [swatchIndex, setSwatchIndex] = useState(label ? Math.max(0, labelSwatches.indexOf(label.swatch)) : 0)

  function submit(e) {
    e.preventDefault()
    onSave({ name, swatch: labelSwatches[swatchIndex] })
  }

  return (
    <Modal title={label ? 'Edit Label' : 'New Label'} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-xs text-slate-400">Name
          <input value={name} onChange={(e) => setName(e.target.value)} required
            className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700" />
        </label>
        <div>
          <p className="mb-2 text-xs text-slate-400">Color</p>
          <div className="flex flex-wrap gap-2">
            {labelSwatches.map((c, i) => (
              <button key={c} type="button" onClick={() => setSwatchIndex(i)} className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: c }}>
                {swatchIndex === i && <span className="text-white">✓</span>}
              </button>
            ))}
          </div>
        </div>
        <button className="w-full rounded-lg bg-brand py-2.5 text-sm text-white">{label ? 'Save' : 'Create'}</button>
      </form>
    </Modal>
  )
}
