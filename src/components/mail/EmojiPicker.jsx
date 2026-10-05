const popular = ['😴', '😭', '🥵', '😵', '🤯']
const smileys = ['😀', '😜', '🤓', '😡', '😎', '😶', '😂', '😊', '😨', '🙄', '😍', '😏', '🤩', '😛', '😇', '🤧', '😁', '😢', '😋', '😳', '😉', '😮', '😆', '🥰']

export default function EmojiPicker({ onPick, onClose }) {
  return (
    <div className="absolute bottom-12 left-0 z-30 w-72 rounded-xl bg-white p-3 shadow-xl dark:bg-slate-800" onClick={(e) => e.stopPropagation()}>
      <div className="mb-2 flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1.5 text-sm dark:bg-slate-700">
        <span className="text-slate-400">🔍</span><input placeholder="Search..." className="flex-1 bg-transparent outline-none" />
      </div>
      <p className="mb-1 text-[10px] text-slate-400">POPULAR</p>
      <div className="mb-2 flex gap-2 text-xl">{popular.map((e) => <button key={e} onClick={() => onPick(e)}>{e}</button>)}</div>
      <p className="mb-1 text-[10px] text-slate-400">SMILEYS</p>
      <div className="grid grid-cols-8 gap-1 text-lg">{smileys.map((e, i) => <button key={i} onClick={() => onPick(e)}>{e}</button>)}</div>
      <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-slate-400 dark:border-slate-700">
        {['🕐', '😊', '❤️', '🐻', '☀️', '🗺', '🚩'].map((e) => <span key={e}>{e}</span>)}
      </div>
    </div>
  )
}
