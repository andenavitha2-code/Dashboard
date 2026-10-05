import { useNavigate } from 'react-router-dom'
import { Field, AuthLink, AuthForm, GoogleButton, Divider, CheckBox, buttonClass } from '../../layouts/AuthLayout.jsx'

export default function Signup() {
  const navigate = useNavigate()
  return (
    <AuthForm onSubmit={(e) => { e.preventDefault(); navigate('/dashboard') }}
      footer={<AuthLink text="Already have an account?" to="/login" label="Login" />}>
      <h1 className="mb-8 text-center text-xl font-medium text-slate-700 dark:text-slate-100">Create Account</h1>
      <GoogleButton>Sign Up with Google</GoogleButton>
      <Divider text="Or sign up with email" />
      <Field label="Full Name" defaultValue="Regina Cooper" />
      <Field label="Email" defaultValue="cooper@example.com" />
      <Field label="Password" type="password" defaultValue="12345678" />
      <Field label="Confirm Password" type="password" defaultValue="12345678" />
      <div className="mb-5">
        <CheckBox>I accept <span className="text-brand">Terms and Conditions</span></CheckBox>
      </div>
      <button className={buttonClass}>Create Account</button>
    </AuthForm>
  )
}
