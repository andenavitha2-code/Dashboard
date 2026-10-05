import Feed from '../../components/social/Feed.jsx'
import { FriendsList, PhotosGrid } from '../../components/social/SideCards.jsx'
import { ProfileAvatar } from '../../components/ui/ProfileAvatar.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { cover } from '../../data/social.js'

const info = [['EMAIL', 'rabe@example.com'], ['BIRTHDAY', '17 March, 1995'], ['PHONE', '+1 (070) 123-8459'], ['LOCATION', 'New York, NY']]
const card = 'rounded-xl bg-white p-5 dark:bg-slate-900 shadow-[0_1px_2px_rgba(16,24,40,0.04)]'

export default function SocialProfile() {
  return (
    <div className="-mx-3 -mt-3 sm:-mx-6 sm:-mt-6">
      <img src={cover} alt="" className="h-28 w-full object-cover sm:h-36" />
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className={card + ' -mt-12 mb-5 flex flex-wrap items-center gap-x-6 gap-y-4 !p-4 shadow-sm sm:-mt-10'}>
          <div className="-mt-12 rounded-3xl border-4 border-white bg-white shadow-sm dark:border-slate-900 dark:bg-slate-900">
            <ProfileAvatar size="h-24 w-24 !rounded-[20px] sm:h-[100px] sm:w-[100px]" />
          </div>
          <div>
            <h1 className="text-xl font-normal text-slate-700 dark:text-slate-100">Ronald Robertson</h1>
            <p className="text-xs text-slate-400">Creative Director</p>
            <p className="mt-2 flex gap-3 text-slate-500"><Icon name="facebook" size={14} /><Icon name="twitter" size={14} /><Icon name="instagram" size={14} /></p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-16 border-slate-100 text-xs dark:border-slate-800 lg:ml-auto lg:mr-4 lg:border-l lg:pl-10">
            {info.map(([label, value]) => <p key={label}><span className="text-[10px] text-slate-400">{label}</span><br /><span className="text-slate-700 dark:text-slate-200">{value}</span></p>)}
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[250px_1fr]">
          <div className="space-y-5">
            <div className={card}><h3 className="mb-5 text-sm font-normal text-slate-700 dark:text-slate-100">Friends</h3><FriendsList /></div>
            <div className={card}><h3 className="mb-5 text-sm font-normal text-slate-700 dark:text-slate-100">Photos</h3><PhotosGrid /></div>
          </div>
          <Feed layout="list" />
        </div>
      </div>
    </div>
  )
}
