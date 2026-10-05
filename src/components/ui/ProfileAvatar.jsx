// Photo avatar for the current account (ArtTemplate / Felecia Brown / Ronald Robertson).
// Pass a different shape through `size`, e.g. size="h-24 w-24 !rounded-3xl".
import avatar from '../../assets/avatar.png'

export function ProfileAvatar({ size = 'h-9 w-9' }) {
  return <img src={avatar} alt="Profile" className={`${size} shrink-0 rounded-full bg-[#e8806a] object-cover`} />
}
