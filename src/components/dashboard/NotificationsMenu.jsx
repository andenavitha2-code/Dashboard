import { useState } from 'react'
import Icon from '../ui/Icon.jsx'
import { Avatar } from '../ui/Avatar.jsx'

const initial = [
  { id: 1, name: 'Regina Cooper', text: 'sent you a new project brief.', time: '2 min ago', read: false },
  { id: 2, name: 'Jane Wilson', text: 'commented on Website Redesign.', time: '15 min ago', read: false },
  { id: 3, name: 'Ronald Robertson', text: 'assigned you a new task.', time: '1 hour ago', read: false },
  { id: 4, name: 'Judith Black', text: 'shared a file with you.', time: 'Yesterday', read: true },
]

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(initial)
  const unread = items.filter((i) => !i.read).length

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Icon name="bell" />
        {unread > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">{unread}</span>}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="fixed left-3 right-3 top-[62px] z-30 rounded-xl sm:absolute sm:left-auto sm:right-0 sm:top-9 sm:w-72 bg-white p-3 text-left text-sm shadow-lg dark:bg-slate-800">
            <div className="mb-2 flex items-center justify-between">
              <b className="font-medium">Notifications</b>
              <button onClick={() => setItems(items.map((i) => ({ ...i, read: true })))} className="text-xs text-brand">Mark all as read</button>
            </div>
            {items.map((n) => (
              <div key={n.id} className={`mb-1 flex items-start gap-2 rounded-lg p-2 ${!n.read ? 'bg-green-50 dark:bg-slate-700' : ''}`}>
                <Avatar name={n.name} size="h-8 w-8" />
                <div className="text-xs"><b className="font-medium">{n.name}</b> {n.text}<br /><span className="text-slate-400">{n.time}</span></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
