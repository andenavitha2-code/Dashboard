import Feed from '../../components/social/Feed.jsx'
import { FriendsList, PhotosGrid } from '../../components/social/SideCards.jsx'
import { ProfileAvatar } from '../../components/ui/ProfileAvatar.jsx'

const info = [['EMAIL', 'black@example.com'], ['PHONE', '+1 (070) 123-8459'], ['BIRTHDAY', '17 March, 1995'], ['LOCATION', 'New York, NY']]
const heading = 'mb-4 mt-5 border-t border-slate-100 pt-5 text-[11px] font-normal tracking-wide text-slate-600 dark:border-slate-800 dark:text-slate-300'

export default function ProfileFeed() {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[250px_1fr]">
      <div className="rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:bg-slate-900">
        <div className="relative mx-auto mb-3 w-fit">
          <ProfileAvatar size="h-24 w-24" />
          <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
        </div>
        <h1 className="text-center text-lg font-normal text-slate-700 dark:text-slate-100">Jane <b className="font-semibold">Wilson</b></h1>
        <p className="mb-4 text-center text-xs text-slate-400">Creative Director</p>

        <h3 className={heading}>INFO</h3>
        {info.map(([label, value]) => <p key={label} className="mb-3 text-xs text-slate-700 dark:text-slate-200"><span className="text-[10px] text-slate-400">{label}</span><br />{value}</p>)}
        <h3 className={heading}>FRIENDS</h3>
        <FriendsList />
        <h3 className={heading}>PHOTOS</h3>
        <PhotosGrid />
      </div>
      <Feed layout="list" />
    </div>
  )
}
