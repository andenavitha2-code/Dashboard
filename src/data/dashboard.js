// Mock data for the four Home/Overview dashboard variants
export const salesStats = [
  { label: 'Total Income', value: '$8.500', change: '↑ 50.8%', icon: '$' },
  { label: 'Total Sales', value: '3.500K', change: '↓ 10.5%', icon: '📊' },
  { label: 'New Clients', value: '2.500K', change: '↑ 24.9%', icon: '☺' },
]
export const weekBars = [
  { label: 'Mon', a: 220, b: 90 }, { label: 'Tue', a: 150, b: 100 }, { label: 'Wed', a: 280, b: 110 },
  { label: 'Thu', a: 200, b: 60 }, { label: 'Fri', a: 300, b: 90 }, { label: 'Sat', a: 210, b: 100 }, { label: 'Sun', a: 130, b: 70 },
]
export const analyticsLine = [
  { label: 'Mon', value: 0 }, { label: 'Tue', value: 800 }, { label: 'Wed', value: 600 },
  { label: 'Thu', value: 1300 }, { label: 'Fri', value: 700 }, { label: 'Sat', value: 1100 }, { label: 'Sun', value: 900 },
]
export const horizontalBars = [
  { label: '25', a: 220, b: 90 }, { label: '24', a: 260, b: 160 }, { label: '23', a: 190, b: 220 },
  { label: '22', a: 130, b: 310 }, { label: '21', a: 90, b: 240 }, { label: '20', a: 60, b: 130 }, { label: '19', a: 40, b: 90 },
]
export const lastOrders = [
  { name: 'Regina Cooper', order: '#790841', amount: '$2.500', payment: 'Credit Card', date: '12.09.2019' },
  { name: 'Robert Edwards', order: '#799894', amount: '$1.500', payment: 'PayPal', date: '12.09.2019' },
  { name: 'Gloria Mckinney', order: '#790857', amount: '$5.600', payment: 'Credit Card', date: '12.09.2019' },
  { name: 'Randall Fisher', order: '#790687', amount: '$2.850', payment: 'PayPal', date: '12.09.2019' },
]
export const dashTransactions = [
  { name: 'Devon Williamson', time: '08:00 AM — 19 August', amount: '+$1.400', type: 'Payment' },
  { name: 'Debra Wilson', time: '09:45 AM — 19 August', amount: '-$850', type: 'Refund' },
  { name: 'Judith Black', time: '10:15 AM — 20 August', amount: '+$2.050', type: 'Payment' },
  { name: 'Philip Henry', time: '10:50 AM — 23 August', amount: '+$650', type: 'Payment' },
  { name: 'Mitchell Cooper', time: '12:45 AM — 25 August', amount: '+$900', type: 'Payment' },
]

export const financeStats = [
  { label: 'Total Income', value: '$8.500', change: '↑ 50.8%' },
  { label: 'Total Expense', value: '3.500K', change: '↓ 10.5%' },
  { label: 'Total Bonus', value: '5.100K', change: '↑ 24.9%' },
]
export const financeBars = [
  { label: 'Mon', a: 280, b: 340 }, { label: 'Tue', a: 220, b: 60 }, { label: 'Wed', a: 260, b: 480 },
  { label: 'Thu', a: 200, b: 120 }, { label: 'Fri', a: 340, b: 200 }, { label: 'Sat', a: 240, b: 300 }, { label: 'Sun', a: 220, b: 320 },
]
export const payments = [
  { icon: '🛍️', name: 'Shopping', time: '08:00 AM — 19 August', amount: '-$1.400' },
  { icon: '✈️', name: 'Travel', time: '09:45 AM — 21 August', amount: '-$850' },
  { icon: '🍔', name: 'Food', time: '10:15 AM — 24 August', amount: '-$2.150' },
  { icon: '💊', name: 'Medicine', time: '10:50 AM — 24 August', amount: '-$650' },
  { icon: '⚽', name: 'Sport', time: '12:45 AM — 28 August', amount: '-$900' },
]

export const trafficStats = [
  { label: 'Total Profit', value: '$12.500', change: '↑ 50.8%', icon: '$' },
  { label: 'Total Sales', value: '30.800K', change: '↓ 10.5%', icon: '📊' },
  { label: 'New Users', value: '6.300K', change: '↑ 24.9%', icon: '☺' },
]
export const trafficSources = [
  { icon: '🌐', name: 'Top Browser', value: 'Chrome', sessions: '2500' },
  { icon: '🍎', name: 'Top Platform', value: 'Mac OS', sessions: '2200' },
  { icon: '🇦🇺', name: 'Top Country', value: 'Australia', sessions: '4550' },
  { icon: '🔍', name: 'Top Search Engine', value: 'Google', sessions: '3100' },
]

export const taskStats = [
  { label: 'Total Tasks', value: '780' }, { label: 'New Tasks', value: '136' },
  { label: 'In Progress', value: '324' }, { label: 'Done Tasks', value: '215' },
]
export const activeTasks = [
  { done: false, text: 'Sending project #783 for revision to Leslie Miles', color: 'border-yellow-400' },
  { done: true, text: 'Sending project #675 for revision to Kristin Edwards', color: 'border-green-500' },
  { done: false, text: 'Sending project #788 for revision to Regina Warren', color: 'border-green-500' },
  { done: false, text: 'Sending project #543 for revision to Stella Penas', color: 'border-yellow-400' },
]
export const recentActivity = [
  { date: '12 September', items: [
    { name: 'Regina Cooper', time: '08:30', text: 'Added new project #443' },
    { name: 'Kristin Edwards', time: '15:00', text: 'Updated project #488' },
    { name: 'Jorge Robertson', time: '17:20', text: 'Closed project #129' },
  ] },
  { date: '11 September', items: [
    { name: 'Stella Pena', time: '14:00', text: 'Completed project #389' },
    { name: 'Priscilla Russell', time: '15:20', text: 'Closed project #401' },
  ] },
]

// Analytics / profile page (Felecia Brown)
export const analyticsStats = [
  { label: 'Total Visitors', value: '20.500', change: '↑ 4.85%' },
  { label: 'Total Followers', value: '21.800', change: '↓ 5.25%' },
  { label: 'Total Likes', value: '30.400', change: '↑ 3.55%' },
  { label: 'Total Comments', value: '14.800', change: '↓ 10.30%' },
]
export const visits = [
  { label: 'Mon', value: 2000 }, { label: 'Tue', value: 1400 }, { label: 'Wed', value: 3100 },
  { label: 'Thu', value: 1700 }, { label: 'Fri', value: 2400 }, { label: 'Sat', value: 9500 }, { label: 'Sun', value: 3100 },
]
export const followerSources = [
  { name: 'Facebook', value: '3.5k', color: 'text-teal-500' }, { name: 'Twitter', value: '7.8k', color: 'text-yellow-400' },
  { name: 'Instagram', value: '5.8k', color: 'text-slate-700 dark:text-slate-300' }, { name: 'YouTube', value: '4.7k', color: 'text-red-500' },
]
export const followerGrowth = [1800, 2000, 1500, 1900, 2150, 2400, 1600]
export const newFollowers = [
  { name: 'Devon Williamson', role: 'Product Designer, Apple Inc' }, { name: 'Debra Wilson', role: 'Project Manager, Facebook Inc' },
  { name: 'Judith Black', role: 'Business Analyst, Google Inc' }, { name: 'Philip Henry', role: 'Web Developer, Google Inc' },
  { name: 'Mitchell Cooper', role: 'Senior Vice President, Amazon Inc' },
]
export const favorites = [
  { name: 'Ronald Robertson', role: 'Product Designer' }, { name: 'Regina Cooper', role: 'Project Manager' },
  { name: 'Judith Black', role: 'Business Analyst' }, { name: 'Dustin Williamson', role: 'Web Developer' },
  { name: 'Calvin Flores', role: 'Senior Vice President' },
]

// Wallet page (collapsed sidebar + cards + contacts)
export const walletCards = [
  { balance: '80,700.00', holder: 'Felecia Brown', number: '•••• •••• •••• 8854' },
  { balance: '30,200.00', holder: 'Felecia Brown', number: '•••• •••• •••• 4417' },
]
export const walletContacts = [
  { name: 'Ronald Robertson', role: 'Product Designer' }, { name: 'Regina Cooper', role: 'Project Manager' },
  { name: 'Judith Black', role: 'Business Analyst' }, { name: 'Dustin Williamson', role: 'Web Developer' },
  { name: 'Calvin Flores', role: 'Senior Vice President' }, { name: 'Robert Edwards', role: 'Business Analyst' },
]

// Posting-tasks heatmap (Tasks page)
export const postingActive = [
  { day: 'TU', hour: 8, label: '1 Task on Tuesday at 8AM' }, { day: 'TU', hour: 15, label: '1 Task on Tuesday at 3PM' },
  { day: 'TH', hour: 12, label: '1 Task on Thursday at 12PM' }, { day: 'FR', hour: 4, label: '1 Task on Friday at 4AM' },
  { day: 'FR', hour: 11, label: '2 Tasks on Friday at 11AM' }, { day: 'SA', hour: 6, label: '1 Task on Saturday at 6AM' },
]
export const totalProjects = [
  { name: 'Product Design', value: 87, color: 'bg-emerald-700' }, { name: 'Graphic Design', value: 108, color: 'bg-emerald-400' },
  { name: 'iOS Apps', value: 100, color: 'bg-yellow-400' }, { name: 'Android Apps', value: 24, color: 'bg-green-500' },
]

// Traffic page: 3-series stacked bars + multi-segment donut
export const trafficBars = [
  { label: 'Mon', values: [180, 90, 40] }, { label: 'Tue', values: [230, 60, 30] }, { label: 'Wed', values: [90, 30, 20] },
  { label: 'Thu', values: [200, 80, 50] }, { label: 'Fri', values: [260, 90, 60] }, { label: 'Sat', values: [150, 60, 30] }, { label: 'Sun', values: [60, 20, 10] },
]
export const onlineSegments = [
  { value: 20, color: '#14b8a6', name: 'Web', count: '350' },
  { value: 45, color: '#0f5132', name: 'iOS', count: '895' },
  { value: 35, color: '#facc15', name: 'Android', count: '638' },
]
