import { useRef, useState } from 'react'
import Modal from '../ui/Modal.jsx'
import { ProfileAvatar } from '../ui/ProfileAvatar.jsx'

const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const emptyForm = { first: '', last: '', email: '', phone: '', job: '', location: '', dob: { day: '1', month: 'January', year: '2000' }, notes: '', status: 'Active' }

export default function ContactFormModal({ contact, onClose, onSave }) {
  const isEdit = Boolean(contact)
  const [form, setForm] = useState(contact ? { ...contact } : emptyForm)
  const photoRef = useRef(null)

  function pickPhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((f) => ({ ...f, photo: reader.result }))
    reader.readAsDataURL(file)
  }

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function changeDob(key, value) {
    setForm({ ...form, dob: { ...form.dob, [key]: value } })
  }
  function submit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal title={isEdit ? 'Edit Contact' : 'New Contact'} onClose={onClose}>
      <form onSubmit={submit} className="max-h-[75vh] space-y-3 overflow-y-auto pr-1 text-xs text-slate-400">
        <div className="relative mx-auto mb-2 h-20 w-20">
          {isEdit ? (
            <>
              <ProfileAvatar size="h-20 w-20" />
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow dark:bg-slate-700">✎</span>
            </>
          ) : (
            <>
              <button type="button" onClick={() => photoRef.current.click()} className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 text-2xl text-slate-300">
                {form.photo ? <img src={form.photo} alt="" className="h-full w-full object-cover" /> : '+'}
              </button>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={pickPhoto} />
            </>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">First Name<input name="first" required value={form.first} onChange={change} className={inputClass} /></label>
          <label className="block">Last Name<input name="last" value={form.last} onChange={change} className={inputClass} /></label>
        </div>
        <label className="block">Email<input name="email" value={form.email} onChange={change} className={inputClass} /></label>
        <label className="block">Phone
          <div className="mt-1 flex gap-2">
            <select className="rounded-lg border border-slate-200 bg-transparent px-2 text-sm dark:border-slate-700"><option>+1</option></select>
            <input name="phone" value={form.phone} onChange={change} className={inputClass + ' mt-0'} />
          </div>
        </label>
        <label className="block">Job Title<input name="job" value={form.job} onChange={change} className={inputClass} /></label>
        <label className="block">Address<input name="location" value={form.location} onChange={change} className={inputClass} /></label>
        <label className="block">Date of Birth
          <div className="mt-1 grid grid-cols-3 gap-2">
            <select value={form.dob.day} onChange={(e) => changeDob('day', e.target.value)} className={inputClass + ' mt-0'}>
              {Array.from({ length: 31 }, (_, i) => <option key={i}>{i + 1}</option>)}
            </select>
            <select value={form.dob.month} onChange={(e) => changeDob('month', e.target.value)} className={inputClass + ' mt-0'}>
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={form.dob.year} onChange={(e) => changeDob('year', e.target.value)} className={inputClass + ' mt-0'}>
              {Array.from({ length: 80 }, (_, i) => <option key={i}>{2010 - i}</option>)}
            </select>
          </div>
        </label>
        <label className="block">Notes<textarea name="notes" value={form.notes} onChange={change} rows="3" placeholder="Type something" className={inputClass} /></label>
        <button className="w-full rounded-lg bg-brand py-2.5 text-sm text-white">{isEdit ? 'Save' : 'Add Contact'}</button>
      </form>
    </Modal>
  )
}
