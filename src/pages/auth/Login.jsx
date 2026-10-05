import { Link, useNavigate } from 'react-router-dom'
import { Field, AuthLink, AuthForm, GoogleButton, Divider, CheckBox, buttonClass } from '../../layouts/AuthLayout.jsx'

export default function Login() {
  const navigate = useNavigate()
  return (
    <AuthForm onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}
      footer={<AuthLink text="Don't have an account?" to="/signup" label="Sign Up" />}>
      <h1 className="mb-8 text-center text-xl font-medium text-slate-700 dark:text-slate-100">Login To Your Account</h1>
      <GoogleButton>Login with Google</GoogleButton>
      <Divider text="Or login with email" />
      <Field label="Email" defaultValue="cooper@example.com" />
      <Field label="Password" type="password" defaultValue="12345678" />
      <div className="mb-5 flex items-center justify-between text-xs">
        <CheckBox>Remember Me</CheckBox>
        <Link to="/recover-password" className="text-brand">Forgot Password?</Link>
      </div>
      <button className={buttonClass}>Log In</button>
    </AuthForm>
  )
}
