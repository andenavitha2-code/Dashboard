const colors = {
  Available: 'bg-green-50 text-green-700', Active: 'bg-green-50 text-green-700',
  Shipped: 'bg-green-50 text-green-700', Disabled: 'bg-orange-50 text-orange-600',
  Processing: 'bg-orange-50 text-orange-600', Blocked: 'bg-orange-50 text-orange-600',
  Cancelled: 'bg-red-50 text-red-600',
}

export default function StatusBadge({ status }) {
  return <span className={`rounded px-2 py-0.5 text-xs ${colors[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>
}
