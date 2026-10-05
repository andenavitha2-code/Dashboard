import { useState } from 'react'
import AreaChart from '../../components/charts/AreaChart.jsx'
import Modal from '../../components/ui/Modal.jsx'
import MoreMenu from '../../components/ui/MoreMenu.jsx'
import { Avatar } from '../../components/ui/Avatar.jsx'
import { ProfileAvatar } from '../../components/ui/ProfileAvatar.jsx'
import * as d from '../../data/dashboard.js'

const card = 'rounded-lg bg-white p-5 dark:bg-slate-900'
const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'

export default function Wallet() {
  const [cards, setCards] = useState(d.walletCards)
  const [contacts, setContacts] = useState(d.walletContacts)
  const [activeCard, setActiveCard] = useState(0)
  const [showAddCard, setShowAddCard] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [cardForm, setCardForm] = useState({ number: '', holder: '', month: '12', year: '2023' })
  const [contactForm, setContactForm] = useState({ first: '', last: '', email: '', phone: '', job: '' })

  function addCard(e) {
    e.preventDefault()
    setCards([...cards, { balance: '0.00', holder: cardForm.holder, number: '•••• •••• •••• ' + cardForm.number.slice(-4) }])
    setShowAddCard(false)
  }
  function addContact(e) {
    e.preventDefault()
    setContacts([{ name: `${contactForm.first} ${contactForm.last}`, role: contactForm.job }, ...contacts])
    setShowAddContact(false)
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg bg-brand p-5 text-white">
            <p className="mb-3 text-xl">↑</p><p className="text-xs opacity-80">Income</p><p className="text-2xl font-medium">$5.750</p>
            <div className="mt-3 h-1 rounded-full bg-white/30"><div className="h-1 w-3/4 rounded-full bg-white" /></div>
          </div>
          <div className="rounded-lg bg-emerald-400 p-5 text-white">
            <p className="mb-3 text-xl">↓</p><p className="text-xs opacity-80">Spent</p><p className="text-2xl font-medium">$2.400</p>
            <div className="mt-3 h-1 rounded-full bg-white/30"><div className="h-1 w-2/5 rounded-full bg-white" /></div>
          </div>
        </div>

        <div className={card}>
          <div className="mb-3 flex justify-between text-xs text-slate-400"><span>↑ 24.500 Income</span><span>↓ 9.400 Spending</span></div>
          <AreaChart data={d.analyticsLine} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className={card}>
            <h3 className="mb-3 font-medium">Transactions</h3>
            {d.dashTransactions.slice(0, 3).map((t) => (
              <div key={t.name} className="mb-3 flex items-center gap-3">
                <Avatar name={t.name} size="h-9 w-9" />
                <div className="flex-1 text-sm">{t.name}<br /><span className="text-[11px] text-slate-400">{t.time}</span></div>
                <span className={`text-sm ${t.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{t.amount}</span>
              </div>
            ))}
          </div>
          <div className={card}>
            <h3 className="mb-3 font-medium">Payments</h3>
            {d.payments.slice(0, 3).map((p) => (
              <div key={p.name} className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">{p.icon}</span>
                <div className="flex-1 text-sm">{p.name}<br /><span className="text-[11px] text-slate-400">{p.time}</span></div>
                <span className={`text-sm ${p.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className={card}>
          <div className="mb-3 flex items-center gap-3"><ProfileAvatar size="h-9 w-9" /><span className="text-sm">Felecia Brown<br /><span className="text-[11px] text-slate-400">Manager</span></span></div>
        </div>
        <div className={card}>
          <div className="mb-3 flex items-center justify-between"><h3 className="font-medium">Cards</h3><button onClick={() => setShowAddCard(true)} className="text-brand">+</button></div>
          <div className="flex gap-3 overflow-x-auto">
            {cards.map((c, i) => (
              <div key={i} onClick={() => setActiveCard(i)} className="w-48 shrink-0 cursor-pointer rounded-xl bg-gradient-to-br from-brand to-emerald-400 p-4 text-white">
                <div className="mb-6 flex justify-between text-xs"><span>Current Balance</span><span>VISA</span></div>
                <p className="mb-6 text-lg font-medium">{c.balance}</p>
                <div className="flex justify-between text-[10px]"><span>{c.holder}</span><span>{c.number}</span></div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-1">{cards.map((_, i) => <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === activeCard ? 'bg-brand' : 'bg-slate-200'}`} />)}</div>
        </div>
        <div className={card}>
          <div className="mb-3 flex items-center justify-between"><h3 className="font-medium">Contacts</h3><button onClick={() => setShowAddContact(true)} className="text-brand">+</button></div>
          {contacts.map((c, i) => (
            <div key={i} className="mb-3 flex items-center gap-3 text-sm">
              <Avatar name={c.name} size="h-9 w-9" />
              <div className="flex-1">{c.name}<br /><span className="text-[11px] text-slate-400">{c.role}</span></div>
              <MoreMenu label="⋮" items={[{ label: 'Remove contact', onClick: () => setContacts(contacts.filter((_, idx) => idx !== i)) }]} />
            </div>
          ))}
        </div>
      </div>

      {showAddCard && (
        <Modal title="Add Card" onClose={() => setShowAddCard(false)}>
          <form onSubmit={addCard} className="space-y-3 text-xs text-slate-400">
            <label className="block">Card Number<input required value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })} placeholder="5890 - 6858 - 6332 - 9843" className={inputClass} /></label>
            <label className="block">Card Holder<input required value={cardForm.holder} onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value })} className={inputClass} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">Month<input value={cardForm.month} onChange={(e) => setCardForm({ ...cardForm, month: e.target.value })} className={inputClass} /></label>
              <label className="block">Year<input value={cardForm.year} onChange={(e) => setCardForm({ ...cardForm, year: e.target.value })} className={inputClass} /></label>
            </div>
            <button className="w-full rounded-lg bg-brand py-2 text-sm text-white">Add Card</button>
          </form>
        </Modal>
      )}
      {showAddContact && (
        <Modal title="Add Contact" onClose={() => setShowAddContact(false)}>
          <form onSubmit={addContact} className="space-y-3 text-xs text-slate-400">
            <div className="mx-auto mb-2 w-fit rounded-full border border-dashed border-slate-300 p-1.5"><ProfileAvatar size="h-24 w-24" /></div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">First Name<input required value={contactForm.first} onChange={(e) => setContactForm({ ...contactForm, first: e.target.value })} className={inputClass} /></label>
              <label className="block">Last Name<input value={contactForm.last} onChange={(e) => setContactForm({ ...contactForm, last: e.target.value })} className={inputClass} /></label>
            </div>
            <label className="block">Email<input value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className={inputClass} /></label>
            <label className="block">Phone<input value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} className={inputClass} /></label>
            <label className="block">Job Title<input value={contactForm.job} onChange={(e) => setContactForm({ ...contactForm, job: e.target.value })} className={inputClass} /></label>
            <button className="w-full rounded-lg bg-brand py-2 text-sm text-white">Add Contact</button>
          </form>
        </Modal>
      )}
    </div>
  )
}
