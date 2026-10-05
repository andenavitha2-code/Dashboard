import { useRef, useState } from 'react'
import { initialPosts, timelinePosts } from '../../data/social.js'
import { ProfileAvatar } from '../ui/ProfileAvatar.jsx'
import Icon from '../ui/Icon.jsx'
import PostCard from './PostCard.jsx'

// layout="list": one column (profile pages). layout="timeline": two columns with Today / Yesterday.
export default function Feed({ layout = 'list' }) {
  const [posts, setPosts] = useState(layout === 'list' ? initialPosts : timelinePosts)
  const [newPost, setNewPost] = useState('')
  const fileRef = useRef(null)

  function attach(e) {
    const f = e.target.files[0]
    if (f) setNewPost((t) => t + (t ? '\n' : '') + '📎 ' + f.name)
    e.target.value = ''
  }

  function updatePost(updated) {
    setPosts(posts.map((p) => (p.id === updated.id ? updated : p)))
  }
  function addPost() {
    if (!newPost.trim()) return
    const post = { id: Date.now(), author: 'Ronald Robertson', date: 'Just now', media: 'none', group: 'Today', side: 'left', text: newPost, likes: 0, liked: false, commentCount: 0, comments: [] }
    setPosts([post, ...posts])
    setNewPost('')
  }

  const composer = (
    <div className="rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:bg-slate-900">
      <div className="flex gap-3">
        <ProfileAvatar size="h-9 w-9 shrink-0" />
        <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Write something..." rows="2"
          className="flex-1 resize-none bg-transparent pt-2 text-xs outline-none placeholder:text-slate-300" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button onClick={addPost} className="rounded bg-brand px-5 py-1.5 text-xs text-white hover:bg-brand-dark">Post</button>
        <span className="flex gap-3 text-slate-400">
          <button type="button" onClick={() => fileRef.current.click()} aria-label="Attach file"><Icon name="clip" size={15} /></button>
          <button type="button" onClick={() => setNewPost((t) => t + '😊')} aria-label="Add emoji"><Icon name="smile" size={15} /></button>
          <button type="button" onClick={() => fileRef.current.click()} aria-label="Add image"><Icon name="image" size={15} /></button>
          <input ref={fileRef} type="file" className="hidden" onChange={attach} />
        </span>
      </div>
    </div>
  )

  if (layout === 'list') {
    return (
      <div className="space-y-5">
        {composer}
        {posts.map((p) => <PostCard key={p.id} post={p} onChange={updatePost} />)}
      </div>
    )
  }

  // timeline: centre line with dots, left and right cards, grouped by Today / Yesterday
  const groups = ['Today', 'Yesterday']
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute inset-y-0 left-1/2 hidden w-px bg-green-200 dark:bg-green-900 md:block" />
      {groups.map((label) => {
        const items = posts.filter((p) => p.group === label)
        const column = (side) => items.filter((p) => p.side === side).map((p) => (
          <div key={p.id} className="relative">
            <span className={`absolute top-6 hidden h-2.5 w-2.5 rounded-full bg-brand md:block ${side === 'left' ? '-right-[37px]' : '-left-[37px]'}`} />
            <PostCard post={p} onChange={updatePost} />
          </div>
        ))
        return (
          <div key={label} className="relative mb-8">
            <div className="relative mb-6 text-center"><span className="rounded bg-brand px-4 py-1 text-[11px] text-white">{label}</span></div>
            <div className="grid items-start gap-5 md:grid-cols-2 md:gap-x-16">
              <div className="space-y-5">
                {label === 'Today' && <div className="relative"><span className="absolute top-6 hidden h-2.5 w-2.5 rounded-full bg-brand md:block -right-[37px]" />{composer}</div>}
                {column('left')}
              </div>
              <div className="space-y-5 md:pt-10">{column('right')}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
