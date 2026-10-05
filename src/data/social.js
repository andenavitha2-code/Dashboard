// Mock data for the social pages (profile, feed, timeline). Images come from src/assets/photos.
import city from '../assets/photos/city.png'
import beach from '../assets/photos/beach.png'
import desert from '../assets/photos/desert.png'
import videoBeach from '../assets/photos/video-beach.png'
import cover from '../assets/photos/cover.jpg'
import mountains from '../assets/photos/mountains.svg'
import marble from '../assets/photos/marble.svg'
import zigzag from '../assets/photos/zigzag.svg'
import leaves from '../assets/photos/leaves.svg'
import scales from '../assets/photos/scales.svg'
import teal from '../assets/photos/teal.svg'

export { cover }

export const friends = [
  { name: 'Ronald Robertson', role: 'Product Designer' }, { name: 'Regina Cooper', role: 'Project Manager' },
  { name: 'Judith Black', role: 'Creative Director' }, { name: 'Dustin Williamson', role: 'Web Developer' },
  { name: 'Nathan Fox', role: 'Business Analyst' }, { name: 'Calvin Flores', role: 'Designer' },
  { name: 'Brandon Pena', role: 'Product Designer' }, { name: 'Courtney Nguyen', role: 'Designer' },
  { name: 'Kathryn Cooper', role: 'Developer' }, { name: 'Cody Lane', role: 'Web Developer' },
]

// 3x3 photo grid in the left column (same order as the Figma)
export const photos = [city, beach, mountains, marble, zigzag, leaves, teal, scales, desert]

const comment = (id, name, time, text, likes, replies = []) => ({ id, name, time, text, likes, liked: false, replies })
const article = 'Above all, think of life as a prototype. We can conduct experiments, make discoveries, and change our perspectives. We can look for opportunities to turn processes into projects that have tangible outcomes. We can learn how to take joy in the things we create whether they take the form of a fleeting experience or an heirloom that will last for generations.'
const short = 'Above all, think of life as a prototype. We can conduct experiments, make discoveries, and change our perspectives. We can look for opportunities to turn processes into projects that have tangible outcomes.'
const creativity = 'Creativity is to discover a question that has never been asked. If one brings up an idiosyncratic question, the answer he gives will necessarily be unique as well.'
const interesting = 'Very interesting and informative. I learned a lot of new and interesting things.'
const hello = 'Hello!\nI agree, a very interesting. Thank you very much!'

// media: 'image' | 'video' | 'gallery' | 'none'.  image = src. playBaked = the image already has the play button drawn on it.
const post = (o) => ({ author: 'Dustin Williamson', date: 'Jan 17, 2020', media: 'image', liked: false, ...o })

// Profile pages (one column)
export const initialPosts = [
  post({ id: 1, image: city, text: article, likes: 50, commentCount: 14, comments: [
    comment(1, 'Judith Black', '1 day ago', 'Very interesting and informative article. I learned a lot of new and interesting.', 5,
      [comment(11, 'Nathan Fox', '5 min ago', 'Hello!\nI agree, a very interesting article. Thank you very much!', 0)]),
    comment(2, 'Calvin Flores', '2 day ago', 'Thanks for the good article. Looking forward to new ones.', 3),
  ] }),
  post({ id: 2, date: 'Jan 15, 2020', media: 'video', image: videoBeach, playBaked: true, text: creativity, likes: 50, commentCount: 14, comments: [
    comment(3, 'Regina Cooper', '5 day ago', interesting, 5),
    comment(4, 'Ronald Robertson', '5 day ago', hello, 3),
  ] }),
]

// Timeline page (two columns: side = left | right)
export const timelinePosts = [
  post({ id: 101, group: 'Today', side: 'left', image: city, text: short, likes: 50, commentCount: 14, comments: [
    comment(1, 'Judith Black', '1 min ago', 'Very interesting and informative article. I learned a lot of new and interesting.', 5),
    comment(2, 'Calvin Flores', '5 min ago', 'Thanks for the good article. Looking forward to new ones.', 3),
  ] }),
  post({ id: 102, group: 'Today', side: 'right', image: beach, text: creativity, likes: 24, commentCount: 18, comments: [
    comment(3, 'Regina Cooper', '4 min ago', interesting, 8),
    comment(4, 'Ronald Robertson', '10 min ago', hello, 1),
  ] }),
  post({ id: 103, group: 'Yesterday', side: 'left', image: desert, text: short, likes: 75, commentCount: 8, comments: [
    comment(5, 'Nathan Fox', '1 day ago', 'Very interesting and informative article. I learned a lot of new and interesting.', 0),
    comment(6, 'Calvin Flores', '1 day ago', 'Thanks for the good article. Looking forward to new ones.', 3),
  ] }),
  post({ id: 104, group: 'Yesterday', side: 'left', media: 'video', image: mountains, text: creativity, likes: 82, commentCount: 14, comments: [
    comment(7, 'Ronald Robertson', '1 day ago', 'Very interesting and informative article. I learned a lot of new and interesting.', 8),
  ] }),
  post({ id: 105, group: 'Yesterday', side: 'right', image: cover, text: creativity, likes: 37, commentCount: 10, comments: [
    comment(8, 'Judith Black', '1 day ago', interesting, 8),
    comment(9, 'Nathan Fox', '1 day ago', hello, 1),
  ] }),
  post({ id: 106, group: 'Yesterday', side: 'right', media: 'gallery', gallery: [scales, teal, zigzag], text: 'We can look for opportunities to turn processes into projects that have tangible outcomes.', likes: 54, commentCount: 4, comments: [
    comment(10, 'Calvin Flores', '1 day ago', interesting, 4),
    comment(12, 'Regina Cooper', '1 day ago', hello, 1),
  ] }),
]
