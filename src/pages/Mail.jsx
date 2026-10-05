import { useState, useRef } from 'react'
import { initialEmails, mailLabels as initialLabels } from '../data/work.js'
import Modal from '../components/ui/Modal.jsx'
import { Avatar } from '../components/ui/Avatar.jsx'
import EmojiPicker from '../components/mail/EmojiPicker.jsx'
import LabelModal from '../components/mail/LabelModal.jsx'
import LabelMenu from '../components/mail/LabelMenu.jsx'
import RichToolbar from '../components/mail/RichToolbar.jsx'
import { AttachmentChip, UploadingChip } from '../components/mail/FileChip.jsx'

const folders = ['Inbox', 'Marked', 'Drafts', 'Sent', 'Important', 'Deleted']
const inputClass = 'w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'
const demoFiles = [{ name: 'Resume.pdf', size: '570 KB' }, { name: 'Brief.docx', size: '88 KB' }, { name: 'Cover.jpg', size: '1.2 MB' }]

export default function Mail() {
  const [emails, setEmails] = useState(initialEmails)
  const [labels, setLabels] = useState(initialLabels)
  const [folder, setFolder] = useState('Inbox')
  const [activeLabel, setActiveLabel] = useState('')
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState(1)
  const [view, setView] = useState('split')              // 'split' or 'list'
  const [selected, setSelected] = useState([])
  const [composing, setComposing] = useState(false)
  const [draft, setDraft] = useState({ to: '', subject: '', message: '', attachments: [], uploading: [] })
  const [showComposeEmoji, setShowComposeEmoji] = useState(false)
  const [showReplyEmoji, setShowReplyEmoji] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [labelModal, setLabelModal] = useState(null)      // null | 'add' | label object
  const uploadId = useRef(0)
  const replyRef = useRef(null)

  function inFolder(email) {
    if (activeLabel) return email.label === activeLabel
    if (email.folder === 'Deleted') return folder === 'Deleted'
    if (folder === 'Marked') return email.starred
    if (folder === 'Important') return email.important
    return email.folder === folder
  }
  const list = emails.filter((e) => inFolder(e) && (e.subject + e.from).toLowerCase().includes(search.toLowerCase()))
  const openEmail = emails.find((e) => e.id === openId)
  const unreadInbox = emails.filter((e) => e.folder === 'Inbox' && !e.read).length
  const unreadImportant = emails.filter((e) => e.important && !e.read).length

  function update(id, changes) {
    setEmails(emails.map((e) => (e.id === id ? { ...e, ...changes } : e)))
  }
  function openEmailRow(e) {
    update(e.id, { read: true })
    setOpenId(e.id)
    setView('split')
  }
  function send(e) {
    e.preventDefault()
    setEmails([{ id: Date.now(), from: draft.to, subject: draft.subject, time: 'now', folder: 'Sent', starred: false, important: false, read: true, label: '', attachments: draft.attachments, body: draft.message }, ...emails])
    setDraft({ to: '', subject: '', message: '', attachments: [], uploading: [] })
    setComposing(false)
  }
  function sendReply(e) {
    e.preventDefault()
    setReplyText('')
  }
  function addDemoAttachment(target) {
    const file = demoFiles[Math.floor(Math.random() * demoFiles.length)]
    if (target === 'reply') { setReplyText((t) => t + (t ? '\n' : '') + '📎 ' + file.name); return }
    const id = ++uploadId.current
    if (target === 'compose') setDraft((d) => ({ ...d, uploading: [...d.uploading, { id, name: file.name, size: file.size, progress: 10 }] }))
    const tick = setInterval(() => {
      setDraft((d) => {
        const item = d.uploading.find((u) => u.id === id)
        if (!item) { clearInterval(tick); return d }
        if (item.progress >= 100) {
          clearInterval(tick)
          return { ...d, uploading: d.uploading.filter((u) => u.id !== id), attachments: [...d.attachments, { name: file.name, size: file.size }] }
        }
        return { ...d, uploading: d.uploading.map((u) => (u.id === id ? { ...u, progress: u.progress + 30 } : u)) }
      })
    }, 400)
  }
  function toggleSelect(id) {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id])
  }
  // actions on the ticked rows of the list view (archive / spam / move to inbox / mark read)
  function bulk(changes) {
    if (selected.length === 0) return
    setEmails(emails.map((e) => (selected.includes(e.id) ? { ...e, ...changes } : e)))
    setSelected([])
  }
  function toggleRead() {
    if (selected.length === 0) return
    const allRead = emails.filter((e) => selected.includes(e.id)).every((e) => e.read)
    bulk({ read: !allRead })
  }
  function toggleSelectAll() {
    const ids = list.map((e) => e.id)
    setSelected(ids.length > 0 && ids.every((id) => selected.includes(id)) ? [] : ids)
  }
  const openIndex = list.findIndex((e) => e.id === openId)
  function step(direction) {
    const next = list[openIndex + direction]
    if (next) openEmailRow(next)
  }
  function saveLabel(form) {
    if (labelModal === 'add') setLabels([...labels, { name: form.name, dot: '', swatch: form.swatch }])
    else setLabels(labels.map((l) => (l.name === labelModal.name ? { ...l, name: form.name, swatch: form.swatch } : l)))
    setLabelModal(null)
  }
  function deleteLabel(name) {
    setLabels(labels.filter((l) => l.name !== name))
    if (activeLabel === name) setActiveLabel('')
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-48">
        <button onClick={() => setComposing(true)} className="mb-4 w-full rounded-lg bg-brand py-2.5 text-xs font-medium text-white">NEW MESSAGE</button>
        {folders.map((f) => (
          <button key={f} onClick={() => { setFolder(f); setActiveLabel(''); setView('split') }}
            className={`mb-1 flex w-full justify-between rounded-lg px-3 py-2 text-left text-sm ${!activeLabel && folder === f ? 'bg-lime-active' : ''}`}>
            {f}
            {f === 'Inbox' && unreadInbox > 0 && <span className="rounded-full bg-red-600 px-1.5 text-[10px] text-white">{unreadInbox}</span>}
            {f === 'Important' && unreadImportant > 0 && <span className="rounded-full bg-red-600 px-1.5 text-[10px] text-white">{unreadImportant}</span>}
          </button>
        ))}

        <div className="mb-2 mt-5 flex items-center justify-between">
          <p className="text-[11px] tracking-wide text-slate-400">LABELS</p>
          <button onClick={() => setLabelModal('add')} className="text-brand">+</button>
        </div>
        {labels.map((l) => (
          <div key={l.name} className={`group mb-1 flex items-center justify-between rounded-lg px-3 py-1.5 text-sm ${activeLabel === l.name ? 'bg-lime-active' : ''}`}>
            <button onClick={() => setActiveLabel(activeLabel === l.name ? '' : l.name)} className="flex flex-1 items-center gap-2 text-left">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: l.swatch }} /> {l.name}
            </button>
            <span className="sm:opacity-0 sm:group-hover:opacity-100">
              <LabelMenu onEdit={() => setLabelModal(l)} onAddSublabel={() => setLabelModal('add')} onDelete={() => deleteLabel(l.name)}
                onRecolor={(swatch) => setLabels(labels.map((x) => (x.name === l.name ? { ...x, swatch } : x)))} />
            </span>
          </div>
        ))}
      </aside>

      {view === 'list' ? (
        <section className="min-w-0 flex-1 rounded-lg bg-white p-3 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center gap-3 border-b border-slate-100 pb-3 text-slate-400 dark:border-slate-800">
            <input type="checkbox" checked={list.length > 0 && list.every((e) => selected.includes(e.id))} onChange={toggleSelectAll} />
            <button onClick={() => bulk({ folder: 'Archive' })} title="Archive">🗄</button><button onClick={() => bulk({ folder: 'Spam' })} title="Report spam">⚠</button><button onClick={() => { setEmails(emails.filter((e) => !selected.includes(e.id))); setSelected([]) }} title="Delete">🗑</button>
            <button onClick={() => bulk({ folder: 'Inbox' })} title="Move to Inbox">📁</button><button onClick={toggleRead} title="Mark read / unread">✉</button>
            <div className="ml-2 flex flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 dark:bg-slate-800">
              <span>🔍</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-transparent py-1.5 text-sm outline-none" />
            </div>
            <span className="text-xs">1 of 200</span>
            <button onClick={() => setView('split')}>⚙</button>
          </div>
          {list.map((e) => (
            <div key={e.id} className={`flex cursor-pointer items-center gap-3 border-b border-slate-50 py-3 text-sm dark:border-slate-800 ${!e.read ? 'font-medium' : ''}`}>
              <input type="checkbox" checked={selected.includes(e.id)} onChange={(ev) => { ev.stopPropagation(); toggleSelect(e.id) }} onClick={(ev) => ev.stopPropagation()} />
              <button onClick={(ev) => { ev.stopPropagation(); update(e.id, { starred: !e.starred }) }} className={e.starred ? 'text-yellow-400' : 'text-slate-300'}>★</button>
              <button onClick={(ev) => { ev.stopPropagation(); update(e.id, { important: !e.important }) }} className={e.important ? 'text-red-500' : 'text-slate-300'}>🔖</button>
              <div onClick={() => openEmailRow(e)} className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar name={e.from} size="h-9 w-9" />
                <span className="w-24 shrink-0 truncate sm:w-32">{e.from}</span>
                <span className="min-w-0 flex-1 truncate text-slate-500">{e.subject} — {e.body.split('\n')[0]}</span>
              </div>
              {e.attachments.length > 0 && <span className="text-slate-400">📎</span>}
              <span className="w-12 shrink-0 text-right text-xs text-slate-400">{e.time}</span>
            </div>
          ))}
        </section>
      ) : (
        <>
          <section className="w-full shrink-0 rounded-lg bg-white p-3 dark:bg-slate-900 lg:w-80">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-100 px-2 dark:bg-slate-800">
                <span className="text-slate-400">🔍</span>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full bg-transparent py-1.5 text-sm outline-none" />
              </div>
              <button onClick={() => setView('list')} className="ml-2 text-slate-400" title="List view">☰</button>
            </div>
            {list.length === 0 && <p className="p-6 text-center text-sm text-slate-400">No messages</p>}
            {list.map((e) => (
              <div key={e.id} onClick={() => openEmailRow(e)} className={`flex cursor-pointer gap-3 border-t border-slate-100 p-3 dark:border-slate-800 ${openId === e.id ? 'bg-slate-50 dark:bg-slate-800' : ''}`}>
                <Avatar name={e.from} size="h-9 w-9" />
                <div className="min-w-0 flex-1 text-sm">
                  <div className="flex justify-between"><span className={!e.read ? 'font-medium' : ''}>{e.from}</span><span className="text-xs text-slate-400">{e.time}</span></div>
                  <b className={`block truncate ${e.read ? 'font-normal' : 'font-medium'}`}>{e.subject}</b>
                  <p className="truncate text-xs text-slate-400">{e.body.split('\n')[0]}</p>
                </div>
                {e.important ? <span className="mt-1 text-red-500">🔖</span> : <span className="mt-1 text-slate-300">•••</span>}
              </div>
            ))}
          </section>

          <section className="min-h-64 min-w-0 flex-1 rounded-lg bg-white p-4 dark:bg-slate-900 sm:p-6">
            {openEmail ? (
              <>
                <div className="mb-4 flex items-center justify-between text-slate-400">
                  <button onClick={() => replyRef.current && replyRef.current.focus()} className="text-lg" title="Reply">↩</button>
                  <div className="flex items-center gap-2 text-xs"><button onClick={() => step(-1)} disabled={openIndex <= 0} className="disabled:opacity-30">‹</button><span>{openIndex + 1} of {list.length}</span><button onClick={() => step(1)} disabled={openIndex < 0 || openIndex >= list.length - 1} className="disabled:opacity-30">›</button></div>
                  <div className="flex gap-4">
                    <button onClick={() => update(openEmail.id, { starred: !openEmail.starred })} className={openEmail.starred ? 'text-red-500' : ''}>🔖</button>
                    <button onClick={() => window.print()}>🖨</button>
                    <button onClick={() => update(openEmail.id, { folder: 'Deleted' })}>🗑</button>
                  </div>
                </div>

                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar name={openEmail.from} size="h-10 w-10" />
                    <div><p className="font-medium">{openEmail.from}</p><p className="text-xs text-brand">{openEmail.from.split(' ')[0].toLowerCase()}@mail.com</p></div>
                  </div>
                  <span className="text-xs text-slate-400">{openEmail.time}</span>
                </div>

                <h2 className="mb-4 text-xl font-medium sm:text-2xl">{openEmail.subject}</h2>
                {openEmail.body.split('\n\n').map((p, i) => <p key={i} className="mb-3 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">{p}</p>)}

                {openEmail.attachments.length > 0 && (
                  <div className="my-4 flex flex-wrap gap-3">
                    {openEmail.attachments.map((f) => <AttachmentChip key={f.name} file={f} />)}
                  </div>
                )}

                <form onSubmit={sendReply} className="mt-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-xs text-slate-400 dark:border-slate-700">
                    <span>To:</span><span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{openEmail.from} ×</span>
                    <span className="ml-auto">Cc</span><span>Bcc</span>
                  </div>
                  <RichToolbar onEmoji={() => setShowReplyEmoji(!showReplyEmoji)} />
                  <textarea ref={replyRef} value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type something" rows="3" className="w-full resize-none bg-transparent px-3 py-2 text-sm outline-none" />
                  <div className="relative flex items-center gap-3 p-3">
                    <button className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2 text-sm text-white">Send</button>
                    <span className="text-slate-400">🕐</span>
                    <button type="button" onClick={() => addDemoAttachment('reply')} className="text-slate-400">📎</button>
                    {showReplyEmoji && <EmojiPicker onPick={(e) => { setReplyText(replyText + e); setShowReplyEmoji(false) }} onClose={() => setShowReplyEmoji(false)} />}
                  </div>
                </form>
              </>
            ) : <p className="text-slate-400">Select a message</p>}
          </section>
        </>
      )}

      {composing && (
        <Modal title="New Message" onClose={() => setComposing(false)} width="max-w-xl">
          <form onSubmit={send} className="space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-700">
              <span>To</span>
              <input required value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} className="flex-1 bg-transparent text-sm text-slate-700 outline-none dark:text-slate-200" />
              <span>Cc</span><span>Bcc</span>
            </div>
            <label className="block">Subject<input value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} className={inputClass + ' mt-1'} /></label>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700">
              <RichToolbar onEmoji={() => setShowComposeEmoji(!showComposeEmoji)} />
              <textarea value={draft.message} onChange={(e) => setDraft({ ...draft, message: e.target.value })} placeholder="Type something" rows="5" className="w-full resize-none bg-transparent px-3 py-2 text-sm text-slate-700 outline-none dark:text-slate-200" />
            </div>
            {(draft.attachments.length > 0 || draft.uploading.length > 0) && (
              <div className="flex flex-wrap gap-3">
                {draft.attachments.map((f) => <AttachmentChip key={f.name} file={f} onRemove={() => setDraft({ ...draft, attachments: draft.attachments.filter((a) => a.name !== f.name) })} />)}
                {draft.uploading.map((u) => <UploadingChip key={u.id} name={u.name} progress={u.progress} onCancel={() => setDraft({ ...draft, uploading: draft.uploading.filter((x) => x.id !== u.id) })} />)}
              </div>
            )}
            <div className="relative flex items-center gap-3">
              <button className="rounded-lg bg-brand px-6 py-2 text-sm text-white">Send</button>
              <span>🕐</span>
              <button type="button" onClick={() => addDemoAttachment('compose')}>📎</button>
              {showComposeEmoji && <EmojiPicker onPick={(e) => { setDraft({ ...draft, message: draft.message + e }); setShowComposeEmoji(false) }} onClose={() => setShowComposeEmoji(false)} />}
            </div>
          </form>
        </Modal>
      )}

      {labelModal && <LabelModal label={labelModal === 'add' ? null : labelModal} onClose={() => setLabelModal(null)} onSave={saveLabel} />}
    </div>
  )
}
