export default function TimeLeft({ project }) {
  const style = project.urgent ? 'bg-green-50 text-orange-500' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
  return <span className={`rounded-lg px-3 py-1.5 text-xs ${style}`}>◷ {project.timeLeft}</span>
}
