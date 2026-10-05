import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '../ui/Avatar.jsx'
import MoreMenu from '../ui/MoreMenu.jsx'

const initialMessages = [
  { me: false, text: 'Lorem ipsum dolor sit ame?', time: '09:45am' },
  { me: true, text: 'Consectetur adipiscing elit. Turpis risus commodo sed viverra.', time: '09:47am' },
  { me: false, text: 'Sollicitudin don posuere pharetra.', time: '09:48am' },
  { me: true, text: 'Laoreet in elementum nisl, ultrices.', time: '09:47am' },
]
const people = ['Regina Cooper', 'Judith Black', 'Ronald Robertson', 'Dustin Williamson', 'Calvin Flores', 'Brandon Pena', 'Nathan Fox', 'Colleen Warren']

export default function ChatDrawer({ onClose }) {
  const [messages, setMessages] = useState(initialMessages)
  const [text, setText] = useState('')
  const fileRef = useRef(null)
  const navigate = useNavigate()

  function attach(e) {
    const f = e.target.files[0]
    if (f) setMessages((m) => [...m, { me: true, text: '📎 ' + f.name, time: 'now' }])
    e.target.value = ''
  }

  function send() {
    if (!text.trim()) return
    setMessages([...messages, { me: true, text, time: 'now' }])
    setText('')
  }

  return (
    <div className="fixed inset-y-0 right-0 z-40 flex w-full max-w-lg bg-white shadow-xl dark:bg-slate-900">
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
          <MoreMenu items={[{ label: 'Clear chat', onClick: () => setMessages([]) }]} />
          <button onClick={() => fileRef.current.click()} className="text-slate-400">📷</button>
          <button onClick={onClose} className="text-slate-400">×</button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-end gap-2 ${m.me ? 'flex-row-reverse' : ''}`}>
              <Avatar name="Regina Cooper" size="h-7 w-7" />
              <div className={m.me ? 'text-right' : ''}>
                <p className={`inline-block max-w-[14rem] rounded-2xl sm:max-w-xs px-4 py-2 text-sm ${m.me ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{m.text}</p>
                <p className="mt-1 text-[10px] text-slate-400">{m.time}</p>
              </div>
            </div>
          ))}
          <p className="text-center text-[10px] text-slate-400">MONDAY</p>
          <p className="text-xs text-slate-400">Regina Cooper is typing •••</p>
        </div>
        <div className="flex items-center gap-2 border-t border-slate-100 p-3 dark:border-slate-800">
          <button onClick={() => fileRef.current.click()} className="text-slate-400">📎</button>
          <input ref={fileRef} type="file" className="hidden" onChange={attach} />
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Type a message" className="flex-1 bg-transparent text-sm outline-none" />
          <button onClick={() => setText((t) => t + '😊')} className="text-slate-400">☺</button>
          <button onClick={send} className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">➤</button>
        </div>
      </div>
      <div className="w-14 space-y-3 overflow-y-auto border-l border-slate-100 p-2 dark:border-slate-800">
        {people.map((p) => <Avatar key={p} name={p} size="h-9 w-9" />)}
        <button onClick={() => navigate('/chat')} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-400">+</button>
      </div>
    </div>
  )
}
