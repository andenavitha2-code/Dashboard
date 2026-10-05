import { useState } from 'react'
import { customers as customerData } from '../../data/shop.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Tabs from '../../components/ui/Tabs.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import { Avatar } from '../../components/ui/Avatar.jsx'
import ExportMenu from '../../components/ecommerce/ExportMenu.jsx'
import RowMenu from '../../components/ecommerce/RowMenu.jsx'
import ListToolbar from '../../components/ecommerce/ListToolbar.jsx'
import GenericFilterDrawer from '../../components/ecommerce/GenericFilterDrawer.jsx'
import AddCustomerWizard from '../../components/ecommerce/AddCustomerWizard.jsx'

const columns = [
  { label: 'CUSTOMER NAME', key: 'name' }, { label: 'LOCATION', key: 'location' },
  { label: 'PHONE', key: 'phone' }, { label: 'DATE', key: 'date' }, { label: 'STATUS', key: 'status' },
]
const filterFields = [{ key: 'status', label: 'Status', type: 'select', options: ['Active', 'Blocked'] }]

export default function Customers() {
  const [customers, setCustomers] = useState(customerData)
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ status: '' })
  const [showFilter, setShowFilter] = useState(false)
  const [sort, setSort] = useState({ key: null, dir: 1 })
  const [page, setPage] = useState(1)
  const [showWizard, setShowWizard] = useState(false)
  const [selected, setSelected] = useState([])
  const pageSize = 10

  let rows = tab === 'All' ? customers : customers.filter((c) => c.status === tab)
  if (filters.status) rows = rows.filter((c) => c.status === filters.status)
  if (search) rows = rows.filter((c) => JSON.stringify(c).toLowerCase().includes(search.toLowerCase()))
  if (sort.key) rows = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? sort.dir : a[sort.key] < b[sort.key] ? -sort.dir : 0))

  const start = (page - 1) * pageSize
  const pageRows = rows.slice(start, start + pageSize)
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))

  const tabs = [
    { label: 'All', count: customers.length },
    { label: 'Active', count: customers.filter((c) => c.status === 'Active').length },
    { label: 'Blocked', count: customers.filter((c) => c.status === 'Blocked').length },
  ]

  function deleteCustomer(id) {
    setCustomers(customers.filter((c) => c.id !== id))
  }
  function submitWizard(form) {
    const newCustomer = { id: Date.now(), name: `${form.firstName} ${form.lastName}`, email: form.email, location: `${form.city}, ${form.country}`, phone: form.phone, date: '12.09.20', status: form.status }
    setCustomers([newCustomer, ...customers])
    setShowWizard(false)
  }

  function toggleOne(id) {
    setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id])
  }
  function toggleAll() {
    const ids = pageRows.map((r) => r.id)
    setSelected(ids.every((id) => selected.includes(id)) ? selected.filter((id) => !ids.includes(id)) : [...new Set([...selected, ...ids])])
  }
  function deleteSelected() {
    if (selected.length === 0) return
    setCustomers(customers.filter((c) => !selected.includes(c.id)))
    setSelected([])
  }

  return (
    <div>
      <PageHeader title="Customers" right={<><ExportMenu rows={rows} filename="customers" /><button onClick={() => setShowWizard(true)} className="rounded-lg bg-brand px-4 py-2 text-sm text-white">+</button></>} />
      <div className="mb-5"><Tabs tabs={tabs} active={tab} onChange={(t) => { setTab(t); setPage(1) }} /></div>

      <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
        <ListToolbar
          search={search} onSearch={(v) => { setSearch(v); setPage(1) }} placeholder="Search customer..."
          onFilter={() => setShowFilter(true)} rows={rows} filename="customers"
          actions={<>
            <button onClick={() => setCustomers(customers.map((c) => c.status === 'Active' ? { ...c, status: 'Blocked' } : c))} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Block Active</button>
            <button onClick={deleteSelected} className="block w-full rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">Delete Selected{selected.length ? ` (${selected.length})` : ''}</button>
          </>}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs text-slate-400">
              <tr>
                <th className="w-10 p-3"><input type="checkbox" checked={pageRows.length > 0 && pageRows.every((r) => selected.includes(r.id))} onChange={toggleAll} /></th>
                {columns.map((c) => (
                  <th key={c.key} onClick={() => setSort({ key: c.key, dir: sort.key === c.key ? -sort.dir : 1 })} className="cursor-pointer select-none p-3 font-normal">
                    {c.label} <span className="text-[9px]">{sort.key === c.key ? (sort.dir === 1 ? '▲' : '▼') : '▾'}</span>
                  </th>
                ))}
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="p-3"><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleOne(row.id)} /></td>
                  <td className="p-3"><div className="flex items-center gap-3"><Avatar name={row.name} /><span>{row.name}<br /><span className="text-xs text-slate-400">{row.email}</span></span></div></td>
                  <td>{row.location}</td><td>{row.phone}</td><td>{row.date}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td><RowMenu onEdit={() => {}} onDelete={() => deleteCustomer(row.id)} /></td>
                </tr>
              ))}
              {pageRows.length === 0 && <tr><td colSpan={7} className="py-10 text-center text-slate-400">No customers found.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <select disabled className="rounded border border-slate-200 bg-transparent px-2 py-1 dark:border-slate-700"><option>{pageSize}</option></select>
            Showing {rows.length === 0 ? 0 : start + 1} - {Math.min(start + pageSize, rows.length)} of {rows.length}
          </div>
          <div className="flex gap-1">
            <button disabled={page === 1} onClick={() => setPage(1)} className="rounded bg-slate-100 px-2 py-1 disabled:opacity-40 dark:bg-slate-800">«</button>
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded bg-slate-100 px-2 py-1 disabled:opacity-40 dark:bg-slate-800">‹</button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`rounded px-2.5 py-1 ${page === i + 1 ? 'bg-brand text-white' : ''}`}>{i + 1}</button>
            ))}
            <button disabled={page === pageCount} onClick={() => setPage(page + 1)} className="rounded bg-slate-100 px-2 py-1 disabled:opacity-40 dark:bg-slate-800">›</button>
            <button disabled={page === pageCount} onClick={() => setPage(pageCount)} className="rounded bg-slate-100 px-2 py-1 disabled:opacity-40 dark:bg-slate-800">»</button>
          </div>
        </div>
      </div>

      {showFilter && <GenericFilterDrawer fields={filterFields} filters={filters} onApply={setFilters} onClose={() => setShowFilter(false)} />}
      {showWizard && <AddCustomerWizard onClose={() => setShowWizard(false)} onSubmit={submitWizard} />}
    </div>
  )
}
