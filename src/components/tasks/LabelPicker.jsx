import { taskLabels } from '../../data/work.js'

export default function LabelPicker({ active, onToggle, onManage, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-20" onClick={onClose} />
      <div className="absolute left-0 top-7 z-30 w-48 rounded-xl bg-white p-3 text-sm shadow-lg dark:bg-slate-800">
        {taskLabels.map((l) => (
          <button key={l.name} type="button" onClick={() => onToggle(l.name)} className="mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.swatch }} />
            <span className="flex-1 text-xs">{l.name}</span>
            {active.includes(l.name) && <span className="text-brand">✓</span>}
          </button>
        ))}
        <button onClick={onManage} className="mt-1 block w-full rounded px-2 py-1.5 text-left text-xs text-brand hover:bg-slate-50 dark:hover:bg-slate-700">Manage Labels</button>
      </div>
    </>
  )
}
