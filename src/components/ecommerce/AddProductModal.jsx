import { useState } from 'react'
import Modal from '../ui/Modal.jsx'

const inputClass = 'mt-1 w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700'
const emptyForm = { name: '', description: '', category: 'iPhone', price: '', discount: '', tags: ['Apple', 'iPhone'] }

export default function AddProductModal({ product, onClose, onSave }) {
  const isEdit = Boolean(product)
  const [form, setForm] = useState(product || emptyForm)
  const [tagInput, setTagInput] = useState('')
  const [images, setImages] = useState(product?.images || [])

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function addTag(e) {
    e.preventDefault()
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
    }
    setTagInput('')
  }
  function removeTag(tag) {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })
  }
  function pickImages(e) {
    const files = Array.from(e.target.files).slice(0, 3 - images.length)
    setImages([...images, ...files.map((f) => URL.createObjectURL(f))])
  }
  function removeImage(i) {
    setImages(images.filter((_, idx) => idx !== i))
  }
  function submit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal title={isEdit ? 'Edit Product' : 'Add Product'} onClose={onClose} width="max-w-lg">
      <form onSubmit={submit} className="max-h-[75vh] space-y-4 overflow-y-auto pr-1 text-xs text-slate-400">
        <label className="block">Product Name
          <input name="name" value={form.name} onChange={change} required className={inputClass} />
        </label>

        <div>
          Description
          <div className={inputClass + ' space-y-0'}>
            <div className="mb-2 flex items-center gap-3 border-b border-slate-100 pb-2 text-slate-500 dark:border-slate-700">
              <select className="bg-transparent text-xs outline-none"><option>A ▾</option></select>
              <b>B</b><i>I</i><u>U</u>
              <span className="ml-2 flex gap-1">
                {['left', 'center', 'right', 'justify'].map((a) => <span key={a} className="opacity-60">≡</span>)}
              </span>
            </div>
            <textarea name="description" value={form.description} onChange={change} rows="3" placeholder="Type something"
              className="w-full resize-none bg-transparent text-slate-700 outline-none dark:text-slate-200" />
          </div>
        </div>

        <label className="block">Category
          <select name="category" value={form.category} onChange={change} className={inputClass}>
            <option>iPhone</option><option>Watch</option><option>Notebook</option>
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">Price<input name="price" value={form.price} onChange={change} required placeholder="2.500" className={inputClass} /></label>
          <label className="block">Discount<input name="discount" value={form.discount} onChange={change} placeholder="15" className={inputClass} /></label>
        </div>

        <div>
          Product Images
          <label className={inputClass + ' flex cursor-pointer flex-col items-center gap-1 border-dashed py-6 text-center'}>
            <span>⬆</span>
            <span>Drag and Drop or <span className="text-brand">Browse</span> to upload</span>
            <input type="file" accept="image/*" multiple hidden onChange={pickImages} disabled={images.length >= 3} />
          </label>
          <div className="mt-2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                {images[i]
                  ? <img src={images[i]} alt="" className="h-full w-full rounded-lg object-cover" onClick={() => removeImage(i)} />
                  : <span className="text-slate-300">▧</span>}
              </div>
            ))}
          </div>
        </div>

        <div>
          Tags
          <div className={inputClass + ' flex flex-wrap gap-2'}>
            {form.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {tag} <button type="button" onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag(e)} placeholder="Add tag, press Enter"
              className="min-w-[100px] flex-1 bg-transparent text-slate-700 outline-none dark:text-slate-200" />
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button className="rounded-lg bg-brand px-6 py-2 text-sm text-white">Save</button>
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-6 py-2 text-sm dark:border-slate-700">Cancel</button>
        </div>
      </form>
    </Modal>
  )
}
