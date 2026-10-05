import { friends, photos } from '../../data/social.js'
import { ProfileAvatar } from '../ui/ProfileAvatar.jsx'

export function FriendsList() {
  return (
    <div className="space-y-4">
      {friends.map((f) => (
        <div key={f.name} className="flex items-center gap-3">
          <ProfileAvatar size="h-8 w-8 shrink-0" />
          <div className="text-xs leading-tight text-slate-700 dark:text-slate-200">{f.name}<br /><span className="text-[10px] text-slate-400">{f.role}</span></div>
        </div>
      ))}
    </div>
  )
}

export function PhotosGrid() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {photos.map((src, i) => <img key={i} src={src} alt="" className="aspect-square w-full rounded-xl object-cover" />)}
    </div>
  )
}
