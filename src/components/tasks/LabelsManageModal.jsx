import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import { labelSwatchOptions } from '../../data/work.js'

export default function LabelsManageModal({ labels, onClose, onChange }) {
  const [list, setList] = useState(labels)
  const [newName, setNewName] = useState('')
  const [colorFor, setColorFor] = useState(null)        // index of label whose color swatch popover is open

  function rename(i, name) {
    setList(list.map((l, idx) => (idx === i ? { ...l, name } : l)))
  }
  function recolor(i, swatch) {
    setList(list.map((l, idx) => (idx === i ? { ...l, swatch } : l)))
    setColorFor(null)
  }
  function remove(i) {
    setList(list.filter((_, idx) => idx !== i))
  }
  function addLabel() {
    if (!newName.trim()) return
    setList([...list, { name: newName, swatch: labelSwatchOptions[0] }])
    setNewName('')
  }
  function done() {
    onChange(list)
    onClose()
  }

  return (
    <Modal title="Manage Labels" onClose={onClose}>
      <div className="space-y-2">
        {list.map((l, i) => (
          <div key={i} className="relative flex items-center gap-2">
            <button onClick={() => setColorFor(colorFor === i ? null : i)} className="h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: l.swatch }} />
            <input value={l.name} onChange={(e) => rename(i, e.target.value)} className="flex-1 rounded-lg border border-slate-200 bg-transparent px-2 py-1.5 text-sm outline-none dark:border-slate-700" />
            <button onClick={(e) => e.currentTarget.previousSibling.focus()} className="text-slate-400" title="Rename">✎</button>
            <button onClick={() => remove(i)} className="text-slate-400">🗑</button>
            {colorFor === i && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setColorFor(null)} />
                <div className="absolute left-6 top-7 z-30 grid grid-cols-5 gap-2 rounded-xl bg-white p-3 shadow-lg dark:bg-slate-800">
                  {labelSwatchOptions.map((c) => <button key={c} onClick={() => recolor(i, c)} className="h-6 w-6 rounded-full" style={{ backgroundColor: c }} />)}
                </div>
              </>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
          <input value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addLabel()}
            placeholder="Type an name label..." className="flex-1 rounded-lg border border-slate-200 bg-transparent px-2 py-1.5 text-sm outline-none dark:border-slate-700" />
        </div>
        <button onClick={addLabel} className="text-sm text-brand">+ Add Label</button>
      </div>
      <button onClick={done} className="mt-5 w-full rounded-lg bg-brand py-2.5 text-sm text-white">Done</button>
    </Modal>
  )
}
