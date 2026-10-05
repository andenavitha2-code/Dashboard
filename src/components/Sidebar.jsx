import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Icon from './ui/Icon.jsx'

const menu = [
  { label: 'Dashboard', icon: 'home', to: '/dashboard' },
  { label: 'E-Commerce', icon: 'cart', children: [
    { label: 'Products', to: '/ecommerce/products' },
    { label: 'Orders', to: '/ecommerce/orders' },
    { label: 'Customers', to: '/ecommerce/customers' },
  ] },
  { label: 'Calendar', icon: 'calendar', to: '/calendar' },
  { label: 'Mail', icon: 'mail', to: '/mail', badge: 8 },
  { label: 'Chat', icon: 'chat', to: '/chat' },
  { label: 'Tasks', icon: 'tasks', to: '/tasks' },
  { label: 'Projects', icon: 'layers', to: '/projects' },
  { label: 'File Manager', icon: 'folder', to: '/file-manager' },
  { label: 'Notes', icon: 'file', to: '/notes' },
  { label: 'Contacts', icon: 'book', to: '/contacts' },
  { label: 'Social', icon: 'chat', children: [
    { label: 'Profile', to: '/social/profile' },
    { label: 'Profile Feed', to: '/social/profile-feed' },
    { label: 'Timeline', to: '/social/timeline' },
  ] },
]

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
    isActive ? 'bg-lime-active font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`

export default function Sidebar({ collapsed, mobileOpen = false, onClose = () => {} }) {
  const { pathname } = useLocation()
  const [openLabel, setOpenLabel] = useState(pathname.startsWith('/social') ? 'Social' : '')   // which submenu is open
  const [search, setSearch] = useState('')

  // when searching, show items (and submenu children) whose label matches
  const query = search.trim().toLowerCase()
  const visibleMenu = query
    ? menu
        .map((item) => {
          if (item.children) {
            const children = item.children.filter((c) => c.label.toLowerCase().includes(query))
            if (item.label.toLowerCase().includes(query)) return item
            return children.length ? { ...item, children } : null
          }
          return item.label.toLowerCase().includes(query) ? item : null
        })
        .filter(Boolean)
    : menu

  return (
    <>
    {/* dark backdrop behind the mobile drawer */}
    {mobileOpen && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={onClose} />}
    <aside className={`fixed inset-y-0 left-0 z-40 w-[244px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 md:static md:z-auto md:translate-x-0 md:overflow-visible ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'md:w-[54px]' : 'md:w-[244px]'}`}>
      <div className="flex h-[58px] items-center gap-2 px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-brand to-teal-400">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z" /></svg>
        </div>
        {!collapsed && <span className="text-sm font-medium">FLOWER</span>}
      </div>

      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
            <Icon name="search" size={15} className="text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything"
              className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200" />
          </div>
          <p className="mb-1 mt-5 px-3 text-[11px] tracking-wide text-slate-400">MAIN MENU</p>
        </div>
      )}

      <nav className="space-y-1 px-2">
        {query && visibleMenu.length === 0 && <p className="px-3 text-xs text-slate-400">No matches for "{search}"</p>}
        {visibleMenu.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <button onClick={() => setOpenLabel(openLabel === item.label ? '' : item.label)} className={linkClass({ isActive: false }) + ' w-full'}>
                <Icon name={item.icon} />
                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!collapsed && <Icon name="chevron" size={14} />}
              </button>
            ) : (
              <NavLink to={item.to} className={linkClass}>
                <Icon name={item.icon} />
                {!collapsed && <span className="flex-1">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="rounded-full bg-red-600 px-1.5 text-[10px] text-white">{item.badge}</span>
                )}
              </NavLink>
            )}
            {item.children && (query || openLabel === item.label) && !collapsed && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <NavLink key={child.to} to={child.to} className={linkClass}>{child.label}</NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
    </>
  )
}
