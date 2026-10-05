import { useNavigate } from 'react-router-dom'
import { Field, AuthLink, AuthForm, buttonClass } from '../../layouts/AuthLayout.jsx'
import { ProfileAvatar } from '../../components/ui/ProfileAvatar.jsx'

export default function LockScreen() {
  const navigate = useNavigate()
  return (
    <AuthForm onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}
      footer={<AuthLink text="Not you?" to="/login" label="Sign In" />}>
      {/* swap ProfileAvatar for <img src={...} className="h-36 w-36 rounded-full object-cover sm:h-[200px] sm:w-[200px]" /> when you have the photo */}
      <div className="mx-auto mb-6 w-fit"><ProfileAvatar size="h-36 w-36 sm:h-[200px] sm:w-[200px]" /></div>
      <h1 className="text-center text-xl font-medium text-slate-700 dark:text-slate-100">Ronald Robertson</h1>
      <p className="mb-8 mt-2 text-center text-xs text-slate-400">Enter your password to access the admin.</p>
      <Field label="Password" type="password" defaultValue="12345678" />
      <button className={buttonClass}>Unlock</button>
    </AuthForm>
  )
}
