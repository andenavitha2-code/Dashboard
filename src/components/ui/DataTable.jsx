import { useState } from 'react'

// columns = [{ label: 'NAME', key: 'name', render: (row) => <b>{row.name}</b> }]
export default function DataTable({ columns, rows, searchPlaceholder = 'Search...', onRowClick, onDeleteSelected }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState([])

  // search looks at every text value of the row
  const filtered = rows.filter((row) => JSON.stringify(Object.values(row)).toLowerCase().includes(search.toLowerCase()))
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const start = (page - 1) * pageSize
  const pageRows = filtered.slice(start, start + pageSize)

  function toggle(id) {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id])
  }
  function toggleAll() {
    setSelected(pageRows.every((r) => selected.includes(r.id)) ? [] : pageRows.map((r) => r.id))
  }
  function deleteSelected() {
    onDeleteSelected(selected)
    setSelected([])
  }

  return (
    <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder={searchPlaceholder}
          className="min-w-0 flex-1 rounded-lg bg-slate-100 px-4 py-2 text-sm outline-none dark:bg-slate-800" />
        {onDeleteSelected && selected.length > 0 && (
          <button onClick={deleteSelected} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500">Delete ({selected.length})</button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs text-slate-400">
            <tr>
              <th className="w-10 p-3"><input type="checkbox" onChange={toggleAll} checked={pageRows.length > 0 && pageRows.every((r) => selected.includes(r.id))} /></th>
              {columns.map((c) => <th key={c.label} className="p-3 font-normal">{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id} onClick={() => onRowClick && onRowClick(row)}
                className={`border-t border-slate-100 dark:border-slate-800 ${onRowClick ? 'cursor-pointer' : ''} ${selected.includes(row.id) ? 'bg-green-50/60 dark:bg-slate-800' : ''}`}>
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggle(row.id)} />
                </td>
                {columns.map((c) => <td key={c.label} className="p-3">{c.render ? c.render(row) : row[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }} className="rounded border border-slate-200 bg-transparent px-2 py-1 dark:border-slate-700">
            <option>10</option><option>20</option>
          </select>
          Showing {filtered.length === 0 ? 0 : start + 1} - {Math.min(start + pageSize, filtered.length)} of {filtered.length}
        </div>
        <div className="flex gap-1">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded bg-slate-100 px-2 py-1 disabled:opacity-40 dark:bg-slate-800">‹</button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`rounded px-2.5 py-1 ${page === i + 1 ? 'bg-brand text-white' : ''}`}>{i + 1}</button>
          ))}
          <button disabled={page === pageCount} onClick={() => setPage(page + 1)} className="rounded bg-slate-100 px-2 py-1 disabled:opacity-40 dark:bg-slate-800">›</button>
        </div>
      </div>
    </div>
  )
}
