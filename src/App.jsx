import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Gantt from './pages/Gantt.jsx'
import SocialProfile from './pages/social/SocialProfile.jsx'
import ProfileFeed from './pages/social/ProfileFeed.jsx'
import Timeline from './pages/social/Timeline.jsx'
import Sales from './pages/dashboard/Sales.jsx'
import AnalyticsPage from './pages/dashboard/AnalyticsPage.jsx'
import Finance from './pages/dashboard/Finance.jsx'
import Traffic from './pages/dashboard/Traffic.jsx'
import TasksPage from './pages/dashboard/TasksPage.jsx'
import WalletPage from './pages/dashboard/WalletPage.jsx'
import FileManager from './pages/FileManager.jsx'
import Notes from './pages/Notes.jsx'
import Contacts from './pages/Contacts.jsx'
import Tasks from './pages/Tasks.jsx'
import Calendar from './pages/Calendar.jsx'
import Mail from './pages/Mail.jsx'
import Chat from './pages/Chat.jsx'
import Products from './pages/ecommerce/Products.jsx'
import Orders from './pages/ecommerce/Orders.jsx'
import Customers from './pages/ecommerce/Customers.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import RecoverPassword from './pages/auth/RecoverPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import LockScreen from './pages/auth/LockScreen.jsx'
import NotFound from './pages/auth/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/lock-screen" element={<LockScreen />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Sales />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/finance" element={<Finance />} />
        <Route path="/dashboard/traffic" element={<Traffic />} />
        <Route path="/dashboard/tasks" element={<TasksPage />} />
        <Route path="/dashboard/wallet" element={<WalletPage />} />
        <Route path="/ecommerce/products" element={<Products />} />
        <Route path="/ecommerce/orders" element={<Orders />} />
        <Route path="/ecommerce/customers" element={<Customers />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/gantt" element={<Gantt />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/social/profile" element={<SocialProfile />} />
        <Route path="/social/profile-feed" element={<ProfileFeed />} />
        <Route path="/social/timeline" element={<Timeline />} />
        <Route path="/social" element={<Navigate to="/social/profile" />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
