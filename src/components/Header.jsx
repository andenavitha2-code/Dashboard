import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './ui/Icon.jsx'
import { ProfileAvatar } from './ui/ProfileAvatar.jsx'
import NotificationsMenu from './dashboard/NotificationsMenu.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const userMenu = [
  { label: 'My Profile', to: '/dashboard/analytics' },
  { label: 'My Messages', to: '/chat' },
  { label: 'My Tasks', to: '/dashboard/tasks' },
  { label: 'Settings', to: '/dashboard/analytics' },
  { label: 'Lock Screen', to: '/lock-screen' },
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/signup' },
  { label: 'Forgot Password', to: '/recover-password' },
  { label: 'Reset Password', to: '/reset-password' },
  { label: 'Logout', to: '/login' },
]

export default function Header({ onToggleSidebar }) {
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="relative flex h-[58px] items-center justify-between border-b border-slate-200 bg-white px-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
      <button onClick={onToggleSidebar} aria-label="Toggle sidebar"><Icon name="menu" /></button>

      {searchOpen && (
        <input autoFocus onBlur={() => setSearchOpen(false)} placeholder="Search anything..."
          className="absolute left-12 right-28 top-3 z-10 rounded-lg sm:left-14 sm:right-auto sm:w-64 border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800" />
      )}

      <div className="flex items-center gap-3 sm:gap-5">
        <button onClick={() => setSearchOpen(true)}><Icon name="search" /></button>
        <NotificationsMenu />
        <button onClick={toggleTheme} title="Toggle theme">
          <Icon name={isDark ? 'sun' : 'moon'} />
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-700 sm:pl-5">
          <ProfileAvatar />
          <span className="hidden text-sm font-medium sm:inline">ArtTemplate ▾</span>
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-3 top-14 z-30 w-56 sm:right-6 rounded-xl bg-white p-2 text-sm shadow-lg dark:bg-slate-800">
            <div className="mb-1 flex items-center gap-3 border-b border-slate-100 p-2 dark:border-slate-700">
              <ProfileAvatar size="h-10 w-10" />
              <div><b className="font-medium">ArtTemplate</b><br /><span className="text-xs text-slate-400">Manager</span></div>
            </div>
            {userMenu.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}
                className={`block rounded px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 ${item.label === 'Logout' ? 'text-red-400' : ''}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </header>
  )
}
