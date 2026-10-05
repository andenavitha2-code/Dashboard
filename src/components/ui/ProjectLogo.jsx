// Placeholder logo: coloured square with the first letter of the client
export default function ProjectLogo({ project, size = 'h-11 w-11' }) {
  return (
    <div className={`${size} flex shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-lg font-semibold dark:border-slate-700 dark:bg-slate-800`}
      style={{ color: project.color }}>
      {project.client[0]}
    </div>
  )
}
