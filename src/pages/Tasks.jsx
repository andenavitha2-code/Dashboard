import { useState } from 'react'
import { initialTasks, taskColumns as initialColumns, taskLabels as initialLabels } from '../data/work.js'
import { Avatar, AvatarGroup } from '../components/ui/Avatar.jsx'
import TaskCard from '../components/tasks/TaskCard.jsx'
import TaskDetailPanel from '../components/tasks/TaskDetailPanel.jsx'
import TaskFilterDrawer from '../components/tasks/TaskFilterDrawer.jsx'
import ColumnMenu from '../components/tasks/ColumnMenu.jsx'
import AddMenu from '../components/tasks/AddMenu.jsx'
import ProjectSwitcher from '../components/tasks/ProjectSwitcher.jsx'

const emptyTask = (column) => ({
  id: Date.now(), title: '', description: '', column, date: 'Jun 17', labels: [], assignees: [], createdBy: 'Shane Black',
  watchers: 1, checklist: [], attachmentFiles: [], commentsList: [], dueDate: '', dueTime: '',
})

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [columns, setColumns] = useState(initialColumns)
  const [labels, setLabels] = useState(initialLabels)
  const [project, setProject] = useState('Design Plans')
  const [view, setView] = useState('board')              // 'board' or 'list'
  const [openId, setOpenId] = useState(null)
  const [addingIn, setAddingIn] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({ search: '', labels: [], member: '', due: 'Due anytime', status: '' })
  const [collapsed, setCollapsed] = useState([])          // collapsed column ids in list view
  const [extraMembers, setExtraMembers] = useState([])  // people added with the + next to the avatars

  const openTask = tasks.find((t) => t.id === openId)

  let visible = tasks.filter((t) => !t.archived)
  if (filters.search) visible = visible.filter((t) => t.title.toLowerCase().includes(filters.search.toLowerCase()))
  if (filters.labels.length) visible = visible.filter((t) => t.labels.some((l) => filters.labels.includes(l)))
  if (filters.member) visible = visible.filter((t) => t.assignees.includes(filters.member))
  if (filters.status === 'Completed') visible = visible.filter((t) => t.column === 'completed')
  if (filters.status === 'Incomplete') visible = visible.filter((t) => t.column !== 'completed')

  function updateTask(id, changes) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)))
  }
  function updateMany(ids, changes) {
    setTasks((all) => all.map((t) => (ids.includes(t.id) ? { ...t, ...changes } : t)))
  }
  function sortColumn(colId) {
    const sorted = tasks.filter((t) => t.column === colId).sort((a, b) => a.title.localeCompare(b.title))
    setTasks([...tasks.filter((t) => t.column !== colId), ...sorted])
  }
  function moveColumn(colId) {
    const i = columns.findIndex((c) => c.id === colId)
    const j = i === columns.length - 1 ? i - 1 : i + 1
    if (j < 0) return
    const next = [...columns]
    ;[next[i], next[j]] = [next[j], next[i]]
    setColumns(next)
  }
  function addMember() {
    const name = window.prompt('Add team member (name)')
    if (name && name.trim()) setExtraMembers([...extraMembers, name.trim()])
  }
  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id))
    setOpenId(null)
  }
  function addTask(columnId) {
    if (!newTitle.trim()) return
    const task = { ...emptyTask(columnId), title: newTitle }
    setTasks([...tasks, task])
    setNewTitle('')
    setAddingIn('')
  }
  function toggleCollapsed(id) {
    setCollapsed(collapsed.includes(id) ? collapsed.filter((c) => c !== id) : [...collapsed, id])
  }
  function moveTask(task, direction) {
    const ids = columns.map((c) => c.id)
    const newIndex = ids.indexOf(task.column) + direction
    if (newIndex >= 0 && newIndex < ids.length) updateTask(task.id, { column: ids[newIndex] })
  }

  const allAssignees = [...new Set(tasks.flatMap((t) => t.assignees))]

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <ProjectSwitcher active={project} onSelect={setProject} />
          <AvatarGroup names={[...allAssignees, ...extraMembers].slice(0, 4)} />
          <button onClick={addMember} className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400">+</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setView(view === 'board' ? 'list' : 'board')} className="rounded-lg bg-white px-3 py-2 text-sm dark:bg-slate-900" title="Toggle view">
            {view === 'board' ? '☰' : '▦'}
          </button>
          <button onClick={() => setShowFilter(true)} className="rounded-lg bg-white px-3 py-2 text-sm dark:bg-slate-900" title="Filter">⚙</button>
          <AddMenu onAddTask={() => setAddingIn(columns[0].id)} />
        </div>
      </div>

      {view === 'board' ? (
        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((col) => {
            const colTasks = visible.filter((t) => t.column === col.id)
            return (
              <div key={col.id}>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="mb-2 h-1 w-10 rounded-full" style={{ backgroundColor: col.color }} />
                    <span className="text-sm font-medium uppercase tracking-wide">{col.name}</span>{' '}
                    <span className="rounded bg-slate-100 px-1.5 text-xs text-slate-500 dark:bg-slate-800">{colTasks.length}</span>
                  </div>
                  <ColumnMenu
                    onComplete={() => updateMany(colTasks.map((t) => t.id), { column: 'completed' })}
                    onArchive={() => updateMany(colTasks.map((t) => t.id), { archived: true })}
                    onMove={() => moveColumn(col.id)}
                    onSort={() => sortColumn(col.id)}
                    onDelete={() => setTasks(tasks.filter((t) => t.column !== col.id))}
                    onRecolor={(color) => setColumns(columns.map((c) => (c.id === col.id ? { ...c, color } : c)))}
                  />
                </div>
                <div className="space-y-3">
                  {colTasks.map((task) => <TaskCard key={task.id} task={task} onOpen={(t) => setOpenId(t.id)} />)}
                  {addingIn === col.id ? (
                    <div className="flex gap-2">
                      <input autoFocus value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask(col.id)}
                        placeholder="Task title" className="flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700" />
                      <button onClick={() => addTask(col.id)} className="rounded-lg bg-brand px-3 text-white">Add</button>
                    </div>
                  ) : (
                    <button onClick={() => setAddingIn(col.id)} className="mx-auto block h-8 w-8 rounded-full bg-brand text-white">+</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-5">
          {columns.map((col) => {
            const colTasks = visible.filter((t) => t.column === col.id)
            const isCollapsed = collapsed.includes(col.id)
            return (
              <div key={col.id} className="rounded-lg bg-white p-4 dark:bg-slate-900">
                <div className="mb-2 flex items-center justify-between">
                  <button onClick={() => toggleCollapsed(col.id)} className="flex items-center gap-2 font-medium">
                    <span>{isCollapsed ? '›' : '⌄'}</span> {col.name} <span className="text-slate-400">({colTasks.length})</span>
                  </button>
                  <ColumnMenu
                    onComplete={() => updateMany(colTasks.map((t) => t.id), { column: 'completed' })}
                    onArchive={() => updateMany(colTasks.map((t) => t.id), { archived: true })}
                    onMove={() => moveColumn(col.id)}
                    onSort={() => sortColumn(col.id)}
                    onDelete={() => setTasks(tasks.filter((t) => t.column !== col.id))}
                    onRecolor={(color) => setColumns(columns.map((c) => (c.id === col.id ? { ...c, color } : c)))}
                  />
                </div>
                {!isCollapsed && (
                  <>
                    {colTasks.map((task) => (
                      <div key={task.id} onClick={() => setOpenId(task.id)}
                        className="flex cursor-pointer items-center gap-3 border-t border-slate-50 py-3 text-sm dark:border-slate-800">
                        <button onClick={(e) => { e.stopPropagation(); updateTask(task.id, { column: task.column === 'completed' ? 'todo' : 'completed' }) }}
                          className={`h-4 w-4 shrink-0 rounded-full border ${task.column === 'completed' ? 'border-brand bg-brand text-white' : 'border-slate-300'}`}>
                          {task.column === 'completed' && '✓'}
                        </button>
                        <span className={`min-w-0 flex-1 truncate ${task.column === 'completed' ? 'text-slate-400 line-through' : ''}`}>{task.title}</span>
                        {task.checklist.length > 0 && <span className="text-xs text-slate-400">{task.checklist.filter((c) => c.done).length}/{task.checklist.length}</span>}
                        <span className="flex gap-1">{task.labels.map((l) => <span key={l} className="h-2 w-2 rounded-full" style={{ backgroundColor: (labels.find((x) => x.name === l) || {}).swatch }} />)}</span>
                        <span className="hidden w-14 shrink-0 text-xs text-slate-400 sm:inline">📅 {task.date}</span>
                        <AvatarGroup names={task.assignees} />
                      </div>
                    ))}
                    <button onClick={() => setAddingIn(col.id)} className="mt-2 text-sm text-brand">+ Add Task</button>
                    {addingIn === col.id && (
                      <div className="mt-2 flex gap-2">
                        <input autoFocus value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask(col.id)}
                          placeholder="Task title" className="flex-1 rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700" />
                        <button onClick={() => addTask(col.id)} className="rounded-lg bg-brand px-3 text-white">Add</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}

      {openTask && (
        <TaskDetailPanel task={openTask} onClose={() => setOpenId(null)}
          onChange={(changes) => updateTask(openTask.id, changes)} onDelete={() => deleteTask(openTask.id)}
          allLabels={labels} onLabelsChange={setLabels} />
      )}

      {showFilter && <TaskFilterDrawer filters={filters} onClose={() => setShowFilter(false)} onApply={(f) => { setFilters(f); setShowFilter(false) }} />}
    </div>
  )
}
