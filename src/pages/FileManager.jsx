import { useState, useRef } from 'react'
import { initialFolders, initialFiles } from '../data/office.js'
import ItemMenu from '../components/filemanager/ItemMenu.jsx'
import UploadToast from '../components/filemanager/UploadToast.jsx'

export default function FileManager() {
  const [folders, setFolders] = useState(initialFolders)
  const [files, setFiles] = useState(initialFiles)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('grid')
  const [selected, setSelected] = useState(null)              // { kind: 'folder' | 'file', item }
  const [checked, setChecked] = useState([])                  // ids checked in list view
  const [sharing, setSharing] = useState({ 'File Sharing': true, Backup: false, Sync: false })
  const [uploading, setUploading] = useState(null)             // array of { name, progress } while a fake upload runs
  const uploadTimer = useRef(null)

  const match = (item) => item.name.toLowerCase().includes(search.toLowerCase())

  function addFolder() {
    const name = window.prompt('Folder name')
    if (name) setFolders([...folders, { id: Date.now(), name, size: '0 MB', modified: 'now', created: 'now' }])
  }
  function startUpload() {
    const names = ['Dashboard UI Kit.psd', 'Logo Pack.zip', 'Project Brief v2.docx']
    const batch = names.map((name) => ({ name, progress: 0 }))
    setUploading(batch)
    uploadTimer.current = setInterval(() => {
      setUploading((prev) => {
        if (!prev) return prev
        const next = prev.map((f) => ({ ...f, progress: Math.min(100, f.progress + 20) }))
        if (next.every((f) => f.progress >= 100)) {
          clearInterval(uploadTimer.current)
          setFiles((fs) => [...fs, ...names.map((name, i) => ({ id: Date.now() + i, name, type: name.split('.').pop(), size: '1.0 MB', modified: 'now', created: 'now' }))])
        }
        return next
      })
    }, 400)
  }
  function renameItem(kind, item) {
    const name = window.prompt('Rename', item.name)
    if (!name) return
    if (kind === 'folder') setFolders(folders.map((f) => (f.id === item.id ? { ...f, name } : f)))
    else setFiles(files.map((f) => (f.id === item.id ? { ...f, name } : f)))
  }
  function deleteItem(kind, item) {
    if (kind === 'folder') setFolders(folders.filter((f) => f.id !== item.id))
    else setFiles(files.filter((f) => f.id !== item.id))
    if (selected && selected.item.id === item.id) setSelected(null)
  }
  function downloadItem(item) {
    const url = URL.createObjectURL(new Blob([`Demo file: ${item.name} (${item.size})\n`], { type: 'text/plain' }))
    const a = document.createElement('a')
    a.href = url
    a.download = item.name
    a.click()
    URL.revokeObjectURL(url)
  }
  function copyItem(kind, item) {
    const copy = { ...item, id: Date.now(), name: item.name + ' (copy)', modified: 'now', created: 'now' }
    if (kind === 'folder') setFolders([...folders, copy])
    else setFiles([...files, copy])
  }
  function moveItem(kind, item) {
    const target = window.prompt('Move to folder (type a folder name)', folders.find((f) => f.id !== item.id)?.name || '')
    const folder = target && folders.find((f) => f.name.toLowerCase() === target.trim().toLowerCase() && f.id !== item.id)
    if (!folder) { if (target) window.alert('Folder not found'); return }
    const location = 'My Files / ' + folder.name
    if (kind === 'folder') setFolders(folders.map((f) => (f.id === item.id ? { ...f, location } : f)))
    else setFiles(files.map((f) => (f.id === item.id ? { ...f, location } : f)))
    if (selected && selected.item.id === item.id) setSelected({ kind, item: { ...item, location } })
  }
  function shareItem(item) {
    navigator.clipboard?.writeText(`${window.location.origin}/file-manager?item=${encodeURIComponent(item.name)}`)
  }
  function toggleChecked(id) {
    setChecked(checked.includes(id) ? checked.filter((c) => c !== id) : [...checked, id])
  }

  function Tile({ item, kind, icon }) {
    const active = selected && selected.item.id === item.id
    return (
      <div onClick={() => setSelected({ kind, item })}
        className={`group relative rounded-xl p-3 text-center text-xs ${active ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
        <div className="absolute right-1 top-1 sm:opacity-0 sm:group-hover:opacity-100">
          <ItemMenu onRename={() => renameItem(kind, item)} onDelete={() => deleteItem(kind, item)} onShare={() => shareItem(item)} onDownload={() => downloadItem(item)} onCopy={() => copyItem(kind, item)} onMove={() => moveItem(kind, item)} />
        </div>
        <div className="mx-auto mb-2 flex h-14 w-16 items-center justify-center rounded-lg bg-orange-100 text-2xl dark:bg-slate-700">{icon}</div>
        <p className="truncate font-medium">{item.name}</p><p className="text-slate-400">{item.size}</p>
      </div>
    )
  }
  function Row({ item, kind, icon }) {
    return (
      <div onClick={() => setSelected({ kind, item })} className="flex cursor-pointer items-center gap-3 border-b border-slate-100 py-2 text-sm dark:border-slate-800">
        <input type="checkbox" checked={checked.includes(item.id)} onChange={(e) => { e.stopPropagation(); toggleChecked(item.id) }} onClick={(e) => e.stopPropagation()} />
        <span className="min-w-0 truncate">{icon} {item.name}</span>
        <span className="ml-auto hidden text-xs text-slate-400 sm:inline">{item.modified}</span>
        <span className="w-16 text-right text-xs text-slate-400">{item.size}</span>
        <ItemMenu onRename={() => renameItem(kind, item)} onDelete={() => deleteItem(kind, item)} onShare={() => shareItem(item)} onDownload={() => downloadItem(item)} onCopy={() => copyItem(kind, item)} onMove={() => moveItem(kind, item)} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="min-w-0 flex-1 rounded-lg bg-white p-4 dark:bg-slate-900 sm:p-5">
        <div className="mb-5 flex gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 dark:bg-slate-800">
            <span className="text-slate-400">🔍</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-transparent py-2 text-sm outline-none" />
          </div>
          <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')} className="rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700">{view === 'grid' ? '☰' : '▦'}</button>
          <button onClick={startUpload} className="rounded-lg bg-brand px-4 text-sm text-white">⭱ Upload</button>
        </div>

        <h2 className="mb-3 flex items-center justify-between text-xl font-normal sm:text-2xl">Folders <button onClick={addFolder} className="text-sm text-brand">+ Add Folder</button></h2>
        <div className={view === 'grid' ? 'mb-6 grid grid-cols-3 gap-2 md:grid-cols-6' : 'mb-6'}>
          {folders.filter(match).map((f) => view === 'grid' ? <Tile key={f.id} item={f} kind="folder" icon="📁" /> : <Row key={f.id} item={f} kind="folder" icon="📁" />)}
        </div>

        <h2 className="mb-3 text-2xl font-normal">Files</h2>
        <div className={view === 'grid' ? 'grid grid-cols-3 gap-2 md:grid-cols-6' : ''}>
          {files.filter(match).map((f) => view === 'grid' ? <Tile key={f.id} item={f} kind="file" icon="📄" /> : <Row key={f.id} item={f} kind="file" icon="📄" />)}
        </div>
      </div>

      <aside className="w-full rounded-lg bg-white p-5 dark:bg-slate-900 lg:w-72">
        {selected ? (
          <>
            <div className="mx-auto mb-3 flex h-20 w-24 items-center justify-center rounded-lg bg-orange-100 text-4xl dark:bg-slate-700">{selected.kind === 'folder' ? '📁' : '📄'}</div>
            <h3 className="mb-4 text-center">{selected.item.name}</h3>
            <p className="mb-1 text-xs text-slate-400">INFO</p>
            <p className="mb-1 text-sm"><span className="text-slate-400">Type:</span> {selected.kind === 'folder' ? 'Folder' : selected.item.type}</p>
            <p className="mb-1 text-sm"><span className="text-slate-400">Size:</span> {selected.item.size}</p>
            <p className="mb-1 text-sm"><span className="text-slate-400">Owner:</span> ArtTemplate</p>
            <p className="mb-1 text-sm"><span className="text-slate-400">Location:</span> {selected.item.location || 'My Files'}</p>
            <p className="mb-1 text-sm"><span className="text-slate-400">Modified:</span> {selected.item.modified}</p>
            <p className="mb-4 text-sm"><span className="text-slate-400">Created:</span> {selected.item.created}</p>
            <p className="mb-1 text-xs text-slate-400">SETTINGS</p>
            {Object.keys(sharing).map((s) => (
              <label key={s} className="flex justify-between py-1 text-sm">{s}<input type="checkbox" checked={sharing[s]} onChange={() => setSharing({ ...sharing, [s]: !sharing[s] })} /></label>
            ))}
            <button onClick={() => deleteItem(selected.kind, selected.item)} className="mt-5 text-sm text-red-500">Delete</button>
          </>
        ) : <p className="text-sm text-slate-400">Select a file or folder to see its info.</p>}
        <div className="mt-6 text-xs text-slate-400">Storage 70%<div className="mt-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-1.5 w-[70%] rounded-full bg-green-500" /></div></div>
      </aside>

      {uploading && <UploadToast files={uploading} onClose={() => { clearInterval(uploadTimer.current); setUploading(null) }} />}
    </div>
  )
}
