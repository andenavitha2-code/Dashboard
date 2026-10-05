export default function PageHeader({ title, buttonLabel, onButtonClick, right }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-normal sm:text-3xl">{title}</h1>
      {right || (buttonLabel && <button onClick={onButtonClick} className="rounded-lg bg-brand px-4 py-2 text-sm text-white">{buttonLabel}</button>)}
    </div>
  )
}
