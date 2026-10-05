import { Avatar } from '../ui/Avatar.jsx'

export default function ProfilePreview({ contact, favorites }) {
  if (!contact) return <p className="text-sm text-slate-400">Select a contact to see their profile.</p>

  return (
    <div>
      <div className="mx-auto mb-3 w-fit">{contact.photo ? <img src={contact.photo} alt="" className="h-20 w-20 rounded-full object-cover" /> : <Avatar name={`${contact.first} ${contact.last}`} size="h-20 w-20" />}</div>
      <h3 className="text-center font-medium">{contact.first} {contact.last}</h3>
      <p className="mb-5 text-center text-xs text-slate-400">{contact.job}</p>

      <p className="mb-2 text-xs text-slate-400">INFO</p>
      <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">EMAIL</span>{contact.email}</p>
      <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">PHONE</span>{contact.phone}</p>
      <p className="mb-2 text-xs"><span className="block text-[10px] text-slate-400">BIRTHDAY</span>{contact.dob.day} {contact.dob.month}, {contact.dob.year}</p>
      <p className="mb-5 text-xs"><span className="block text-[10px] text-slate-400">LOCATION</span>{contact.location}</p>

      {favorites.length > 0 && (
        <>
          <p className="mb-2 text-xs text-slate-400">FAVORITES</p>
          {favorites.map((f) => (
            <div key={f.id} className="mb-2 flex items-center gap-2 text-xs">
              <Avatar name={`${f.first} ${f.last}`} size="h-7 w-7" />
              <div>{f.first} {f.last}<br /><span className="text-[10px] text-slate-400">{f.job}</span></div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
