// Reusable filter drawer: pass `fields` = [{ key, label, type: 'text'|'select', options? }]
export default function GenericFilterDrawer({ fields, filters, onApply, onClose }) {
  const set = (key, value) => onApply({ ...filters, [key]: value })
  const inputClass = 'w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-slate-700'

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20" onClick={onClose}>
      <div className="h-full w-[340px] max-w-full bg-white p-6 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl">Filter</h2>
          <button onClick={onClose} className="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">×</button>
        </div>
        <div className="space-y-5 text-sm text-slate-400">
          {fields.map((f) => (
            <label key={f.key} className="block">{f.label}
              {f.type === 'select' ? (
                <select value={filters[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'}>
                  <option value="">Any</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input value={filters[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'} />
              )}
            </label>
          ))}
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="rounded-lg bg-brand px-6 py-2.5 text-white">Save</button>
            <button onClick={() => { onApply(Object.fromEntries(fields.map((f) => [f.key, '']))); }} className="text-brand underline">Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}
