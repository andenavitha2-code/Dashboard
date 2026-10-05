import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DonutChart from '../../components/charts/DonutChart.jsx'
import BarChart from '../../components/charts/BarChart.jsx'
import Heatmap from '../../components/charts/Heatmap.jsx'
import MiniCalendar from '../../components/dashboard/MiniCalendar.jsx'
import { Avatar } from '../../components/ui/Avatar.jsx'
import { ProfileAvatar } from '../../components/ui/ProfileAvatar.jsx'
import MoreMenu from '../../components/ui/MoreMenu.jsx'
import * as d from '../../data/dashboard.js'

const card = 'rounded-lg bg-white p-5 dark:bg-slate-900'
const ranges = ['Day', 'Week', 'Month']

export default function TasksOverview() {
  const [range, setRange] = useState('Day')
  const navigate = useNavigate()
  const [removed, setRemoved] = useState([])           // active tasks removed with the ••• menu
  const [doneMap, setDoneMap] = useState(() => Object.fromEntries(d.activeTasks.map((t) => [t.text, !!t.done])))

  return (
    <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-normal">Overview</h1>
          <button onClick={() => navigate('/tasks')} className="rounded-lg bg-brand px-4 py-2 text-sm text-white">+ Add Task</button>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-[1fr_1fr_2fr]">
          <div className="space-y-5">
            <div className={card}><p className="text-xl font-medium">{d.taskStats[0].value}</p><p className="text-xs text-slate-400">{d.taskStats[0].label}</p></div>
            <div className={card}><p className="text-xl font-medium">{d.taskStats[2].value}</p><p className="text-xs text-slate-400">{d.taskStats[2].label}</p></div>
          </div>
          <div className="space-y-5">
            <div className={card}><p className="text-xl font-medium">{d.taskStats[1].value}</p><p className="text-xs text-slate-400">{d.taskStats[1].label}</p></div>
            <div className={card}><p className="text-xl font-medium">{d.taskStats[3].value}</p><p className="text-xs text-slate-400">{d.taskStats[3].label}</p></div>
          </div>
          <div className={card + ' col-span-2 sm:col-span-1'}><h3 className="mb-3 font-medium">Statistics</h3><BarChart data={d.weekBars} /></div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className={card}>
            <div className="mb-3 flex items-center justify-between"><h3 className="font-medium">Projects</h3><MoreMenu title="Projects" /></div>
            <DonutChart percent={55} value="830" label="Projects" />
            <div className="mt-3 flex justify-around text-xs"><span>420 Ongoing</span><span>210 Hold</span><span>200 Done</span></div>
          </div>
          <div className={card}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium">Active Tasks</h3>
              <div className="flex overflow-hidden rounded-lg bg-slate-100 text-[10px] dark:bg-slate-800">
                {ranges.map((r) => <button key={r} onClick={() => setRange(r)} className={`px-2 py-1 ${range === r ? 'bg-brand text-white' : 'text-slate-500'}`}>{r}</button>)}
              </div>
            </div>
            {d.activeTasks.filter((t) => !removed.includes(t.text)).map((t) => (
              <div key={t.text} className={`mb-2 flex items-center gap-2 border-l-4 py-1.5 pl-2 text-xs ${t.color}`}>
                <input type="checkbox" checked={doneMap[t.text]} onChange={() => setDoneMap({ ...doneMap, [t.text]: !doneMap[t.text] })} />
                <span className={'flex-1 ' + (doneMap[t.text] ? 'text-slate-400 line-through' : '')}>{t.text}</span>
                <MoreMenu items={[{ label: 'Remove task', onClick: () => setRemoved([...removed, t.text]) }]} />
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h3 className="mb-1 font-medium">Posting Tasks</h3>
          <p className="mb-3 text-xs text-slate-400">Immediate tasks: <span className="underline">Wensday at 10AM</span> / <span className="underline">Wensday at 4PM [+Important]</span></p>
          <Heatmap active={d.postingActive} />
        </div>
      </div>

      <div className="space-y-5">
        <div className={card + ' flex items-center gap-3'}>
          <ProfileAvatar size="h-10 w-10" />
          <div className="flex-1 text-sm">ArtTemplate<br /><span className="text-[11px] text-slate-400">example@mail.com</span></div>
          <MoreMenu label="⚙" items={[{ label: 'Edit profile', onClick: () => navigate('/dashboard/analytics') }]} />
        </div>
        <div className={card}><MiniCalendar /></div>
        <div className={card}>
          <h3 className="mb-3 font-medium">Recent Activity</h3>
          {d.recentActivity.map((group) => (
            <div key={group.date} className="mb-4">
              <p className="mb-2 text-xs text-slate-400">{group.date}</p>
              {group.items.map((a) => (
                <div key={a.text} className="mb-2 flex items-start gap-2 text-xs">
                  <Avatar name={a.name} size="h-7 w-7" />
                  <div><span className="text-slate-400">{a.time}</span> {a.name} — {a.text}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
