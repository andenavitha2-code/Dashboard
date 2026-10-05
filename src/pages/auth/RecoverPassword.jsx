import { useNavigate } from 'react-router-dom'
import { Field, AuthLink, AuthForm, LockIcon, buttonClass } from '../../layouts/AuthLayout.jsx'

export default function RecoverPassword() {
  const navigate = useNavigate()
  return (
    <AuthForm onSubmit={(e) => { e.preventDefault(); navigate('/reset-password') }} footer={<AuthLink text="Go back to" to="/login" label="Login" />}>
      <LockIcon />
      <h1 className="mb-8 text-center text-xl font-medium text-slate-700 dark:text-slate-100">Recover Your Password</h1>
      <Field label="Email" defaultValue="cooper@example.com" />
      <button className={buttonClass}>Recover Password</button>
    </AuthForm>
  )
}
