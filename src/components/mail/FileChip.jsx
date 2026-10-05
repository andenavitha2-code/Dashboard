const icons = { pdf: '📄', zip: '🗜️', fig: '🎨', psd: '🖌️', default: '📎' }
function iconFor(name) {
  const ext = name.split('.').pop().toLowerCase()
  return icons[ext] || icons.default
}

function download(file) {
  const blob = new Blob([`Demo file: ${file.name} (${file.size})\n`], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  URL.revokeObjectURL(url)
}

export function AttachmentChip({ file, onRemove }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs dark:border-slate-700">
      <span>{iconFor(file.name)}</span>
      <div className="min-w-0 flex-1"><p className="truncate font-medium">{file.name}</p><p className="text-slate-400">{file.size}</p></div>
      {onRemove ? <button onClick={onRemove} className="text-slate-400">🗑</button> : <button onClick={() => download(file)} className="text-slate-400" title="Download">⭳</button>}
    </div>
  )
}

export function UploadingChip({ name, progress, onCancel }) {
  return (
    <div className="flex min-w-[160px] items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs dark:border-slate-700">
      <span>⏳</span>
      <div className="flex-1">
        <p className="font-medium">Uploading File... {progress}%</p>
        <div className="mt-1 h-1 rounded-full bg-slate-100 dark:bg-slate-700"><div className="h-1 rounded-full bg-brand" style={{ width: `${progress}%` }} /></div>
      </div>
      <button onClick={onCancel} className="text-slate-400">×</button>
    </div>
  )
}
