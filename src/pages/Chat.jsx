import { useRef, useState } from 'react'
import { initialChats, chatTeams } from '../data/work.js'
import { Avatar } from '../components/ui/Avatar.jsx'
import EmojiPicker from '../components/mail/EmojiPicker.jsx'
import InviteModal from '../components/chat/InviteModal.jsx'
import Modal from '../components/ui/Modal.jsx'

const photoGradients = ['from-teal-400 to-emerald-300', 'from-rose-200 to-pink-300', 'from-orange-400 to-amber-200']
const teamColors = ['bg-sky-400', 'bg-teal-400', 'bg-rose-400', 'bg-amber-400', 'bg-violet-400']
const asMember = (m) => (typeof m === 'string' ? { name: m, role: 'Member' } : m)

export default function Chat() {
  const [people, setPeople] = useState(initialChats)
  const [teams, setTeams] = useState(chatTeams)
  const [active, setActive] = useState({ type: 'team', id: 't2' })
  const [search, setSearch] = useState('')
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [showInfo, setShowInfo] = useState(() => window.innerWidth >= 1280)   // info panel: always on wide screens, slide-over on small ones
  const [mobileView, setMobileView] = useState('list')                       // phones show either the list or the conversation
  const [viewAll, setViewAll] = useState(null)                                // 'media' | 'files' | 'members'
  const fileRef = useRef(null)
  const [inviting, setInviting] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const conversation = active.type === 'team' ? teams.find((t) => t.id === active.id) : people.find((p) => p.id === active.id)
  const visiblePeople = people.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  const visibleTeams = teams.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))

  function pushMessage(base) {
    if (active.type === 'team') {
      setTeams(teams.map((t) => (t.id === active.id ? { ...t, messages: [...t.messages, { from: 'You', time: 'now', mine: true, ...base }] } : t)))
    } else {
      setPeople(people.map((p) => (p.id === active.id ? { ...p, messages: [...p.messages, { time: 'now', mine: true, ...base }] } : p)))
    }
  }
  function updateMessage(index, newText) {
    const patch = (list) => list.map((c) => (c.id === active.id ? { ...c, messages: c.messages.map((m, i) => (i === index ? { ...m, text: newText, time: 'edited' } : m)) } : c))
    if (active.type === 'team') setTeams(patch(teams))
    else setPeople(patch(people))
  }
  function sendMessage(e) {
    e.preventDefault()
    if (!text.trim()) return
    if (editingId !== null) { updateMessage(editingId, text); setEditingId(null) }
    else pushMessage({ text })
    setText('')
  }
  function startEdit(index) {
    setEditingId(index)
    setText(conversation.messages[index].text || '')
  }
  function attachFile(e) {
    const f = e.target.files[0]
    if (f) pushMessage({ text: '', file: { name: f.name, size: f.size > 1048576 ? (f.size / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(f.size / 1024)) + ' KB' } })
    e.target.value = ''
  }
  function openConversation(next) {
    setActive(next)
    setEditingId(null)
    setText('')
    setMobileView('chat')
  }
  function addTeam() {
    const name = window.prompt('New team name')
    if (!name || !name.trim()) return
    const id = 't' + Date.now()
    setTeams([...teams, { id, name: '#' + name.trim().replace(/^#/, ''), color: teamColors[teams.length % teamColors.length], unread: 0, members: [{ name: 'You', role: 'Admin' }], files: [], messages: [] }])
    openConversation({ type: 'team', id })
  }
  function addPerson() {
    const name = window.prompt('New contact name')
    if (!name || !name.trim()) return
    const id = Date.now()
    setPeople([...people, { id, name: name.trim(), role: 'Contact', online: false, unread: 0, info: { email: 'example@mail.com', phone: '+123-4567-8800', birthday: '-', location: '-' }, messages: [] }])
    openConversation({ type: 'person', id })
  }
  function deleteMessage(index) {
    if (active.type === 'team') {
      setTeams(teams.map((t) => (t.id === active.id ? { ...t, messages: t.messages.filter((_, i) => i !== index) } : t)))
    } else {
      setPeople(people.map((p) => (p.id === active.id ? { ...p, messages: p.messages.filter((_, i) => i !== index) } : p)))
    }
  }
  function addMembers(names) {
    setTeams(teams.map((t) => (t.id === inviting.id ? { ...t, members: [...t.members, ...names.map((n) => ({ name: n, role: 'Member' }))] } : t)))
    setInviting(null)
  }

  return (
    <div className="relative flex h-[calc(100vh-110px)] overflow-hidden rounded-lg bg-white dark:bg-slate-900 sm:h-[calc(100vh-130px)]">
      <aside className={`w-full shrink-0 overflow-y-auto border-r border-slate-100 p-3 dark:border-slate-800 md:block md:w-72 ${mobileView === 'chat' ? 'hidden' : ''}`}>
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-slate-100 px-2 dark:bg-slate-800">
          <span className="text-slate-400">🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-transparent py-1.5 text-sm outline-none" />
        </div>

        <div className="mb-2 flex items-center justify-between"><p className="text-[11px] tracking-wide text-slate-400">TEAMS</p><button onClick={addTeam} className="text-brand">+</button></div>
        {visibleTeams.map((t) => (
          <button key={t.id} onClick={() => openConversation({ type: 'team', id: t.id })}
            className={`mb-1 flex w-full items-center gap-3 rounded-lg p-2 text-left ${active.type === 'team' && active.id === t.id ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
            <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white ${t.color}`}>{t.name[1]}</span>
            <div className="min-w-0 flex-1 text-sm">
              <p>{t.name}</p>
              <p className="truncate text-xs text-slate-400">{t.messages[t.messages.length - 1]?.text || 'No messages yet'}</p>
            </div>
            {t.unread > 0 && <span className="rounded-full bg-red-500 px-1.5 text-[10px] text-white">{t.unread}</span>}
          </button>
        ))}

        <div className="mb-2 mt-4 flex items-center justify-between"><p className="text-[11px] tracking-wide text-slate-400">PEOPLE</p><button onClick={addPerson} className="text-brand">+</button></div>
        {visiblePeople.map((p) => (
          <button key={p.id} onClick={() => openConversation({ type: 'person', id: p.id })}
            className={`mb-1 flex w-full items-center gap-3 rounded-lg p-2 text-left ${active.type === 'person' && active.id === p.id ? 'bg-slate-100 dark:bg-slate-800' : ''}`}>
            <div className="relative"><Avatar name={p.name} size="h-9 w-9" />{p.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />}</div>
            <div className="min-w-0 flex-1 text-sm">
              <p>{p.name}</p>
              <p className="truncate text-xs text-slate-400">{p.messages[p.messages.length - 1]?.text || '...'}</p>
            </div>
            {p.unread > 0 && <span className="rounded-full bg-red-500 px-1.5 text-[10px] text-white">{p.unread}</span>}
          </button>
        ))}
      </aside>

      <section className={`min-w-0 flex-1 flex-col md:flex ${mobileView === 'list' ? 'hidden' : 'flex'}`}>
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={() => setMobileView('list')} aria-label="Back" className="text-lg text-slate-400 md:hidden">‹</button>
            {active.type === 'team'
              ? <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white ${conversation.color}`}>{conversation.name[1]}</span>
              : <Avatar name={conversation.name} size="h-8 w-8" />}
            <span className="truncate font-medium">{conversation.name}</span>
          </div>
          <div className="flex gap-3 text-slate-400">
            {active.type === 'team' && <button onClick={() => setInviting(conversation)}>+</button>}
            <button onClick={() => setShowInfo(!showInfo)}>•••</button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {conversation.messages.map((m, i) => (
            <div key={i} className={`group flex items-end gap-2 ${m.mine ? 'flex-row-reverse' : ''}`}>
              {!m.mine && <Avatar name={active.type === 'team' ? m.from : conversation.name} size="h-7 w-7" />}
              <div className={m.mine ? 'text-right' : ''}>
                {active.type === 'team' && !m.mine && <p className="mb-1 text-xs font-medium">{m.from}</p>}
                {m.text && <p className={`inline-block max-w-[14rem] whitespace-pre-line sm:max-w-sm rounded-2xl px-4 py-2 text-left text-sm ${m.mine ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{m.text}</p>}
                {m.images && (
                  <div className="mt-1 flex gap-1">
                    {Array.from({ length: Math.min(3, m.images) }, (_, g) => <div key={g} className={`h-14 w-14 rounded-lg bg-gradient-to-br ${photoGradients[g]}`} />)}
                    {m.images > 3 && <span className="flex h-14 items-center text-xs text-slate-400">+{m.images - 3}</span>}
                  </div>
                )}
                {m.file && (
                  <div className="mt-1 inline-flex max-w-full items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs text-white">
                    📎 <span className="truncate">{m.file.name}</span> <span className="opacity-80">{m.file.size}</span> <span>⭳</span>
                  </div>
                )}
                <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                  {m.mine && (
                    <span className="flex gap-2 sm:hidden sm:group-hover:flex">
                      <button onClick={() => startEdit(i)}>✎</button>
                      <button onClick={() => deleteMessage(i)}>🗑</button>
                    </span>
                  )}
                  <span>{m.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="relative flex items-center gap-3 border-t border-slate-100 p-3 dark:border-slate-800">
          <button type="button" onClick={() => fileRef.current.click()} className="text-slate-400">📎</button>
          <input ref={fileRef} type="file" className="hidden" onChange={attachFile} />
          <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-slate-400">☺</button>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder={editingId !== null ? 'Edit message...' : 'Type a message here...'} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">➤</button>
          {showEmoji && <EmojiPicker onPick={(e) => { setText(text + e); setShowEmoji(false) }} onClose={() => setShowEmoji(false)} />}
        </form>
      </section>

      {showInfo && (
        <>
        <div className="fixed inset-0 z-30 bg-black/30 xl:hidden" onClick={() => setShowInfo(false)} />
        <aside className="fixed inset-y-0 right-0 z-40 w-72 shrink-0 overflow-y-auto border-l border-slate-100 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900 xl:static xl:z-auto xl:w-64 xl:bg-transparent xl:shadow-none dark:xl:bg-transparent">
          <button onClick={() => setShowInfo(false)} className="mb-2 text-slate-400 xl:hidden">× Close</button>
          {active.type === 'person' ? (
            <>
              <div className="relative mx-auto mb-3 h-20 w-20">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 to-emerald-400 text-3xl text-white">👤</div>
                {conversation.online && <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />}
              </div>
              <h3 className="text-center font-medium">{conversation.name}</h3>
              <p className="mb-5 text-center text-xs text-slate-400">{conversation.role}</p>
              <p className="mb-2 text-[11px] text-slate-400">INFO</p>
              <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">EMAIL</span>{conversation.info.email}</p>
              <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">PHONE</span>{conversation.info.phone}</p>
              <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">BIRTHDAY</span>{conversation.info.birthday}</p>
              <p className="mb-5 text-xs"><span className="block text-[10px] text-slate-400">LOCATION</span>{conversation.info.location}</p>
              <div className="mb-2 flex items-center justify-between"><p className="text-[11px] text-slate-400">MEDIA</p><button onClick={() => setViewAll('media')} className="text-xs text-brand">View All</button></div>
              <div className="grid grid-cols-3 gap-2">{photoGradients.map((g, i) => <div key={i} className={`h-12 rounded-lg bg-gradient-to-br ${g}`} />)}</div>
            </>
          ) : (
            <>
              <div className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-white ${conversation.color}`}>{conversation.name[1]}</div>
              <h3 className="text-center font-medium">{conversation.name}</h3>
              <p className="mb-5 text-center text-xs text-slate-400">Members ({conversation.members.length})</p>
              <div className="mb-2 flex items-center justify-between"><p className="text-[11px] text-slate-400">FILES</p><button onClick={() => setViewAll('files')} className="text-xs text-brand">View All</button></div>
              {(conversation.files || []).map((f) => (
                <div key={f.name} className="mb-2 flex items-center gap-2 text-xs"><span>📄</span><div className="min-w-0 flex-1"><p className="truncate">{f.name}</p><p className="text-slate-400">{f.size}</p></div></div>
              ))}
              <div className="mb-2 mt-4 flex items-center justify-between"><p className="text-[11px] text-slate-400">PHOTOS</p><button onClick={() => setViewAll('media')} className="text-xs text-brand">View All</button></div>
              <div className="mb-4 grid grid-cols-3 gap-2">{photoGradients.map((g, i) => <div key={i} className={`h-12 rounded-lg bg-gradient-to-br ${g}`} />)}</div>
              <div className="mb-2 flex items-center justify-between"><p className="text-[11px] text-slate-400">MEMBERS</p><button onClick={() => setViewAll('members')} className="text-xs text-brand">View All</button></div>
              {conversation.members.map(asMember).map((m) => (
                <div key={m.name} className="mb-2 flex items-center gap-2 text-xs"><Avatar name={m.name} size="h-7 w-7" /><div><p>{m.name}</p><p className="text-slate-400">{m.role}</p></div></div>
              ))}
            </>
          )}
        </aside>
        </>
      )}

      {viewAll && (
        <Modal title={{ media: 'Media', files: 'Files', members: 'Members' }[viewAll]} onClose={() => setViewAll(null)}>
          {viewAll === 'media' && <div className="grid grid-cols-3 gap-2">{Array.from({ length: 9 }, (_, i) => <div key={i} className={`h-20 rounded-lg bg-gradient-to-br ${photoGradients[i % 3]}`} />)}</div>}
          {viewAll === 'files' && (conversation.files || []).map((f) => (
            <div key={f.name} className="mb-2 flex items-center gap-2 text-sm"><span>📄</span><div className="min-w-0 flex-1"><p className="truncate">{f.name}</p><p className="text-xs text-slate-400">{f.size}</p></div></div>
          ))}
          {viewAll === 'members' && (conversation.members || []).map(asMember).map((m) => (
            <div key={m.name} className="mb-2 flex items-center gap-2 text-sm"><Avatar name={m.name} size="h-8 w-8" /><div><p>{m.name}</p><p className="text-xs text-slate-400">{m.role}</p></div></div>
          ))}
        </Modal>
      )}

      {inviting && <InviteModal team={inviting} onClose={() => setInviting(null)} onInvite={addMembers} />}
    </div>
  )
}
