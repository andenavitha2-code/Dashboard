export default function UploadToast({ files, onClose }) {
  const done = files.filter((f) => f.progress >= 100).length

  return (
    <div className="fixed bottom-5 right-5 z-50 w-72 rounded-xl bg-slate-900 p-3 text-xs text-white shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <span>Uploading {files.length} files</span>
        <button onClick={onClose} className="text-slate-400">×</button>
      </div>
      <p className="mb-2 text-slate-400">{done}/{files.length} &bull; {Math.round(files.reduce((s, f) => s + f.progress, 0) / files.length)}%</p>
      <div className="max-h-48 space-y-2 overflow-y-auto">
        {files.map((f) => (
          <div key={f.name} className="flex items-center gap-2">
            <span>📄</span>
            <div className="min-w-0 flex-1">
              <p className="truncate">{f.name}</p>
              <div className="mt-1 h-1 rounded-full bg-slate-700"><div className="h-1 rounded-full bg-brand" style={{ width: `${f.progress}%` }} /></div>
            </div>
            <span className="w-8 shrink-0 text-right">{f.progress >= 100 ? '✓' : `${f.progress}%`}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
