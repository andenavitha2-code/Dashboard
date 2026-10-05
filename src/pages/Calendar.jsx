import { useState } from 'react'
import { calendars as initialCalendars, calendarSwatches, initialEvents } from '../data/work.js'
import Modal from '../components/ui/Modal.jsx'
import NewCalendarModal from '../components/calendar/NewCalendarModal.jsx'
import CalendarMenu from '../components/calendar/CalendarMenu.jsx'
import EventPopover from '../components/calendar/EventPopover.jsx'

const dayNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'
const TODAY_KEY = '2020-09-08'          // the mock "today" the whole demo is built around
const HOURS = Array.from({ length: 24 }, (_, i) => i)

function fromKey(dateStr) {
  return new Date(dateStr + 'T00:00:00')     // parse as local midnight, not UTC
}
function toKey(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
}
function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}
function fmtHour(h) {
  const hour = Math.floor(h)
  const period = hour < 12 ? 'AM' : 'PM'
  const display = hour % 12 === 0 ? 12 : hour % 12
  return `${display}:${h % 1 ? '30' : '00'} ${period}`
}
function emptyForm(dateKey) {
  return { title: '', description: '', start: dateKey, end: dateKey, allDay: false, startHour: '10:00', endHour: '11:30', calendar: 'Meeting' }
}

export default function Calendar() {
  const [current, setCurrent] = useState(new Date(2020, 8, 8))     // September 8, 2020 like in Figma
  const [view, setView] = useState('Month')
  const [events, setEvents] = useState(initialEvents)
  const [cals, setCals] = useState(initialCalendars)
  const [hidden, setHidden] = useState([])                         // calendar names switched off
  const [showNewCalendar, setShowNewCalendar] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm(TODAY_KEY))
  const [popoverEvent, setPopoverEvent] = useState(null)

  const calOf = (name) => cals.find((c) => c.name === name) || cals[0]
  const visibleEvents = events.filter((e) => !hidden.includes(e.calendar))

  // ---- Month grid: hardcoded for September 2020 so it matches the Figma exactly; real date math otherwise ----
  let days = []
  if (view === 'Month') {
    if (current.getFullYear() === 2020 && current.getMonth() === 8) {
      days = Array.from({ length: 35 }, (_, i) => addDays(new Date(2020, 7, 30), i))   // 30 Aug ... 3 Oct
    } else {
      const first = new Date(current.getFullYear(), current.getMonth(), 1)
      const offset = (first.getDay() + 6) % 7
      days = Array.from({ length: 35 }, (_, i) => addDays(first, i - offset))
    }
  } else if (view === 'Week') {
    const monday = addDays(current, -((current.getDay() + 6) % 7))
    days = Array.from({ length: 7 }, (_, i) => addDays(monday, i))
  } else {
    days = [current]
  }
  const weeks = view === 'Month' ? Array.from({ length: days.length / 7 }, (_, i) => days.slice(i * 7, i * 7 + 7)) : []

  function goto(direction) {
    if (view === 'Month') setCurrent(new Date(current.getFullYear(), current.getMonth() + direction, 1))
    else setCurrent(addDays(current, direction * (view === 'Week' ? 7 : 1)))
  }
  function toggleCalendar(name) {
    setHidden(hidden.includes(name) ? hidden.filter((h) => h !== name) : [...hidden, name])
  }
  function displayOnly(name) {
    setHidden(cals.filter((c) => c.name !== name).map((c) => c.name))
  }
  function deleteCalendar(name) {
    setCals(cals.filter((c) => c.name !== name))
    setEvents(events.filter((e) => e.calendar !== name))
  }
  function recolorCalendar(name, swatch) {
    setCals(cals.map((c) => (c.name === name ? { ...c, ...swatch } : c)))
  }
  function renameCalendar(name) {
    const next = window.prompt('Rename calendar', name)
    if (!next || !next.trim() || next === name || cals.some((c) => c.name === next.trim())) return
    const newName = next.trim()
    setCals(cals.map((c) => (c.name === name ? { ...c, name: newName } : c)))
    setEvents(events.map((e) => (e.calendar === name ? { ...e, calendar: newName } : e)))
    setHidden(hidden.map((h) => (h === name ? newName : h)))
  }
  function createCalendar(cal) {
    setCals([...cals, cal])
    setShowNewCalendar(false)
  }

  function openNewEventForm(dateKey) {
    setEditingId(null)
    setForm(emptyForm(dateKey))
    setShowForm(true)
  }
  function openEditForm(event) {
    setPopoverEvent(null)
    setEditingId(event.id)
    setForm({
      title: event.title, description: event.description || '', start: event.start, end: event.end, allDay: false,
      startHour: fmtHour(event.startHour).slice(0, 5), endHour: fmtHour(event.endHour).slice(0, 5), calendar: event.calendar,
    })
    setShowForm(true)
  }
  function saveEvent(e) {
    e.preventDefault()
    const [sh, sm] = form.startHour.split(':').map(Number)
    const [eh, em] = form.endHour.split(':').map(Number)
    const payload = {
      title: form.title, description: form.description, start: form.start, end: form.end || form.start,
      startHour: form.allDay ? 0 : sh + sm / 60, endHour: form.allDay ? 24 : eh + em / 60, calendar: form.calendar,
    }
    if (editingId) setEvents(events.map((ev) => (ev.id === editingId ? { ...ev, ...payload } : ev)))
    else setEvents([...events, { ...payload, id: Date.now() }])
    setShowForm(false)
  }
  function deleteEvent(id) {
    setEvents(events.filter((e) => e.id !== id))
    setPopoverEvent(null)
  }

  const colorOf = (name) => calOf(name).bg + ' ' + calOf(name).text + ' border-l-4 ' + calOf(name).border

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-52">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs text-slate-400">CALENDARS</h3>
          <button onClick={() => setShowNewCalendar(true)} className="text-brand">+</button>
        </div>
        {cals.map((c) => (
          <div key={c.name} className="mb-2 flex items-center justify-between text-sm">
            <label className="flex flex-1 cursor-pointer items-center gap-2">
              <input type="checkbox" checked={!hidden.includes(c.name)} onChange={() => toggleCalendar(c.name)} />
              <span className={`h-2.5 w-2.5 rounded-sm ${c.dot}`} /> {c.name}
            </label>
            <CalendarMenu cal={c}
              onDisplayOnly={() => displayOnly(c.name)}
              onHide={() => toggleCalendar(c.name)}
              onDelete={() => deleteCalendar(c.name)}
              onSettings={() => renameCalendar(c.name)}
              onRecolor={(swatch) => recolorCalendar(c.name, swatch)} />
          </div>
        ))}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-normal sm:text-3xl">Calendar</h1>
          <button onClick={() => openNewEventForm(toKey(current))} className="rounded-lg bg-brand px-4 py-2 text-sm text-white">+ Add Event</button>
        </div>

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => goto(-1)}>‹</button><button onClick={() => goto(1)}>›</button>
            <button onClick={() => setCurrent(new Date(2020, 8, 8))} className="rounded-lg bg-white px-3 py-1.5 dark:bg-slate-900">Today</button>
          </div>
          <b className="font-medium">{current.toLocaleString('en', { month: 'long' })} <span className="text-slate-400">{current.getFullYear()}</span></b>
          <div className="flex overflow-hidden rounded-lg bg-white dark:bg-slate-900">
            {['Month', 'Week', 'Day'].map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 ${view === v ? 'bg-brand text-white' : ''}`}>{v}</button>
            ))}
          </div>
        </div>

        {/* ---------- MONTH VIEW ---------- */}
        {view === 'Month' && (
          <div className="overflow-x-auto rounded-lg bg-white dark:bg-slate-900">
            <div className="grid grid-cols-7 border-b border-slate-100 text-center text-[10px] text-slate-400 dark:border-slate-800">
              {dayNames.map((d) => <div key={d} className="p-2">{d}</div>)}
            </div>
            {weeks.map((week, wi) => {
              const weekStart = week[0], weekEnd = addDays(week[6], 1)
              const weekEvents = visibleEvents.filter((e) => fromKey(e.start) < weekEnd && addDays(fromKey(e.end), 1) > weekStart)
              return (
                <div key={wi} className="border-b border-slate-100 dark:border-slate-800">
                  <div className="grid grid-cols-7">
                    {week.map((day) => (
                      <button key={toKey(day)} onClick={() => openNewEventForm(toKey(day))}
                        className="border-r border-slate-100 p-1 text-left dark:border-slate-800">
                        <span className={`inline-block rounded-md px-1.5 text-sm ${toKey(day) === TODAY_KEY ? 'bg-brand text-white' : day.getMonth() !== current.getMonth() ? 'text-slate-300' : ''}`}>
                          {day.getDate()}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-0.5 pb-1" style={{ gridAutoRows: '20px' }}>
                    {weekEvents.map((ev) => {
                      const sCol = Math.max(0, Math.round((fromKey(ev.start) - weekStart) / 86400000))
                      const eCol = Math.min(6, Math.round((fromKey(ev.end) - weekStart) / 86400000))
                      return (
                        <button key={ev.id} onClick={(e) => { e.stopPropagation(); setPopoverEvent(ev) }}
                          style={{ gridColumn: `${sCol + 1} / ${eCol + 2}` }}
                          className={`mx-0.5 flex items-center justify-between truncate rounded px-2 text-left text-[11px] ${colorOf(ev.calendar)}`}>
                          <span className="truncate">{ev.title}</span>
                          <span className="ml-1 flex items-center gap-1 whitespace-nowrap">
                            {fmtHour(ev.startHour).replace(' AM', '').replace(' PM', '')}
                            {ev.extra && <span className="rounded bg-white/70 px-1 text-[10px] dark:bg-black/20">+{ev.extra}</span>}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ---------- WEEK / DAY TIME GRID ---------- */}
        {(view === 'Week' || view === 'Day') && (
          <div className="overflow-x-auto rounded-lg bg-white dark:bg-slate-900">
           <div className={view === 'Week' ? 'min-w-[720px]' : ''}>
            {view === 'Day' && (
              <p className="border-b border-slate-100 p-3 text-xs text-slate-400 dark:border-slate-800">
                {days[0].toLocaleDateString('en', { weekday: 'long', day: 'numeric' }).toUpperCase()}
              </p>
            )}
            <div className={`grid ${view === 'Week' ? 'grid-cols-[50px_repeat(7,1fr)]' : 'grid-cols-[50px_1fr]'}`}>
              {view === 'Week' && (
                <>
                  <div />
                  {days.map((d) => (
                    <div key={toKey(d)} className="border-l border-slate-100 p-2 text-center text-xs dark:border-slate-800">
                      <span className="text-slate-400">{dayNames[(d.getDay() + 6) % 7].slice(0, 2)}</span>{' '}
                      <span className={toKey(d) === TODAY_KEY ? 'rounded-full bg-brand px-1.5 text-white' : ''}>{d.getDate()}</span>
                    </div>
                  ))}
                </>
              )}
              {view === 'Day' && <div />}
              {view === 'Day' && <div className="border-l border-slate-100 dark:border-slate-800" />}
            </div>

            <div className="relative" style={{ display: 'grid', gridTemplateColumns: view === 'Week' ? '50px repeat(7, 1fr)' : '50px 1fr' }}>
              <div>
                {HOURS.map((h) => <div key={h} className="flex h-14 items-start justify-end border-t border-slate-50 pr-2 text-[10px] text-slate-400 dark:border-slate-800">{String(h).padStart(2, '0')}:00</div>)}
              </div>
              {days.map((d) => {
                const dayEvents = visibleEvents.filter((e) => toKey(d) >= e.start && toKey(d) <= e.end)
                const isToday = toKey(d) === TODAY_KEY
                return (
                  <div key={toKey(d)} className="relative border-l border-slate-100 dark:border-slate-800">
                    {HOURS.map((h) => <div key={h} className="h-14 border-t border-slate-50 dark:border-slate-800" />)}
                    {isToday && (
                      <div className="absolute inset-x-0 z-10 flex items-center" style={{ top: 6.5 * 56 }}>
                        <span className="-ml-1 h-2 w-2 rounded-full bg-red-500" /><div className="h-px flex-1 bg-red-500" />
                      </div>
                    )}
                    {dayEvents.map((ev) => (
                      <button key={ev.id} onClick={() => setPopoverEvent(ev)}
                        style={{ top: ev.startHour * 56, height: Math.max(28, (ev.endHour - ev.startHour) * 56) }}
                        className={`absolute inset-x-1 overflow-hidden rounded px-2 py-1 text-left text-[11px] ${colorOf(ev.calendar)}`}>
                        <div>{fmtHour(ev.startHour)} - {fmtHour(ev.endHour)}</div>
                        <div className="font-medium">{ev.title}</div>
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
           </div>
          </div>
        )}
      </div>

      {showNewCalendar && <NewCalendarModal onClose={() => setShowNewCalendar(false)} onCreate={createCalendar} />}

      {showForm && (
        <Modal title={editingId ? 'Edit Event' : 'New Event'} onClose={() => setShowForm(false)}>
          <form onSubmit={saveEvent} className="space-y-3 text-xs text-slate-400">
            <label className="block">Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} /></label>
            <label className="block">Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="2" placeholder="Type something" className={inputClass} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">Start Date<input type="date" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} className={inputClass} /></label>
              <label className="block">End Date<input type="date" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} className={inputClass} /></label>
            </div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.allDay} onChange={(e) => setForm({ ...form, allDay: e.target.checked })} /> All Day</label>
            {!form.allDay && (
              <div className="grid grid-cols-2 gap-3">
                <label className="block">Start Time<input type="time" value={form.startHour} onChange={(e) => setForm({ ...form, startHour: e.target.value })} className={inputClass} /></label>
                <label className="block">End Time<input type="time" value={form.endHour} onChange={(e) => setForm({ ...form, endHour: e.target.value })} className={inputClass} /></label>
              </div>
            )}
            <label className="block">Calendar
              <select value={form.calendar} onChange={(e) => setForm({ ...form, calendar: e.target.value })} className={inputClass}>
                {cals.map((c) => <option key={c.name}>{c.name}</option>)}
              </select>
            </label>
            <div className="text-right"><button className="rounded-lg bg-brand px-6 py-2 text-sm text-white">{editingId ? 'Save' : 'Create'}</button></div>
          </form>
        </Modal>
      )}

      {popoverEvent && (
        <EventPopover event={popoverEvent} cal={calOf(popoverEvent.calendar)} onClose={() => setPopoverEvent(null)}
          onEdit={() => openEditForm(popoverEvent)} onDelete={() => deleteEvent(popoverEvent.id)} />
      )}
    </div>
  )
}
