import { Avatar } from '../ui/Avatar.jsx'

export default function GanttTooltip({ row, style, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute z-40 w-56 rounded-xl bg-white p-4 text-sm shadow-xl dark:bg-slate-800" style={style} onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center gap-2 font-medium"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: row.color }} />{row.name}</div>
        <p className="mb-2 flex items-center gap-2 text-xs text-slate-400">📅 {row.dateRange}</p>
        <p className="mb-3 flex items-center gap-2 text-xs text-slate-400">📋 Tasks: {row.doneCount}/{row.taskCount}</p>
        <div className="flex items-center gap-1">
          {(row.members || []).map((m) => <Avatar key={m} name={m} size="h-7 w-7" />)}
        </div>
      </div>
    </>
  )
}
