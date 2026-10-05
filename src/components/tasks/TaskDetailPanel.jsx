import { useRef, useState } from 'react'
import { taskLabels } from '../../data/work.js'
import { Avatar } from '../ui/Avatar.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'
import AssignPicker from './AssignPicker.jsx'
import DueDatePicker from './DueDatePicker.jsx'
import LabelPicker from './LabelPicker.jsx'
import LabelsManageModal from './LabelsManageModal.jsx'

function swatchOf(name) {
  return (taskLabels.find((l) => l.name === name) || {}).swatch || '#94a3b8'
}
function fmtDate(key) {
  if (!key) return 'Set due date'
  return new Date(key + 'T00:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function TaskDetailPanel({ task, onClose, onChange, onDelete, allLabels, onLabelsChange }) {
  const [tab, setTab] = useState('Comments')
  const [showAssign, setShowAssign] = useState(false)
  const [showDue, setShowDue] = useState(false)
  const [showLabels, setShowLabels] = useState(false)
  const [manageLabels, setManageLabels] = useState(false)
  const [newChecklistItem, setNewChecklistItem] = useState('')
  const [newComment, setNewComment] = useState('')
  const fileInput = useRef(null)

  const done = task.checklist.filter((c) => c.done).length
  const percent = task.checklist.length ? Math.round((done / task.checklist.length) * 100) : 0
  const isComplete = task.column === 'completed'

  function toggleAssignee(name) {
    onChange({ assignees: task.assignees.includes(name) ? task.assignees.filter((a) => a !== name) : [...task.assignees, name] })
  }
  function toggleLabel(name) {
    onChange({ labels: task.labels.includes(name) ? task.labels.filter((l) => l !== name) : [...task.labels, name] })
  }
  function toggleChecklistItem(i) {
    onChange({ checklist: task.checklist.map((c, idx) => (idx === i ? { ...c, done: !c.done } : c)) })
  }
  function addAttachment(e) {
    const f = e.target.files[0]
    if (!f) return
    const size = f.size > 1048576 ? (f.size / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(f.size / 1024)) + ' KB'
    onChange({ attachmentFiles: [...task.attachmentFiles, { name: f.name, size, date: new Date().toLocaleDateString('en', { month: 'short', day: 'numeric' }) }] })
    e.target.value = ''
  }
  function downloadFile(f) {
    const url = URL.createObjectURL(new Blob([`Demo file: ${f.name}\n`], { type: 'text/plain' }))
    const a = document.createElement('a')
    a.href = url
    a.download = f.name
    a.click()
    URL.revokeObjectURL(url)
  }
  function addChecklistItem() {
    if (!newChecklistItem.trim()) return
    onChange({ checklist: [...task.checklist, { text: newChecklistItem, done: false }] })
    setNewChecklistItem('')
  }
  function removeChecklistItem(i) {
    onChange({ checklist: task.checklist.filter((_, idx) => idx !== i) })
  }
  function removeAttachment(i) {
    onChange({ attachmentFiles: task.attachmentFiles.filter((_, idx) => idx !== i) })
  }
  function addComment() {
    if (!newComment.trim()) return
    onChange({ commentsList: [...task.commentsList, { name: 'You', time: 'just now', text: newComment }] })
    setNewComment('')
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white p-4 shadow-xl sm:p-6 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => onChange({ column: isComplete ? 'todo' : 'completed' })}
            className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-white ${isComplete ? 'bg-slate-400' : 'bg-brand'}`}>
            ✓ {isComplete ? 'Completed' : 'Complete'}
          </button>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-sm">👁 {task.watchers} ▾</span>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} title="Copy link">🔗</button>
            <button onClick={() => { if (window.confirm('Delete this task?')) onDelete() }} title="Delete task">•••</button>
            <button onClick={onClose}>×</button>
          </div>
        </div>

        <h2 className="mb-5 text-2xl font-medium">{task.title}</h2>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div className="relative">
            <p className="mb-2 text-xs text-slate-400">ASSIGNED TO</p>
            <div className="flex items-center gap-1">
              {task.assignees.map((a) => <Avatar key={a} name={a} size="h-8 w-8" />)}
              <button onClick={() => setShowAssign(true)} className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400">+</button>
            </div>
            {showAssign && <AssignPicker assigned={task.assignees} onToggle={toggleAssignee} onClose={() => setShowAssign(false)} />}
          </div>
          <div>
            <p className="mb-2 text-xs text-slate-400">CREATED BY</p>
            <div className="flex items-center gap-2"><Avatar name={task.createdBy} size="h-8 w-8" /><span className="text-sm">{task.createdBy}</span></div>
          </div>
        </div>

        <div className="relative mb-5">
          <p className="mb-2 text-xs text-slate-400">LABELS</p>
          <div className="flex flex-wrap items-center gap-2">
            {task.labels.map((l) => <span key={l} className="rounded px-2 py-1 text-xs text-white" style={{ backgroundColor: swatchOf(l) }}>{l}</span>)}
            <button onClick={() => setShowLabels(true)} className="text-slate-400">+</button>
          </div>
          {showLabels && <LabelPicker active={task.labels} onToggle={toggleLabel} onManage={() => { setShowLabels(false); setManageLabels(true) }} onClose={() => setShowLabels(false)} />}
        </div>

        <div className="relative mb-5">
          <p className="mb-2 text-xs text-slate-400">DUE DATE</p>
          <button onClick={() => setShowDue(true)} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
            📅 {fmtDate(task.dueDate)}{task.dueTime ? `, ${task.dueTime}` : ''} <span className="text-slate-400">▾</span>
          </button>
          {showDue && <DueDatePicker value={task.dueDate} time={task.dueTime}
            onChange={(date, time) => { onChange({ dueDate: date, dueTime: time }); setShowDue(false) }}
            onClear={() => onChange({ dueDate: '', dueTime: '' })} onClose={() => setShowDue(false)} />}
        </div>

        <div className="mb-5">
          <p className="mb-2 text-xs text-slate-400">DESCRIPTION</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{task.description || 'No description.'}</p>
        </div>

        <div className="mb-5">
          <p className="mb-2 text-xs text-slate-400">CHECKLIST ({percent}%)</p>
          <ProgressBar value={percent} />
          <div className="mt-3 space-y-1">
            {task.checklist.map((item, i) => (
              <div key={i} className="group flex items-center gap-2 text-sm">
                <button onClick={() => toggleChecklistItem(i)} className={item.done ? 'text-brand' : 'text-slate-300'}>{item.done ? '✔' : '○'}</button>
                <span className={`flex-1 ${item.done ? 'text-slate-400 line-through' : ''}`}>{item.text}</span>
                <span className="hidden gap-2 text-slate-400 group-hover:flex">
                  <span>⠿</span><button onClick={() => removeChecklistItem(i)}>🗑</button>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input value={newChecklistItem} onChange={(e) => setNewChecklistItem(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addChecklistItem()}
              placeholder="+ Add Checklist Item" className="flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-1.5 text-sm outline-none dark:border-slate-700" />
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-2 text-xs text-slate-400">ATTACHMENTS</p>
          {task.attachmentFiles.map((f, i) => (
            <div key={f.name} className="mb-2 flex items-center gap-3 text-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-slate-100 dark:bg-slate-800">📄</span>
              <div className="min-w-0 flex-1"><p className="truncate">{f.name}</p><p className="text-xs text-slate-400">Uploaded on {f.date} &bull; {f.size}</p></div>
              <button onClick={() => downloadFile(f)} className="text-slate-400" title="Download">⭳</button>
              <button onClick={() => removeAttachment(i)} className="text-slate-400">🗑</button>
            </div>
          ))}
          <button onClick={() => fileInput.current.click()} className="text-sm text-brand">+ Add Attachment</button>
          <input ref={fileInput} type="file" className="hidden" onChange={addAttachment} />
        </div>

        <div className="mb-3 flex gap-5 border-b border-slate-100 text-sm dark:border-slate-800">
          {['Comments', 'Activity'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-2 ${tab === t ? 'border-brand text-brand' : 'border-transparent text-slate-400'}`}>{t}</button>
          ))}
        </div>

        {tab === 'Comments' ? (
          <>
            <div className="mb-4 flex items-start gap-2">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add Comment..." rows="2"
                className="flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700" />
            </div>
            <button onClick={addComment} className="mb-4 rounded-lg bg-brand px-4 py-1.5 text-xs text-white">Comment</button>
            {task.commentsList.map((c, i) => (
              <div key={i} className="mb-3 flex gap-3">
                <Avatar name={c.name} size="h-8 w-8" />
                <div className="text-sm"><b className="font-medium">{c.name}</b> <span className="text-xs text-slate-400">{c.time}</span>
                  <p className="whitespace-pre-line text-slate-600 dark:text-slate-300">{c.text}</p>
                  {c.images && (
                    <div className="mt-1 flex gap-1">
                      {Array.from({ length: Math.min(3, c.images) }, (_, g) => <div key={g} className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-300 to-emerald-400" />)}
                      {c.images > 3 && <span className="flex h-12 items-center text-xs text-slate-400">+{c.images - 3}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-sm text-slate-400">No activity yet.</p>
        )}

        <button onClick={onDelete} className="mt-6 text-sm text-red-500">Delete Task</button>
      </div>

      {manageLabels && <LabelsManageModal labels={allLabels} onClose={() => setManageLabels(false)} onChange={onLabelsChange} />}
    </div>
  )
}
