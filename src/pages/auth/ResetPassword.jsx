import { useNavigate } from 'react-router-dom'
import { Field, AuthLink, AuthForm, LockIcon, buttonClass } from '../../layouts/AuthLayout.jsx'

export default function ResetPassword() {
  const navigate = useNavigate()
  return (
    <AuthForm onSubmit={(e) => { e.preventDefault(); navigate('/login') }} footer={<AuthLink text="Go back to" to="/login" label="Login" />}>
      <LockIcon />
      <h1 className="mb-8 text-center text-xl font-medium text-slate-700 dark:text-slate-100">Reset Your Password</h1>
      <Field label="Email" defaultValue="cooper@example.com" />
      <Field label="Password" type="password" defaultValue="12345678" />
      <Field label="Confirm Password" type="password" defaultValue="12345678" />
      <button className={buttonClass}>Reset Password</button>
    </AuthForm>
  )
}
