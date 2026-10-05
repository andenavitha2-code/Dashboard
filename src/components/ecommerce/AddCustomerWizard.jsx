import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import { ProfileAvatar } from '../ui/ProfileAvatar.jsx'

const steps = ['Profile', 'Address', 'Payment', 'Submission']
const emptyForm = {
  firstName: '', lastName: '', email: '', phone: '', status: 'Active',
  address1: '', address2: '', city: '', country: 'United States', state: '', postcode: '',
  method: 'Credit Card', cardNumber: '', cardHolder: '', month: '12', year: '2023',
}
const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'

export default function AddCustomerWizard({ onClose, onSubmit }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(emptyForm)

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function field(name, label, extra) {
    return <label className="block text-xs text-slate-400">{label}<input name={name} value={form[name]} onChange={change} className={inputClass} {...extra} /></label>
  }

  return (
    <Modal title={steps[step]} onClose={onClose}>
      <div className="mb-4 flex gap-5 border-b border-slate-100 pb-3 text-xs dark:border-slate-800">
        {steps.map((s, i) => (
          <span key={s} className={i === step ? 'text-brand' : i < step ? 'text-slate-500' : 'text-slate-300'}>{s.toUpperCase()}</span>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-3">
          <div className="relative mx-auto mb-2 h-20 w-20">
            <ProfileAvatar size="h-20 w-20" />
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow dark:bg-slate-700">✎</span>
          </div>
          <div className="grid grid-cols-2 gap-3">{field('firstName', 'First Name')}{field('lastName', 'Last Name')}</div>
          {field('email', 'Email')}
          <label className="block text-xs text-slate-400">Phone
            <div className="mt-1 flex gap-2">
              <select className="rounded-lg border border-slate-200 bg-transparent px-2 text-sm dark:border-slate-700"><option>+1</option></select>
              <input name="phone" value={form.phone} onChange={change} className={inputClass + ' mt-0'} />
            </div>
          </label>
          <label className="block text-xs text-slate-400">Status
            <select name="status" value={form.status} onChange={change} className={inputClass}><option>Active</option><option>Blocked</option></select>
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          {field('address1', 'Address Line 1')}
          {field('address2', 'Address Line 2', { placeholder: 'Optional' })}
          {field('city', 'City')}
          <label className="block text-xs text-slate-400">Country
            <select name="country" value={form.country} onChange={change} className={inputClass}>
              <option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">{field('state', 'State/Region')}{field('postcode', 'Postcode')}</div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">Choose payment method:</p>
          <div className="flex gap-3">
            {['Credit Card', 'PayPal'].map((m) => (
              <button key={m} type="button" onClick={() => setForm({ ...form, method: m })}
                className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm ${form.method === m ? 'border-brand' : 'border-slate-200 dark:border-slate-700'}`}>
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${form.method === m ? 'border-brand bg-brand text-white' : 'border-slate-300'}`}>{form.method === m && '✓'}</span>
                {m}
              </button>
            ))}
          </div>
          {form.method === 'Credit Card' && (
            <>
              <label className="block text-xs text-slate-400">Card Number
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
                  <input name="cardNumber" value={form.cardNumber} onChange={change} placeholder="5890 - 6858 - 6332 - 9843" className="flex-1 bg-transparent text-sm outline-none" />
                  <span className="h-3 w-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
                </div>
              </label>
              {field('cardHolder', 'Card Holder')}
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs text-slate-400">Month<select name="month" value={form.month} onChange={change} className={inputClass}>{Array.from({ length: 12 }, (_, i) => <option key={i}>{i + 1}</option>)}</select></label>
                <label className="block text-xs text-slate-400">Year<select name="year" value={form.year} onChange={change} className={inputClass}>{['2023', '2024', '2025', '2026'].map((y) => <option key={y}>{y}</option>)}</select></label>
              </div>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="mb-1 font-medium">Profile Details</h4>
            <p className="text-slate-500">Name: {form.firstName} {form.lastName}</p>
            <p className="text-slate-500">Email: {form.email}</p>
            <p className="text-slate-500">Phone: +1 {form.phone}</p>
          </div>
          <div>
            <h4 className="mb-1 font-medium">Address Details</h4>
            <p className="text-slate-500">Address Line 1: {form.address1}</p>
            <p className="text-slate-500">City: {form.city}</p>
            <p className="text-slate-500">Country: {form.country}</p>
            <p className="text-slate-500">State/Region: {form.state}</p>
            <p className="text-slate-500">Postcode: {form.postcode}</p>
          </div>
          {form.method === 'Credit Card' && (
            <div>
              <h4 className="mb-1 font-medium">Payment Details</h4>
              <p className="text-slate-500">Card Number: {form.cardNumber}</p>
              <p className="text-slate-500">Card Name: {form.cardHolder}</p>
              <p className="text-slate-500">Card Expiry: {form.month}/{form.year}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-lg border border-slate-200 px-5 py-2 text-sm disabled:opacity-30 dark:border-slate-700">Previous</button>
        {step < 3
          ? <button onClick={() => setStep(step + 1)} className="rounded-lg bg-brand px-5 py-2 text-sm text-white">Next Step</button>
          : <button onClick={() => onSubmit(form)} className="rounded-lg bg-brand px-5 py-2 text-sm text-white">Submit</button>}
      </div>
    </Modal>
  )
}
