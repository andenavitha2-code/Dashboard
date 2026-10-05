// Visual-only formatting toolbar matching the Figma compose/reply box
export default function RichToolbar({ onEmoji }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-3 py-2 text-slate-400 dark:border-slate-700">
      <select className="bg-transparent text-xs outline-none"><option>A ▾</option></select>
      <b className="cursor-pointer">B</b><i className="cursor-pointer">I</i><u className="cursor-pointer">U</u>
      <span className="cursor-pointer">🔗</span>
      <button type="button" onClick={onEmoji} className="cursor-pointer">☺</button>
      <span className="cursor-pointer">🖼</span>
      <span className="cursor-pointer">☰</span><span className="cursor-pointer">☰</span>
      <span className="ml-auto flex gap-2">
        {['≡', '≡', '≡', '≡'].map((s, i) => <span key={i} className="cursor-pointer opacity-70">{s}</span>)}
      </span>
    </div>
  )
}
