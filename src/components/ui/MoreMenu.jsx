import { useState } from 'react'

function downloadCsv(title) {
  const csv = `Report,${title}\nGenerated,${new Date().toLocaleString()}\n`
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// Small "•••" dropdown used on dashboard cards. Pass `items` to override the default Print / Download actions.
export default function MoreMenu({ title = 'Report', items, label = '•••', className = 'text-slate-400' }) {
  const [open, setOpen] = useState(false)
  const menu = items || [
    { label: 'Print', onClick: () => window.print() },
    { label: 'Download CSV', onClick: () => downloadCsv(title) },
  ]

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)} className={className} aria-label="More options">{label}</button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-7 z-30 w-40 rounded-xl bg-white p-2 text-left text-sm font-normal text-slate-700 shadow-lg dark:bg-slate-800 dark:text-slate-200">
            {menu.map((m) => (
              <button key={m.label} type="button" onClick={() => { setOpen(false); m.onClick() }}
                className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">{m.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
