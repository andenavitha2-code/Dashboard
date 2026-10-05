import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-semibold text-brand">404</h1>
      <h2 className="mt-2 text-2xl">We can't seem to find that</h2>
      <p className="mb-6 text-xs text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/dashboard" className="rounded-lg bg-brand px-4 py-2 text-xs text-white">← Back to Home</Link>
    </div>
  )
}
