import { taskLabels } from '../../data/work.js'
import { Avatar, AvatarGroup } from '../ui/Avatar.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'

function swatchOf(name) {
  return (taskLabels.find((l) => l.name === name) || {}).swatch || '#94a3b8'
}

export default function TaskCard({ task, onOpen }) {
  const done = task.checklist.filter((c) => c.done).length
  const percent = task.checklist.length ? Math.round((done / task.checklist.length) * 100) : null

  return (
    <button onClick={() => onOpen(task)} className="w-full rounded-lg bg-white p-4 text-left dark:bg-slate-900">
      {task.labels.length > 0 && (
        <div className="mb-2 flex gap-1">
          {task.labels.map((l) => <span key={l} className="h-1 w-6 rounded-full" style={{ backgroundColor: swatchOf(l) }} />)}
        </div>
      )}
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="font-medium">{task.title}</h3>
        <span className="flex shrink-0 items-center gap-1 text-xs text-slate-400">📅 {task.date}</span>
      </div>
      {task.description && <p className="mb-2 text-xs text-slate-500 line-clamp-2">{task.description}</p>}

      {task.image && <div className="mb-2 h-24 rounded-lg bg-gradient-to-br from-orange-400 via-rose-400 to-indigo-600" />}

      {percent !== null && (
        <div className="mb-2">
          <div className="mb-1 flex justify-between text-[10px] text-slate-400"><span>SUB-TASKS: {task.checklist.length}</span><span>{percent}%</span></div>
          <ProgressBar value={percent} />
        </div>
      )}

      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-3 text-xs text-slate-400">
          {task.attachmentFiles.length > 0 && <span>📎 {task.attachmentFiles.length}</span>}
          {task.commentsList.length > 0 && <span>💬 {task.commentsList.length}</span>}
        </div>
        <AvatarGroup names={task.assignees} />
      </div>
    </button>
  )
}
