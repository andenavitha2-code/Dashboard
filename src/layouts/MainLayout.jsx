import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import Header from '../components/Header.jsx'

// true when the viewport matches the media query (used to tell desktop from mobile)
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)     // desktop: narrow icon-only sidebar
  const [mobileOpen, setMobileOpen] = useState(false)   // mobile: slide-in drawer
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { pathname } = useLocation()

  // close the drawer after navigating, or when the screen grows to desktop size
  useEffect(() => { setMobileOpen(false) }, [pathname, isDesktop])

  const toggleSidebar = () => (isDesktop ? setCollapsed((c) => !c) : setMobileOpen((o) => !o))

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={isDesktop && collapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="p-3 sm:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
