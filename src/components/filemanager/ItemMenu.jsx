import { useState } from 'react'

export default function ItemMenu({ onRename, onDelete, onShare, onDownload, onCopy, onMove }) {
  const [open, setOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen(!open)} className="px-1 text-slate-400">⋮</button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => { setOpen(false); setShareOpen(false) }} />
          <div className="absolute right-0 top-6 z-30 w-44 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            <div className="relative">
              <button onClick={() => setShareOpen(!shareOpen)} className="flex w-full items-center justify-between rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">
                <span>🔗 Share</span><span>›</span>
              </button>
              {shareOpen && (
                <div className="absolute left-0 top-full z-40 mt-1 w-40 rounded-xl sm:left-full sm:top-0 sm:ml-1 sm:mt-0 bg-white p-2 shadow-lg dark:bg-slate-800">
                  <button onClick={() => { onShare(); setOpen(false) }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">🔗 Sharing Link</button>
                </div>
              )}
            </div>
            <button onClick={() => { setOpen(false); onDownload && onDownload() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">⭳ Download</button>
            <button onClick={() => { setOpen(false); onRename() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">✎ Rename</button>
            <button onClick={() => { setOpen(false); onCopy && onCopy() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">⧉ Copy</button>
            <button onClick={() => { setOpen(false); onMove && onMove() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">➜ Move</button>
            <button onClick={() => { setOpen(false); onDelete() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">🗑 Delete</button>
          </div>
        </>
      )}
    </div>
  )
}
