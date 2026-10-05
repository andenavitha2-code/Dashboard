import Icon from './Icon.jsx'

export default function Modal({ title, onClose, children, width = 'max-w-md' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
      <div className={`max-h-[92vh] w-full ${width} overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6 dark:bg-slate-900`}
        onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium sm:text-2xl">{title}</h2>
          <button onClick={onClose} className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800"><Icon name="x" size={14} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
