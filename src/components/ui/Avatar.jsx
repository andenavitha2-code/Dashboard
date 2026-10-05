// Round avatar that shows the profile photo from src/assets/avatar.png (same photo everywhere, like the Figma).
// The `name` prop is kept so the call sites don't change; it is used as the alt text.
import avatar from '../../assets/avatar.png'

export function Avatar({ name = '', size = 'h-8 w-8' }) {
  return (
    <img src={avatar} alt={name} title={name}
      className={`${size} shrink-0 rounded-full bg-[#e8806a] object-cover ring-2 ring-white dark:ring-slate-900`} />
  )
}

export function AvatarGroup({ names }) {
  return <div className="flex -space-x-2">{names.map((n) => <Avatar key={n} name={n} />)}</div>
}
