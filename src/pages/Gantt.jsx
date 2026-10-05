import { useRef, useState } from 'react'
import { initialGanttGroups, ganttDependency } from '../data/gantt.js'
import ProjectSwitcher from '../components/tasks/ProjectSwitcher.jsx'
import GanttRowMenu from '../components/gantt/GanttRowMenu.jsx'
import GanttTooltip from '../components/gantt/GanttTooltip.jsx'

const firstDay = 3
const dayCount = 14
const days = Array.from({ length: dayCount }, (_, i) => firstDay + i)   // 3 ... 16
const dayNames = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
const TODAY = 8

function Bar({ item, color, width, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`absolute h-7 overflow-hidden rounded text-xs ${selected ? 'ring-2 ring-slate-500' : ''}`}
      style={{ left: (item.start - firstDay) * width, width: (item.end - item.start) * width, backgroundColor: color }}>
      <div className="absolute inset-y-0 left-0 bg-black/10" style={{ width: `${item.progress}%` }} />
      <span className="relative flex h-full items-center justify-between px-3 text-slate-800"><span className="truncate">{item.name}</span><span>{item.progress}%</span></span>
      {selected && (
        <>
          <span className="absolute inset-y-0 left-0 w-1 bg-slate-600" /><span className="absolute inset-y-0 right-0 w-1 bg-slate-600" />
        </>
      )}
    </button>
  )
}

export default function Gantt() {
  const [project, setProject] = useState('Design Plans')
  const [groups, setGroups] = useState(initialGanttGroups)
  const [openGroup, setOpenGroup] = useState('design')
  const [dayWidth, setDayWidth] = useState(70)
  const [selected, setSelected] = useState(null)       // row id with drag handles shown
  const [tooltipRow, setTooltipRow] = useState(null)    // row id showing the preview popover
  const [filterText, setFilterText] = useState('')      // name filter set from the ⚙ button
  const scrollRef = useRef(null)

  // flat list of rows so the left column and the chart bars line up 1:1
  const rows = []
  groups.filter((g) => g.name.toLowerCase().includes(filterText.toLowerCase())).forEach((g) => {
    rows.push({ ...g, isGroup: true })
    if (openGroup === g.id && g.tasks) g.tasks.forEach((t) => rows.push({ ...t, color: g.color, parent: g.id }))
  })
  const rowIndex = (id) => rows.findIndex((r) => r.id === id)

  function addList() {
    const name = window.prompt('List name')
    if (!name) return
    setGroups([...groups, { id: 'list-' + Date.now(), name, start: firstDay, end: firstDay + 3, progress: 0, color: '#e5e7eb', dateRange: '—', taskCount: 0, doneCount: 0, members: [] }])
  }
  function editTitle(id) {
    const name = window.prompt('New title', groups.find((g) => g.id === id)?.name)
    if (!name) return
    setGroups(groups.map((g) => (g.id === id ? { ...g, name } : g)))
  }
  function addSubtask(id) {
    const name = window.prompt('Subtask name')
    if (!name || !name.trim()) return
    setGroups(groups.map((g) => (g.id === id
      ? { ...g, tasks: [...(g.tasks || []), { id: 'task-' + Date.now(), name: name.trim(), start: g.start, end: Math.min(g.start + 3, firstDay + dayCount - 1), progress: 0 }], taskCount: g.taskCount + 1 }
      : g)))
    setOpenGroup(id)
  }
  function addMember(id) {
    const name = window.prompt('Member name')
    if (!name || !name.trim()) return
    setGroups(groups.map((g) => (g.id === id ? { ...g, members: [...(g.members || []), name.trim()] } : g)))
  }
  function filterRows() {
    const text = window.prompt('Filter by project name (empty to clear)', filterText)
    if (text !== null) setFilterText(text.trim())
  }
  function scrollToToday() {
    if (scrollRef.current) scrollRef.current.scrollTo({ left: Math.max(0, (TODAY - firstDay) * dayWidth - 80), behavior: 'smooth' })
  }
  function duplicate(id) {
    const g = groups.find((x) => x.id === id)
    setGroups([...groups, { ...g, id: g.id + '-copy-' + Date.now(), name: g.name + ' (copy)' }])
  }
  function remove(id) {
    setGroups(groups.filter((g) => g.id !== id))
  }
  function recolor(id, color) {
    setGroups(groups.map((g) => (g.id === id ? { ...g, color } : g)))
  }

  // dependency connector: from the end of one row to the start of another, drawn as an SVG path
  const fromIndex = rowIndex(ganttDependency.from)
  const toIndex = rowIndex(ganttDependency.to)
  const fromRow = rows[fromIndex]
  const toRow = rows[toIndex]

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <ProjectSwitcher active={project} onSelect={setProject} />
        <h2 className="text-lg">September <span className="text-sm text-slate-400">2020</span></h2>
        <div className="flex items-center gap-3">
          <button onClick={filterRows} className={`rounded-lg px-3 py-2 text-sm dark:bg-slate-900 ${filterText ? 'bg-lime-active' : 'bg-white'}`} title="Filter">⚙</button>
          <button onClick={addList} className="rounded-lg bg-brand px-4 py-2 text-sm text-white">+ Add Project</button>
        </div>
      </div>

      <div ref={scrollRef} className="flex overflow-x-auto rounded-lg bg-white dark:bg-slate-900">
        <div className="sticky left-0 z-10 w-40 shrink-0 border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 sm:w-56">
          <div className="flex h-16 items-center p-4 text-xs text-slate-400">PROJECT NAME</div>
          {rows.map((r) => (
            <div key={r.id} className={`group flex h-14 items-center justify-between px-4 text-sm ${r.isGroup ? '' : 'pl-8 text-slate-500'}`}>
              <button onClick={() => r.isGroup && r.tasks && setOpenGroup(openGroup === r.id ? '' : r.id)} className="truncate text-left">
                {r.isGroup && (r.tasks ? (openGroup === r.id ? '⌄ ' : '› ') : '')}{r.name}
              </button>
              {r.isGroup && (
                <span className="sm:opacity-0 sm:group-hover:opacity-100">
                  <GanttRowMenu
                    onEditTitle={() => editTitle(r.id)} onAddSubtask={() => addSubtask(r.id)} onAddMember={() => addMember(r.id)}
                    onDuplicate={() => duplicate(r.id)} onDelete={() => remove(r.id)} onRecolor={(c) => recolor(r.id, c)} />
                </span>
              )}
            </div>
          ))}
          <button onClick={addList} className="flex w-full items-center gap-1 px-4 py-3 text-left text-sm text-brand">+ Add List</button>
        </div>

        <div className="relative" style={{ width: days.length * dayWidth }}>
          <div className="relative flex h-16 border-b border-slate-100 dark:border-slate-800">
            {days.map((d) => (
              <div key={d} style={{ width: dayWidth }} className="flex flex-col items-center justify-center text-[10px] text-slate-400">
                <span>{dayNames[(d - 1) % 7]}</span>
                <span className={d === TODAY ? 'mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white' : 'mt-0.5 text-slate-700 dark:text-slate-300'}>{d}</span>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-y-0 bg-green-50/60 dark:bg-slate-800/40" style={{ left: (TODAY - firstDay) * dayWidth, width: dayWidth }} />
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 bg-green-50/40 dark:bg-slate-800/30" style={{ left: (TODAY - firstDay) * dayWidth, width: dayWidth }} />
            {rows.map((r) => (
              <div key={r.id} className="relative flex h-14 items-center border-t border-slate-50 dark:border-slate-800">
                <Bar item={r} color={r.color} width={dayWidth} selected={selected === r.id}
                  onClick={() => { setSelected(r.id); setTooltipRow(tooltipRow === r.id ? null : r.id) }} />
                {tooltipRow === r.id && (
                  <GanttTooltip row={r} onClose={() => setTooltipRow(null)}
                    style={{ left: (r.start - firstDay) * dayWidth, top: 36 }} />
                )}
              </div>
            ))}

            {fromRow && toRow && (
              <svg className="pointer-events-none absolute inset-0" style={{ width: days.length * dayWidth, height: rows.length * 56 }}>
                <path
                  d={`M ${(fromRow.end - firstDay) * dayWidth} ${fromIndex * 56 + 28}
                      L ${(fromRow.end - firstDay) * dayWidth + 16} ${fromIndex * 56 + 28}
                      L ${(fromRow.end - firstDay) * dayWidth + 16} ${toIndex * 56 + 28}
                      L ${(toRow.start - firstDay) * dayWidth} ${toIndex * 56 + 28}`}
                  fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow)" />
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker>
                </defs>
              </svg>
            )}
          </div>

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-100 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
            <button onClick={scrollToToday} className="rounded-lg bg-slate-100 px-4 py-1.5 dark:bg-slate-800">Today</button>
            <div className="flex items-center gap-2 text-slate-400">
              <button onClick={() => setDayWidth(Math.max(40, dayWidth - 10))} className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800">−</button>
              <span>Days</span>
              <button onClick={() => setDayWidth(Math.min(120, dayWidth + 10))} className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
