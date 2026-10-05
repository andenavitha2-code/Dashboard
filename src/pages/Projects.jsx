import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects as projectData } from '../data/projects.js'
import Tabs from '../components/ui/Tabs.jsx'
import ProjectLogo from '../components/ui/ProjectLogo.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import { Avatar } from '../components/ui/Avatar.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import ProjectModal from '../components/projects/ProjectModal.jsx'
import FilterDrawer from '../components/projects/FilterDrawer.jsx'
import TimeLeft from '../components/projects/TimeLeft.jsx'

export default function Projects() {
  const [projects, setProjects] = useState(projectData)
  const [tab, setTab] = useState('All')
  const [view, setView] = useState('grid')            // 'grid' or 'list'
  const [filters, setFilters] = useState({ search: '', member: '', status: '' })
  const [showFilter, setShowFilter] = useState(false)
  const [modal, setModal] = useState(null)            // null = closed, 'add', or a project to edit

  // 1. filter by tab, 2. filter by drawer values
  const visible = projects.filter((p) => {
    if (tab !== 'All' && p.status !== tab) return false
    if (filters.status && p.status !== filters.status) return false
    if (filters.member && !p.members.includes(filters.member)) return false
    if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const count = (status) => projects.filter((p) => p.status === status).length
  const tabs = [
    { label: 'All', count: projects.length },
    { label: 'Started', count: count('Started') },
    { label: 'On Hold', count: count('On Hold') },
    { label: 'Completed', count: count('Completed') },
  ]

  function saveProject(form) {
    if (modal === 'add') {
      setProjects([{ ...form, id: Date.now(), progress: 0, timeLeft: '1 week left', urgent: false, createdBy: 'Shane Black', color: '#22943c', status: 'Started' }, ...projects])
    } else {
      setProjects(projects.map((p) => (p.id === form.id ? form : p)))
    }
    setModal(null)
  }
  function deleteProject(id) {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-normal sm:text-3xl">Projects</h1>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setShowFilter(true)} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900">⚙</button>
          <Link to="/projects/gantt" className="rounded-lg bg-white px-4 py-2 text-sm dark:bg-slate-900">📊 Gantt View</Link>
          <button onClick={() => setModal('add')} className="rounded-lg bg-brand px-4 py-2 text-sm text-white">+ Add Project</button>
        </div>
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div className="min-w-0 flex-1"><Tabs tabs={tabs} active={tab} onChange={setTab} /></div>
        <div className="flex gap-3 border-b border-slate-200 pb-3 pl-4 dark:border-slate-800">
          <button onClick={() => setView('list')} className={view === 'list' ? 'text-brand' : 'text-slate-400'}>☰</button>
          <button onClick={() => setView('grid')} className={view === 'grid' ? 'text-brand' : 'text-slate-400'}>▦</button>
        </div>
      </div>

      {visible.length === 0 && <p className="py-16 text-center text-slate-400">No projects found.</p>}

      {view === 'grid' ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} onEdit={setModal} onDelete={deleteProject} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white p-4 dark:bg-slate-900">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs text-slate-400">
              <tr><th className="p-3">PROJECT NAME</th><th>CREATED BY</th><th>PROGRESS</th><th>DEADLINE</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="p-3">
                    <Link to={`/projects/${p.id}`} className="flex items-center gap-3">
                      <ProjectLogo project={p} size="h-9 w-9" />
                      <span>{p.name}<br /><span className="text-xs text-slate-400">{p.client}</span></span>
                    </Link>
                  </td>
                  <td><div className="flex items-center gap-2"><Avatar name={p.createdBy} /><span>{p.createdBy}<br /><span className="text-xs text-slate-400">Project Manager</span></span></div></td>
                  <td className="w-64"><div className="flex items-center gap-2"><ProgressBar value={p.progress} /><span className="text-xs text-slate-400">{p.progress}%</span></div></td>
                  <td><TimeLeft project={p} /></td>
                  <td><button onClick={() => setModal(p)} className="text-slate-400">⋮</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-slate-400">Showing 1 - {visible.length} of {projects.length}</p>
        </div>
      )}

      {modal && <ProjectModal project={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={saveProject} />}
      {showFilter && <FilterDrawer filters={filters} onClose={() => setShowFilter(false)}
        onApply={(f) => { setFilters(f); setShowFilter(false) }} />}
    </div>
  )
}
