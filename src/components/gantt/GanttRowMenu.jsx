import { useState } from 'react'

const colors = ['#f87171', '#2dd4bf', '#facc15', '#15803d', '#38bdf8', '#22c55e', '#a3e635', '#a78bfa', '#f472b6', '#e5e7eb']

export default function GanttRowMenu({ onEditTitle, onAddSubtask, onAddMember, onDuplicate, onDelete, onRecolor }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open) }} className="px-1 text-slate-400">⋮</button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={(e) => { e.stopPropagation(); setOpen(false) }} />
          <div className="absolute left-0 top-6 z-30 w-48 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { setOpen(false); onEditTitle() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">✎ Edit Title</button>
            <button onClick={() => { setOpen(false); onAddSubtask() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">📋 Add Subtask</button>
            <button onClick={() => { setOpen(false); onAddMember() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">👤 Add Member</button>
            <button onClick={() => { setOpen(false); onDuplicate() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">⧉ Duplicate</button>
            <button onClick={() => { setOpen(false); onDelete() }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">🗑 Delete Task</button>
            <div className="mt-2 grid grid-cols-5 gap-2 border-t border-slate-100 p-2 pt-3 dark:border-slate-700">
              {colors.map((c) => <button key={c} onClick={() => { onRecolor(c); setOpen(false) }} className="h-5 w-5 rounded-full border border-slate-200" style={{ backgroundColor: c }} />)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
