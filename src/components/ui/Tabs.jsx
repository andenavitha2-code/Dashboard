// tabs = [{ label: 'All', count: 151 }, ...]
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-slate-200 dark:border-slate-800">
      {tabs.map((tab) => (
        <button key={tab.label} onClick={() => onChange(tab.label)}
          className={`-mb-px shrink-0 whitespace-nowrap pb-3 text-sm ${active === tab.label
            ? 'border-b-2 border-brand text-slate-900 dark:text-white' : 'text-slate-400'}`}>
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 rounded bg-slate-100 px-1.5 text-[10px] dark:bg-slate-800">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}
