import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import illustration from '../assets/illustration.png'

// Shared styles and small pieces for the auth forms (Login, Signup, Recover, Reset, Lock screen)
export const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-300 focus:border-brand dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
export const buttonClass = 'w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark'

function EyeIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></>
      ) : (
        <><path d="M3 10c2.5 4 15.5 4 18 0" /><path d="M6 14l-1.5 2.5M10 16l-.5 3M14 16l.5 3M18 14l1.5 2.5" /></>
      )}
    </svg>
  )
}

export function Field({ label, type = 'text', defaultValue, placeholder }) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <label className="mb-5 block text-xs text-slate-400">
      {label}
      <div className="relative mt-1.5">
        <input type={isPassword && show ? 'text' : type} defaultValue={defaultValue} placeholder={placeholder}
          className={inputClass + (isPassword ? ' pr-11' : '')} />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password visibility"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700">
            <EyeIcon open={show} />
          </button>
        )}
      </div>
    </label>
  )
}

export function GoogleButton({ children }) {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate('/dashboard')} className="relative mb-6 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      <svg className="absolute left-4" width="16" height="16" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
        <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
      </svg>
      {children}
    </button>
  )
}

export function Divider({ text }) {
  return (
    <div className="mb-6 flex items-center gap-4 text-[10px] uppercase text-slate-300">
      <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />{text}<span className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
    </div>
  )
}

export function CheckBox({ children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
      <input type="checkbox" defaultChecked className="h-4 w-4 cursor-pointer rounded accent-brand" />
      {children}
    </label>
  )
}

// Round grey circle with the yellow padlock (Recover / Reset password)
export function LockIcon() {
  return (
    <div className="mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-[#f7f7f7] dark:bg-slate-800 sm:h-[200px] sm:w-[200px]">
      <svg viewBox="0 0 64 80" className="h-16 sm:h-24">
        <path d="M18 34V22a14 14 0 0 1 28 0v12" fill="none" stroke="#d58b06" strokeWidth="7" strokeLinecap="round" />
        <path d="M6 38l30 14v26L6 64z" fill="#facb06" />
        <path d="M36 52l22-14v26L36 78z" fill="#eaa406" />
        <path d="M6 38l22-10 30 10-22 14z" fill="#f7c10a" />
      </svg>
    </div>
  )
}

export function AuthLink({ text, to, label }) {
  return <p className="mt-auto pt-8 text-center text-xs text-slate-400">{text} <Link to={to} className="text-brand">{label}</Link></p>
}

// Wrapper every auth page uses: form content vertically centred, link pinned at the bottom of the card
export function AuthForm({ onSubmit, children, footer }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      <div className="my-auto w-full">{children}</div>
      {footer}
    </form>
  )
}

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-stretch bg-brand p-4 lg:p-[4.5vw] lg:py-[4vw]">
      <div className="hidden flex-1 items-center justify-center pr-8 lg:flex">
        <img src={illustration} alt="" className="max-h-[75vh] w-full max-w-[520px] object-contain" />
      </div>
      <div className="m-auto flex w-full max-w-[540px] flex-col rounded-lg bg-white px-6 py-10 dark:bg-slate-900 sm:px-12 lg:m-0 lg:min-h-[calc(100vh-8vw)] lg:w-[540px] lg:max-w-none lg:px-[90px] lg:py-12">
        <Outlet />
      </div>
    </div>
  )
}
