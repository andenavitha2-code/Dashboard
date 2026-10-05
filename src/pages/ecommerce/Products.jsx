import { useState } from 'react'
import { products as productData } from '../../data/shop.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Tabs from '../../components/ui/Tabs.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import ExportMenu from '../../components/ecommerce/ExportMenu.jsx'
import RowMenu from '../../components/ecommerce/RowMenu.jsx'
import ProductFilterDrawer from '../../components/ecommerce/ProductFilterDrawer.jsx'
import AddProductModal from '../../components/ecommerce/AddProductModal.jsx'

const columns = [
  { label: 'PRODUCT NAME', key: 'name' }, { label: 'PRODUCT NO.', key: 'number' }, { label: 'CATEGORY', key: 'category' },
  { label: 'DATE', key: 'date' }, { label: 'PRICE', key: 'price' }, { label: 'STATUS', key: 'status' },
]

export default function Products() {
  const [products, setProducts] = useState(productData)
  const [tab, setTab] = useState('All')
  const [view, setView] = useState('list')                 // 'list' or 'grid'
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ category: '', status: '', minPrice: '', maxPrice: '' })
  const [showFilter, setShowFilter] = useState(false)
  const [sort, setSort] = useState({ key: null, dir: 1 })
  const [selected, setSelected] = useState([])
  const [modal, setModal] = useState(null)                 // null | 'add' | product being edited
  const [page, setPage] = useState(1)
  const pageSize = 10

  let rows = tab === 'All' ? products : products.filter((p) => p.status === tab)
  if (filters.category) rows = rows.filter((p) => p.category === filters.category)
  if (filters.status) rows = rows.filter((p) => p.status === filters.status)
  if (filters.minPrice) rows = rows.filter((p) => parseFloat(p.price.replace(/[^0-9.]/g, '')) >= Number(filters.minPrice))
  if (filters.maxPrice) rows = rows.filter((p) => parseFloat(p.price.replace(/[^0-9.]/g, '')) <= Number(filters.maxPrice))
  if (search) rows = rows.filter((p) => JSON.stringify(p).toLowerCase().includes(search.toLowerCase()))
  if (sort.key) {
    rows = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? sort.dir : a[sort.key] < b[sort.key] ? -sort.dir : 0))
  }

  const start = (page - 1) * pageSize
  const pageRows = rows.slice(start, start + pageSize)
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))

  const tabs = [
    { label: 'All', count: products.length },
    { label: 'Available', count: products.filter((p) => p.status === 'Available').length },
    { label: 'Disabled', count: products.filter((p) => p.status === 'Disabled').length },
  ]

  function toggleSort(key) {
    setSort({ key, dir: sort.key === key ? -sort.dir : 1 })
  }
  function toggleSelect(id) {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id])
  }
  function toggleAll() {
    setSelected(pageRows.every((r) => selected.includes(r.id)) ? [] : pageRows.map((r) => r.id))
  }
  function saveProduct(form) {
    if (modal === 'add') {
      setProducts([{ ...form, id: Date.now(), number: '#790842', date: '12.09.20', price: '$' + form.price, status: 'Available' }, ...products])
    } else {
      setProducts(products.map((p) => (p.id === modal.id ? { ...p, ...form } : p)))
    }
    setModal(null)
  }
  function deleteProduct(id) {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div>
      <PageHeader title="Products" right={<><ExportMenu rows={rows} filename="products" /><button onClick={() => setModal('add')} className="rounded-lg bg-brand px-4 py-2 text-sm text-white">+</button></>} />

      <div className="mb-5 flex items-center justify-between">
        <Tabs tabs={tabs} active={tab} onChange={(t) => { setTab(t); setPage(1) }} />
        <div className="flex gap-2">
          <button onClick={() => setView('list')} className={`rounded-lg p-2 ${view === 'list' ? 'bg-brand text-white' : 'bg-white dark:bg-slate-900'}`} title="List view">☰</button>
          <button onClick={() => setView('grid')} className={`rounded-lg p-2 ${view === 'grid' ? 'bg-brand text-white' : 'bg-white dark:bg-slate-900'}`} title="Grid view">▦</button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-slate-100 px-3 dark:bg-slate-800">
            <span className="text-slate-400">🔍</span>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Search products..."
              className="w-full bg-transparent py-2 text-sm outline-none" />
          </div>
          <button onClick={() => setShowFilter(true)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700" title="Filter">⚙</button>
          <div className="relative">
            <details className="group">
              <summary className="flex list-none items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">Actions ▾</summary>
              <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
                <button onClick={() => setProducts(products.map((p) => (selected.includes(p.id) ? { ...p, status: 'Available' } : p)))} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Mark Available</button>
                <button onClick={() => setProducts(products.map((p) => (selected.includes(p.id) ? { ...p, status: 'Disabled' } : p)))} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Mark Disabled</button>
                <button onClick={() => { setProducts(products.filter((p) => !selected.includes(p.id))); setSelected([]) }} className="block w-full rounded px-3 py-2 text-left text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700">Delete Selected</button>
              </div>
            </details>
          </div>
        </div>

        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs text-slate-400">
                <tr>
                  <th className="w-10 p-3"><input type="checkbox" onChange={toggleAll} checked={pageRows.length > 0 && pageRows.every((r) => selected.includes(r.id))} /></th>
                  {columns.map((c) => (
                    <th key={c.key} onClick={() => toggleSort(c.key)} className="cursor-pointer select-none p-3 font-normal">
                      {c.label} <span className="text-[9px]">{sort.key === c.key ? (sort.dir === 1 ? '▲' : '▼') : '▾'}</span>
                    </th>
                  ))}
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id} className={`border-t border-slate-100 dark:border-slate-800 ${selected.includes(row.id) ? 'bg-green-50/60 dark:bg-slate-800' : ''}`}>
                    <td className="p-3"><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} /></td>
                    <td className="p-3">{row.name}</td><td>{row.number}</td><td>{row.category}</td><td>{row.date}</td><td>{row.price}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td><RowMenu onEdit={() => setModal(row)} onDelete={() => deleteProduct(row.id)} /></td>
                  </tr>
                ))}
                {pageRows.length === 0 && <tr><td colSpan={8} className="py-10 text-center text-slate-400">No products found.</td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pageRows.map((row) => (
              <div key={row.id} className="relative rounded-xl border border-slate-100 p-3 dark:border-slate-800">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className={row.status === 'Available' ? 'text-green-600' : 'text-orange-500'}>{row.status}</span>
                  <input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} />
                </div>
                <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-slate-50 text-3xl text-slate-300 dark:bg-slate-800">🖼</div>
                <p className="mb-1 text-sm font-medium">{row.name}</p>
                <p className="flex justify-between text-xs text-slate-400"><span>{row.date}</span><span>{row.category}</span><span>{row.price}</span></p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <select value={pageSize} disabled className="rounded border border-slate-200 bg-transparent px-2 py-1 dark:border-slate-700"><option>{pageSize}</option></select>
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

      {showFilter && <ProductFilterDrawer filters={filters} onClose={() => setShowFilter(false)} onApply={(f) => { setFilters(f); setShowFilter(false); setPage(1) }} />}
      {modal && <AddProductModal product={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={saveProduct} />}
    </div>
  )
}
