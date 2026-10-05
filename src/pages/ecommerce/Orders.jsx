import { useState } from 'react'
import { orders as orderData } from '../../data/shop.js'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Tabs from '../../components/ui/Tabs.jsx'
import StatusBadge from '../../components/ui/StatusBadge.jsx'
import Modal from '../../components/ui/Modal.jsx'
import ExportMenu from '../../components/ecommerce/ExportMenu.jsx'
import RowMenu from '../../components/ecommerce/RowMenu.jsx'
import ListToolbar from '../../components/ecommerce/ListToolbar.jsx'
import GenericFilterDrawer from '../../components/ecommerce/GenericFilterDrawer.jsx'
import ProductQuickView from '../../components/ecommerce/ProductQuickView.jsx'

const orderProducts = [
  { name: 'MacBook Pro 15 Retina Touch Bar MV902', price: 2500, qty: 1 },
  { name: 'Apple Watch Series 5 Edition GPS + Cellular', price: 1500, qty: 2 },
  { name: 'Apple iPhone 11 Pro Max 256GB Space Gray', price: 1100, qty: 1 },
]
const columns = [
  { label: 'ORDER NO.', key: 'number' }, { label: 'CUSTOMER', key: 'customer' }, { label: 'DATE', key: 'date' },
  { label: 'TOTAL', key: 'total' }, { label: 'PAYMENT', key: 'payment' }, { label: 'STATUS', key: 'status' },
]
// The Figma tabs read All / Pending / Processing / Refunded, while row badges keep their own
// Shipped / Processing / Cancelled values — this mirrors that mismatch in the source design.
const tabStatusMap = { Pending: 'Shipped', Processing: 'Processing', Refunded: 'Cancelled' }
const filterFields = [
  { key: 'payment', label: 'Payment', type: 'select', options: ['PayPal', 'Credit Card', 'Payoneer'] },
  { key: 'status', label: 'Status', type: 'select', options: ['Shipped', 'Processing', 'Cancelled'] },
]

export default function Orders() {
  const [orders, setOrders] = useState(orderData)
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ payment: '', status: '' })
  const [showFilter, setShowFilter] = useState(false)
  const [sort, setSort] = useState({ key: null, dir: 1 })
  const [page, setPage] = useState(1)
  const [openOrder, setOpenOrder] = useState(null)
  const [detailTab, setDetailTab] = useState('Order Details')
  const [quickViewProduct, setQuickViewProduct] = useState(false)
  const [selected, setSelected] = useState([])
  const pageSize = 10

  let rows = tab === 'All' ? orders : orders.filter((o) => o.status === tabStatusMap[tab])
  if (filters.payment) rows = rows.filter((o) => o.payment === filters.payment)
  if (filters.status) rows = rows.filter((o) => o.status === filters.status)
  if (search) rows = rows.filter((o) => JSON.stringify(o).toLowerCase().includes(search.toLowerCase()))
  if (sort.key) rows = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? sort.dir : a[sort.key] < b[sort.key] ? -sort.dir : 0))

  const start = (page - 1) * pageSize
  const pageRows = rows.slice(start, start + pageSize)
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))

  const tabs = [
    { label: 'All', count: orders.length },
    { label: 'Pending', count: orders.filter((o) => o.status === tabStatusMap.Pending).length },
    { label: 'Processing', count: orders.filter((o) => o.status === tabStatusMap.Processing).length },
    { label: 'Refunded', count: orders.filter((o) => o.status === tabStatusMap.Refunded).length },
  ]
  const subtotal = orderProducts.reduce((sum, p) => sum + p.price * p.qty, 0)

  function openDetails(order) {
    setOpenOrder(order)
    setDetailTab('Order Details')
  }
  function deleteOrder(id) {
    setOrders(orders.filter((o) => o.id !== id))
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
    setOrders(orders.filter((x) => !selected.includes(x.id)))
    setSelected([])
  }

  return (
    <div>
      <PageHeader title="Orders" right={<ExportMenu rows={rows} filename="orders" />} />
      <div className="mb-5"><Tabs tabs={tabs} active={tab} onChange={(t) => { setTab(t); setPage(1) }} /></div>

      <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
        <ListToolbar
          search={search} onSearch={(v) => { setSearch(v); setPage(1) }} placeholder="Search order..."
          onFilter={() => setShowFilter(true)} rows={rows} filename="orders"
          actions={<>
            <button onClick={() => setOrders(orders.map((o) => o.status === 'Processing' ? { ...o, status: 'Shipped' } : o))} className="block w-full rounded px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700">Mark Processing as Shipped</button>
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
                <tr key={row.id} onClick={() => openDetails(row)} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50/60 dark:border-slate-800 dark:hover:bg-slate-800/60">
                  <td className="p-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleOne(row.id)} /></td>
                  <td className="p-3">{row.number}</td><td>{row.customer}</td><td>{row.date}</td><td>{row.total}</td><td>{row.payment}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td><RowMenu onEdit={() => openDetails(row)} onDelete={() => deleteOrder(row.id)} /></td>
                </tr>
              ))}
              {pageRows.length === 0 && <tr><td colSpan={8} className="py-10 text-center text-slate-400">No orders found.</td></tr>}
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

      {openOrder && (
        <Modal title={`Orders ${openOrder.number}`} onClose={() => setOpenOrder(null)} width="max-w-2xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Tabs tabs={[{ label: 'Order Details' }, { label: 'Products' }, { label: 'Invoice' }]} active={detailTab} onChange={setDetailTab} />
            <ExportMenu rows={orderProducts} filename={`order-${openOrder.number}`} />
          </div>
          <div className="text-sm">
            {detailTab === 'Order Details' && (
              <div className="space-y-2">
                <p><span className="text-slate-400">Customer:</span> {openOrder.customer}</p>
                <p><span className="text-slate-400">Payment method:</span> {openOrder.payment}</p>
                <p><span className="text-slate-400">Total:</span> {openOrder.total}</p>
                <p><span className="text-slate-400">Status:</span> <StatusBadge status={openOrder.status} /></p>
              </div>
            )}
            {detailTab === 'Products' && orderProducts.map((p) => (
              <button key={p.name} onClick={() => setQuickViewProduct(true)} className="flex w-full justify-between border-b border-slate-100 py-2 text-left hover:text-brand dark:border-slate-800">
                <span>{p.name}</span><span>${p.price} × {p.qty}</span>
              </button>
            ))}
            {detailTab === 'Invoice' && (
              <div>
                <p className="mb-2 text-lg">Invoice {openOrder.number}</p>
                {orderProducts.map((p) => <p key={p.name} className="flex justify-between"><span>{p.name}</span><span>${p.price * p.qty}</span></p>)}
                <p className="mt-3 flex justify-between border-t pt-2 font-medium dark:border-slate-700"><span>Subtotal</span><span>${subtotal}</span></p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {quickViewProduct && <ProductQuickView onClose={() => setQuickViewProduct(false)} />}
    </div>
  )
}
