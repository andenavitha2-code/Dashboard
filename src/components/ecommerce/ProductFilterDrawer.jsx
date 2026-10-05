import { useState } from 'react'

const inputClass = 'w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-slate-700'

export default function ProductFilterDrawer({ filters, onApply, onClose }) {
  const [draft, setDraft] = useState(filters)

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20" onClick={onClose}>
      <div className="h-full w-[340px] max-w-full bg-white p-6 shadow-xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl">Filter</h2>
          <button onClick={onClose} className="rounded-lg bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800">×</button>
        </div>
        <div className="space-y-5 text-sm text-slate-400">
          <label className="block">Category
            <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'}>
              <option value="">All</option><option>iPhone</option><option>Watch</option><option>Notebook</option>
            </select>
          </label>
          <label className="block">Status
            <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'}>
              <option value="">Any</option><option>Available</option><option>Disabled</option>
            </select>
          </label>
          <label className="block">Min Price
            <input type="number" value={draft.minPrice} onChange={(e) => setDraft({ ...draft, minPrice: e.target.value })} placeholder="$500" className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'} />
          </label>
          <label className="block">Max Price
            <input type="number" value={draft.maxPrice} onChange={(e) => setDraft({ ...draft, maxPrice: e.target.value })} placeholder="$5.500" className={inputClass + ' mt-1 text-slate-700 dark:text-slate-200'} />
          </label>
          <div className="flex items-center gap-4">
            <button onClick={() => onApply(draft)} className="rounded-lg bg-brand px-6 py-2.5 text-white">Save</button>
            <button onClick={() => onApply({ category: '', status: '', minPrice: '', maxPrice: '' })} className="text-brand underline">Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}
