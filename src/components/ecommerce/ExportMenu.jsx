import { useState } from 'react'

function downloadCsv(rows, filename) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => `"${r[h] ?? ''}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const options = [
  { label: 'Print', icon: '🖨️' }, { label: 'Excel', icon: '📊' }, { label: 'PDF', icon: '📄' }, { label: 'CSV', icon: '📑' },
]

// Export dropdown: Print calls window.print(), the others download the visible rows as CSV.
export default function ExportMenu({ rows, filename = 'products' }) {
  const [open, setOpen] = useState(false)

  function handle(option) {
    setOpen(false)
    if (option === 'Print') window.print()
    else downloadCsv(rows, `${filename}.csv`)
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm dark:bg-slate-900">
        ⭳ Export <span className="text-slate-400">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-30 w-36 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            {options.map((o) => (
              <button key={o.label} onClick={() => handle(o.label)} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">
                <span>{o.icon}</span>{o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
