import { useState } from 'react'
import { ProfileAvatar } from '../ui/ProfileAvatar.jsx'
import Icon from '../ui/Icon.jsx'

// change the like of one comment (or reply) with the given id
function likeIn(comment, id) {
  if (comment.id === id) return { ...comment, liked: !comment.liked, likes: comment.likes + (comment.liked ? -1 : 1) }
  return { ...comment, replies: comment.replies.map((r) => likeIn(r, id)) }
}

function PlayButton() {
  return (
    <span className="absolute left-1/2 top-1/2 flex h-14 w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-sm">
      <svg width="16" height="18" viewBox="0 0 16 18"><path d="M1 1.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 1 1.5z" fill="#2b2f36" /></svg>
    </span>
  )
}

export default function PostCard({ post, onChange }) {
  const [text, setText] = useState('')
  const [replyTo, setReplyTo] = useState(null)      // id of the comment we are replying to
  const [replyText, setReplyText] = useState('')
  const [playing, setPlaying] = useState(false)

  function toggleLike() {
    onChange({ ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) })
  }
  function addComment() {
    if (!text.trim()) return
    const newComment = { id: Date.now(), name: 'Ronald Robertson', time: 'just now', text, likes: 0, liked: false, replies: [] }
    onChange({ ...post, comments: [...post.comments, newComment], commentCount: post.commentCount + 1 })
    setText('')
  }
  function addReply(commentId) {
    if (!replyText.trim()) return
    const reply = { id: Date.now(), name: 'Ronald Robertson', time: 'just now', text: replyText, likes: 0, liked: false, replies: [] }
    onChange({ ...post, comments: post.comments.map((c) => (c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c)) })
    setReplyText('')
    setReplyTo(null)
  }

  function renderComment(c, isReply) {
    return (
      <div key={c.id} className={isReply ? 'ml-11 mt-4' : 'mt-5'}>
        <div className="flex gap-3">
          <ProfileAvatar size="h-8 w-8 shrink-0" />
          <div className="text-xs">
            <span className="text-[13px] text-slate-700 dark:text-slate-200">{c.name}</span>
            <span className="ml-2 text-[10px] text-slate-400">{c.time}</span>
            <p className="mt-0.5 whitespace-pre-line text-[13px] leading-snug text-slate-600 dark:text-slate-300">{c.text}</p>
            <div className="mt-2 flex items-center gap-4 text-slate-400">
              <button onClick={() => onChange({ ...post, comments: post.comments.map((x) => likeIn(x, c.id)) })}
                className={`flex items-center gap-1 ${c.liked || c.likes ? 'text-[#f0706a]' : ''}`}>
                <Icon name="heart" size={14} fill={c.liked || c.likes ? 'currentColor' : 'none'} />{c.likes > 0 && <span className="text-[11px]">{c.likes}</span>}
              </button>
              {!isReply && <button onClick={() => setReplyTo(replyTo === c.id ? null : c.id)} aria-label="Reply"><Icon name="reply" size={14} /></button>}
            </div>
          </div>
        </div>
        {c.replies.map((r) => renderComment(r, true))}
        {replyTo === c.id && (
          <div className="ml-11 mt-3 flex gap-2">
            <input autoFocus value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addReply(c.id)} placeholder="Write a reply..."
              className="flex-1 rounded-xl border border-slate-200 bg-transparent px-3 py-1.5 text-xs outline-none dark:border-slate-700" />
            <button onClick={() => addReply(c.id)} className="text-brand"><Icon name="send" size={16} /></button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-3">
        <ProfileAvatar size="h-9 w-9" />
        <div className="text-[13px] leading-tight text-slate-700 dark:text-slate-200">{post.author}<br /><span className="text-[10px] text-slate-400">{post.date}</span></div>
      </div>

      {post.media === 'gallery' && (
        <div className="mb-4 grid grid-cols-3 gap-3">
          {post.gallery.map((src, i) => <img key={i} src={src} alt="" className="aspect-square w-full rounded-2xl object-cover" />)}
        </div>
      )}
      {(post.media === 'image' || post.media === 'video') && (
        <div className={`relative mb-4 overflow-hidden rounded-2xl ${post.media === 'video' ? 'cursor-pointer' : ''}`} onClick={() => post.media === 'video' && setPlaying(!playing)}>
          <img src={post.image} alt="" className="h-[190px] w-full object-cover sm:h-[230px]" />
          {post.media === 'video' && !post.playBaked && !playing && <PlayButton />}
        </div>
      )}

      <p className="mb-4 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{post.text}</p>
      <div className="mb-4 flex items-center gap-5 text-xs text-slate-400">
        <button onClick={toggleLike} className="flex items-center gap-1.5 text-[#f0706a]">
          <Icon name="heart" size={15} fill="currentColor" className={post.liked ? '' : 'opacity-80'} /><span className="text-slate-500">{post.likes}</span>
        </button>
        <span className="flex items-center gap-1.5"><Icon name="chat" size={15} />{post.commentCount}</span>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-700">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addComment()}
          placeholder="Write a comment..." className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-300" />
        <button type="button" onClick={() => setText((t) => t + '😊')} aria-label="Add emoji" className="text-slate-400"><Icon name="smile" size={15} /></button>
        <button onClick={addComment} className="text-brand" aria-label="Send comment"><Icon name="send" size={16} /></button>
      </div>

      {post.comments.map((c) => renderComment(c, false))}
    </div>
  )
}
