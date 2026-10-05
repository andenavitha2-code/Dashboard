import { NavLink } from 'react-router-dom'

const variants = [
  { label: 'Sales', to: '/dashboard' },
  { label: 'Analytics', to: '/dashboard/analytics' },
  { label: 'Finance', to: '/dashboard/finance' },
  { label: 'Traffic', to: '/dashboard/traffic' },
  { label: 'Tasks', to: '/dashboard/tasks' },
  { label: 'Wallet', to: '/dashboard/wallet' },
]

// The Figma template ships each of these as its own demo home page.
// This row is our own addition so all six stay reachable from one place.
export default function VariantNav() {
  return (
    <div className="mb-5 flex flex-wrap gap-2 text-xs">
      {variants.map((v) => (
        <NavLink key={v.to} to={v.to} end={v.to === '/dashboard'}
          className={({ isActive }) => `rounded-lg px-3 py-1.5 ${isActive ? 'bg-brand text-white' : 'bg-white text-slate-500 dark:bg-slate-900'}`}>
          {v.label}
        </NavLink>
      ))}
    </div>
  )
}
