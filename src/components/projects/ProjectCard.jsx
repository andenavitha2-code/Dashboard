import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectLogo from '../ui/ProjectLogo.jsx'
import ProgressBar from '../ui/ProgressBar.jsx'
import { AvatarGroup } from '../ui/Avatar.jsx'
import TimeLeft from './TimeLeft.jsx'

export default function ProjectCard({ project, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative rounded-lg bg-white p-5 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <ProjectLogo project={project} />
        <Link to={`/projects/${project.id}`} className="min-w-0 flex-1">
          <h3 className="font-medium text-slate-800 dark:text-white">{project.name}</h3>
          <p className="text-xs text-slate-400">{project.client}</p>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-400">•••</button>
      </div>

      {menuOpen && (
        <div className="absolute right-4 top-12 z-10 w-44 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
          <button onClick={() => { setMenuOpen(false); onEdit(project) }} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Edit</button>
          <button onClick={() => { setMenuOpen(false); onEdit(project) }} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Add Member</button>
          <button onClick={() => { setMenuOpen(false); onEdit(project) }} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Add Due Date</button>
          <button onClick={() => { setMenuOpen(false); onDelete(project.id) }} className="block w-full rounded border-t border-slate-100 px-3 py-2 text-left text-red-400 dark:border-slate-700">Delete Project</button>
        </div>
      )}

      <p className="my-4 text-sm text-slate-500">{project.description}</p>
      <div className="mb-2 flex justify-between text-xs text-slate-400"><span>Progress</span><span>{project.progress}%</span></div>
      <ProgressBar value={project.progress} />
      <div className="mt-5 flex items-center justify-between">
        <TimeLeft project={project} />
        <AvatarGroup names={project.members} />
      </div>
    </div>
  )
}
