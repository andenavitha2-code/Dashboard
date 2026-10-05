import ExportMenu from './ExportMenu.jsx'

// Shared "search + filter + actions" row used above Orders/Customers/Products tables
export default function ListToolbar({ search, onSearch, placeholder, onFilter, rows, filename, actions }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="flex min-w-[160px] flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 dark:bg-slate-800">
        <span className="text-slate-400">🔍</span>
        <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder={placeholder}
          className="w-full bg-transparent py-2 text-sm outline-none" />
      </div>
      <button onClick={onFilter} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700" title="Filter">⚙</button>
      <details className="group relative">
        <summary className="flex list-none items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">Actions ▾</summary>
        <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
          {actions}
        </div>
      </details>
    </div>
  )
}
