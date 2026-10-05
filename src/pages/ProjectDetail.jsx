import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects.js'
import { people } from '../data/people.js'
import ProjectLogo from '../components/ui/ProjectLogo.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import { Avatar } from '../components/ui/Avatar.jsx'
import TimeLeft from '../components/projects/TimeLeft.jsx'

const startItems = ['Create wireframes', 'UI / UX design development', 'Layout design', 'Functional programming', 'Testing for possible errors', 'Final debugging applications']

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === Number(id))

  const [status, setStatus] = useState(project ? project.status : 'Started')
  const [done, setDone] = useState([0, 1, 2])             // indexes of checked items
  const [comments, setComments] = useState([{ name: 'Jane Wilson', time: '5 min ago', text: 'Hi Cody, any progress on the project?' }])
  const [newComment, setNewComment] = useState('')

  if (!project) return <p>Project not found. <Link to="/projects" className="text-brand">Back</Link></p>

  const percent = Math.round((done.length / startItems.length) * 100)

  function toggleItem(i) {
    setDone(done.includes(i) ? done.filter((d) => d !== i) : [...done, i])
  }
  function addComment() {
    if (!newComment.trim()) return
    setComments([{ name: 'Shane Black', time: 'just now', text: newComment }, ...comments])
    setNewComment('')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="min-w-0 rounded-lg bg-white p-4 dark:bg-slate-900 sm:p-6">
        <Link to="/projects" className="mb-4 block text-xs text-brand">← All projects</Link>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <ProjectLogo project={project} />
          <div><h1 className="text-xl">{project.name}</h1><p className="text-xs text-slate-400">{project.client}</p></div>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/projects/gantt" className="rounded-lg bg-white px-3 py-1.5 text-xs dark:bg-slate-900">📊 Gantt View</Link>
            <TimeLeft project={project} />
          </div>
        </div>

        <h3 className="mb-2 text-xs text-slate-400">DETAILS</h3>
        <div className="mb-6 flex flex-wrap gap-8 text-sm">
          <p><span className="text-slate-400">Budget</span><br />{project.budget}</p>
          <p><span className="text-slate-400">Start Date</span><br />17 Jun, 2020</p>
          <p><span className="text-slate-400">End Date</span><br />04 Jul, 2020</p>
        </div>

        <h3 className="mb-2 text-xs text-slate-400">DESCRIPTION</h3>
        <p className="mb-6 text-sm text-slate-500">{project.description}</p>

        <h3 className="mb-2 text-xs text-slate-400">CHECKLIST ({percent}%)</h3>
        <ProgressBar value={percent} />
        <ul className="my-4 space-y-2">
          {startItems.map((item, i) => (
            <li key={item} onClick={() => toggleItem(i)} className="flex cursor-pointer items-center gap-3 text-sm">
              <span className={done.includes(i) ? 'text-brand' : 'text-slate-300'}>{done.includes(i) ? '✔' : '○'}</span>
              <span className={done.includes(i) ? 'text-slate-400 line-through' : ''}>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="mb-2 mt-8 border-b border-slate-100 pb-2 text-sm text-brand dark:border-slate-800">COMMENTS</h3>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add Comment..."
          className="w-full rounded-lg border border-slate-200 bg-transparent p-3 text-sm outline-none dark:border-slate-700" />
        <button onClick={addComment} className="mb-4 rounded bg-brand px-3 py-1 text-xs text-white">Comment</button>
        {comments.map((c, i) => (
          <div key={i} className="mb-3 flex gap-3">
            <Avatar name={c.name} />
            <div className="text-sm"><b className="font-medium">{c.name}</b> <span className="text-xs text-slate-400">{c.time}</span><p>{c.text}</p></div>
          </div>
        ))}
      </div>

      <div className="space-y-6 rounded-lg bg-white p-5 dark:bg-slate-900">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm dark:border-slate-700">
          <option>Started</option><option>On Hold</option><option>Completed</option>
        </select>
        <div>
          <h3 className="mb-3 text-xs text-slate-400">MEMBERS</h3>
          {people.map((p) => (
            <div key={p.name} className="mb-3 flex items-center gap-3">
              <Avatar name={p.name} size="h-9 w-9" />
              <div className="text-sm">{p.name}<br /><span className="text-xs text-slate-400">{p.role}</span></div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-3 text-xs text-slate-400">FILES</h3>
          {['Wireframe UI Kit.zip', 'Brand Styles Guide.pdf', 'Picture 01.png'].map((f) => <p key={f} className="mb-2 text-sm">{f}</p>)}
        </div>
      </div>
    </div>
  )
}
