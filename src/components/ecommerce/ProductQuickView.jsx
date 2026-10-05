import { useState } from 'react'
import Modal from '../ui/Modal.jsx'

const specs = [
  ['Display', '6.1-inch'], ['Chip', 'A13 Bionic chip'], ['Camera', 'Dual 12MP Ultra Wide'], ['OS', 'iOS 13'], ['Capacity', '64GB'],
]

export default function ProductQuickView({ onClose }) {
  const [qty, setQty] = useState(1)
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  return (
    <Modal title="" onClose={onClose} width="max-w-2xl">
      <div className="-mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="mb-3 flex h-64 items-center justify-center rounded-lg border border-slate-100 text-5xl text-slate-300 dark:border-slate-700">🖼</div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-100 text-slate-300 dark:border-slate-700">▧</div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium">Apple iPhone 11 64GB Purple</h2>
          <p className="mb-3 text-xs text-slate-400">SKU: 0547081</p>
          <p className="mb-4 text-sm text-slate-500">A new dual-camera system captures more of what you see and love. The fastest chip ever in a smartphone and all-day battery life let you do more and charge less. And the highest-quality video in a smartphone, so your memories look better than ever.</p>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs text-slate-400">Quantity</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-7 w-7 rounded-full border border-slate-200 dark:border-slate-700">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-7 w-7 rounded-full border border-slate-200 dark:border-slate-700">+</button>
              </div>
            </div>
            <p className="text-xl font-medium">$699</p>
          </div>

          <div className="mb-5 flex gap-3">
            <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500) }} className="flex-1 rounded-lg bg-brand py-2.5 text-sm text-white">{added ? `✓ Added (${qty})` : 'Add to Cart'}</button>
            <button onClick={() => setLiked(!liked)} className={`flex h-10 w-10 items-center justify-center rounded-lg ${liked ? 'bg-teal-400 text-white' : 'bg-teal-50 text-teal-400 dark:bg-slate-800'}`}>♥</button>
          </div>

          <h3 className="mb-2 text-sm font-medium">Specifications</h3>
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between border-t border-slate-100 py-2 text-xs dark:border-slate-800">
              <span className="text-slate-400">{label}</span><span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
