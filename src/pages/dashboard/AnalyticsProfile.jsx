import { useState } from 'react'
import AreaChart from '../../components/charts/AreaChart.jsx'
import DonutChart from '../../components/charts/DonutChart.jsx'
import BarChart from '../../components/charts/BarChart.jsx'
import { Avatar } from '../../components/ui/Avatar.jsx'
import { ProfileAvatar } from '../../components/ui/ProfileAvatar.jsx'
import { DownloadButton, PeriodSelect } from '../../components/dashboard/DashboardTopBar.jsx'
import ChatDrawer from '../../components/dashboard/ChatDrawer.jsx'
import Modal from '../../components/ui/Modal.jsx'
import * as d from '../../data/dashboard.js'

const card = 'rounded-lg bg-white p-5 dark:bg-slate-900'
const tabs = ['Settings', 'Activity', 'Users']

export default function AnalyticsProfile() {
  const [tab, setTab] = useState('Settings')
  const [chatOpen, setChatOpen] = useState(false)
  const [profile, setProfile] = useState({ name: 'Felecia Brown', role: 'Project Manager' })
  const [editing, setEditing] = useState(null)          // form values while the Edit profile modal is open
  const [following, setFollowing] = useState([])         // names of people followed from the New Followers card

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-56">
        <div className="mx-auto w-fit"><ProfileAvatar size="h-28 w-28 !rounded-[28px]" /></div>
        <h2 className="mt-4 text-center text-sm font-medium">{profile.name}</h2>
        <p className="mb-4 mt-2 text-center text-xs text-slate-400">{profile.role}</p>
        <div className="mb-5 text-center"><button onClick={() => setEditing({ ...profile })} className="rounded-lg bg-brand-dark px-6 py-2 text-xs text-white">Edit profile</button></div>

        <h3 className="mb-2 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">INFO</h3>
        <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">EMAIL</span>example@mail.com</p>
        <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">PHONE</span>+123-4567-8800</p>
        <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">BIRTHDAY</span>17 March, 1995</p>
        <p className="mb-4 text-xs"><span className="block text-[10px] text-slate-400">LOCATION</span>New York, NY</p>

        <h3 className="mb-2 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">FAVORITES</h3>
        {d.favorites.map((f) => (
          <div key={f.name} className="mb-2 flex items-center gap-2 text-xs">
            <Avatar name={f.name} size="h-7 w-7" />
            <div>{f.name}<br /><span className="text-[10px] text-slate-400">{f.role}</span></div>
          </div>
        ))}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-6 text-sm">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={tab === t ? 'text-brand' : 'text-slate-400'}>⚙ {t}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <DownloadButton title="Analytics" />
            <PeriodSelect />
            <button onClick={() => setChatOpen(true)} className="rounded-lg bg-white px-3 py-1.5 text-xs dark:bg-slate-900">💬 Chat</button>
          </div>
        </div>

        {tab === 'Activity' && (
          <div className={card}>
            <h3 className="mb-3 font-medium">Recent Activity</h3>
            {d.recentActivity.map((group) => (
              <div key={group.date} className="mb-4">
                <p className="mb-2 text-xs text-slate-400">{group.date}</p>
                {group.items.map((a) => (
                  <div key={a.text} className="mb-2 flex items-start gap-2 text-sm">
                    <Avatar name={a.name} size="h-8 w-8" />
                    <div><span className="text-slate-400">{a.time}</span> {a.name} — {a.text}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {tab === 'Users' && (
          <div className={card}>
            <h3 className="mb-3 font-medium">Users</h3>
            {[...d.favorites, ...d.newFollowers].map((u) => (
              <div key={u.name} className="mb-3 flex items-center gap-3 text-sm">
                <Avatar name={u.name} size="h-9 w-9" />
                <div>{u.name}<br /><span className="text-[11px] text-slate-400">{u.role}</span></div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Settings' && <>
        <h1 className="mb-4 text-2xl font-normal">Overview</h1>
        <div className="mb-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {d.analyticsStats.map((s) => (
            <div key={s.label} className={card}>
              <p className="mb-1 text-xs text-slate-400">{s.label}</p>
              <p className="text-xl font-medium">{s.value} <span className={`text-xs ${s.change.startsWith('↑') ? 'text-green-500' : 'text-red-500'}`}>{s.change}</span></p>
            </div>
          ))}
        </div>

        <div className="mb-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className={card}>
            <div className="mb-3 flex justify-between text-xs text-slate-400"><span>↓ 1.400 Min. Visits</span><span>— 3.100 Avg. Visits</span><span>↑ 9.500 Max. Visits</span></div>
            <AreaChart data={d.visits} />
          </div>
          <div className={card}>
            <h3 className="mb-3 font-medium">Followers</h3>
            <DonutChart percent={78} value="21.800" label="Total" />
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {d.followerSources.map((s) => <p key={s.name}><span className={s.color}>●</span> {s.name} {s.value}</p>)}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className={card}>
            <h3 className="mb-3 font-medium">Followers Growth</h3>
            <BarChart data={d.followerGrowth.map((v, i) => ({ label: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], a: v, b: 0 }))} />
          </div>
          <div className={card}>
            <h3 className="mb-3 font-medium">New Followers</h3>
            {d.newFollowers.map((f) => (
              <div key={f.name} className="mb-3 flex items-center gap-3">
                <Avatar name={f.name} size="h-9 w-9" />
                <div className="flex-1 text-sm">{f.name}<br /><span className="text-[11px] text-slate-400">{f.role}</span></div>
                <button onClick={() => setFollowing(following.includes(f.name) ? following.filter((n) => n !== f.name) : [...following, f.name])} className={`rounded px-3 py-1 text-xs ${following.includes(f.name) ? 'bg-brand text-white' : 'bg-green-50 text-brand dark:bg-slate-800'}`}>{following.includes(f.name) ? 'Following' : 'Follow'}</button>
              </div>
            ))}
          </div>
        </div>
        </>}
      </div>

      {chatOpen && <ChatDrawer onClose={() => setChatOpen(false)} />}
      {editing && (
        <Modal title="Edit Profile" onClose={() => setEditing(null)}>
          <form onSubmit={(e) => { e.preventDefault(); setProfile(editing); setEditing(null) }} className="space-y-3 text-xs text-slate-400">
            <label className="block">Name<input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:text-slate-200" /></label>
            <label className="block">Job Title<input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none dark:border-slate-700 dark:text-slate-200" /></label>
            <button className="w-full rounded-lg bg-brand py-2.5 text-sm text-white">Save</button>
          </form>
        </Modal>
      )}
    </div>
  )
}
