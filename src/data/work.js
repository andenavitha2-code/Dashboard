// Mock data for Tasks, Calendar, Mail and Chat

export const taskLabels = [
  { name: 'Design', swatch: '#22c55e' },
  { name: 'Frontend', swatch: '#2dd4bf' },
  { name: 'Backend', swatch: '#ef4444' },
]
export const labelSwatchOptions = ['#ef4444', '#2dd4bf', '#facc15', '#15803d', '#38bdf8', '#22c55e', '#a3e635', '#a78bfa', '#f472b6', '#94a3b8']
export const taskMembers = ['Regina Cooper', 'Jacob Hawkins', 'Jane Wilson', 'Shane Black']

export const taskColumns = [
  { id: 'todo', name: 'ToDo', color: '#facc15' },
  { id: 'inprogress', name: 'In Progress', color: '#22d3ee' },
  { id: 'completed', name: 'Completed', color: '#22c55e' },
]

const templateProgressChecklist = [
  { text: 'Inbox Template', done: true }, { text: 'Chat Template', done: true },
  { text: 'Tasks Template', done: true }, { text: 'Projects Template', done: false },
]
const templateProgressFiles = [
  { name: 'Wireframe UI Kit.zip', size: '5.8 MB', date: '15.01.2020 at 11:45' },
  { name: 'Picture 01.png', size: '1.2 MB', date: '15.01.2020 at 11:50' },
  { name: 'Picture 02.png', size: '1.4 MB', date: '15.01.2020 at 11:50' },
]
const templateProgressComments = [
  { name: 'Jane Wilson', time: '5 min ago', text: 'Hi Cody, any progress on the project?' },
  { name: 'Jacob Hawkins', time: '1 day ago', text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.', images: 3 },
  { name: 'Regina Cooper', time: '5 min ago', text: 'Hi Jacob. Will you be able to finish the last item of the task by tomorrow?' },
]

export const initialTasks = [
  { id: 1, title: 'Brand Logo Design', description: 'Make a redesign of the logo in corporate colors.', column: 'todo', date: 'Jun 17',
    labels: ['Design'], assignees: ['Regina Cooper', 'Jacob Hawkins'], createdBy: 'Shane Black', watchers: 2,
    checklist: [], attachmentFiles: [], commentsList: [] },
  { id: 2, title: 'New Header Image', description: 'Choose a new header image for the landing page.', column: 'todo', date: 'Jun 17',
    labels: ['Design'], assignees: ['Jacob Hawkins'], createdBy: 'Shane Black', watchers: 1, image: true,
    checklist: [], attachmentFiles: [{ name: 'mountains.png', size: '1.1 MB', date: '15.01.2020 at 11:50' }], commentsList: [{ name: 'Jacob Hawkins', time: '2 days ago', text: 'Working on it now.' }, { name: 'Shane Black', time: '1 day ago', text: 'Sounds good.' }, { name: 'Jane Wilson', time: '1 day ago', text: 'Looks great so far.' }] },
  { id: 3, title: 'Wireframe for App', description: 'Make a wireframe for an app for a pre-presentation.', column: 'todo', date: 'Jun 17',
    labels: ['Design', 'Frontend'], assignees: ['Regina Cooper', 'Jacob Hawkins'], createdBy: 'Shane Black', watchers: 1,
    checklist: [], attachmentFiles: [], commentsList: [{ name: 'Regina Cooper', time: '3 hours ago', text: 'Starting on this today.' }] },
  { id: 4, title: 'Updating Modules', description: 'Step-by-step update of modules.', column: 'inprogress', date: 'Jun 17',
    labels: ['Backend'], assignees: ['Regina Cooper', 'Jacob Hawkins'], createdBy: 'Shane Black', watchers: 2,
    checklist: [{ text: 'Audit old modules', done: true }, { text: 'Update dependencies', done: false }],
    attachmentFiles: [{ name: 'Changelog.txt', size: '12 KB', date: '15.01.2020 at 11:45' }, { name: 'Migration.pdf', size: '640 KB', date: '15.01.2020 at 11:50' }],
    commentsList: templateProgressComments.slice(0, 5) },
  { id: 5, title: 'Template Progress', description: 'We need to develop several options (Inbox template, Chat template, tasks template, Projects template) of cool user interface design templates - to carefully work out the smallest details.',
    column: 'inprogress', date: 'Jun 17', dueDate: '2020-01-17', dueTime: '10:50 AM', labels: ['Design', 'Frontend', 'Backend'],
    assignees: ['Regina Cooper', 'Jacob Hawkins', 'Jane Wilson'], createdBy: 'Shane Black', watchers: 2,
    checklist: templateProgressChecklist, attachmentFiles: templateProgressFiles, commentsList: templateProgressComments },
  { id: 6, title: 'Refresh Photo Slider', description: 'Replace the photos in the slider.', column: 'completed', date: 'Jun 17',
    labels: [], assignees: ['Regina Cooper', 'Jacob Hawkins'], createdBy: 'Shane Black', watchers: 1, image: true,
    checklist: [], attachmentFiles: [{ name: 'slider-01.jpg', size: '2.1 MB', date: '10.01.2020 at 09:00' }, { name: 'slider-02.jpg', size: '1.9 MB', date: '10.01.2020 at 09:00' }, { name: 'slider-03.jpg', size: '2.4 MB', date: '10.01.2020 at 09:00' }],
    commentsList: [] },
  { id: 7, title: 'Server Startup', description: 'Running the server in test mode and configuring.', column: 'completed', date: 'Jun 17',
    labels: [], assignees: ['Regina Cooper', 'Jacob Hawkins'], createdBy: 'Shane Black', watchers: 1,
    checklist: [], attachmentFiles: [], commentsList: Array.from({ length: 17 }, (_, i) => ({ name: 'Jacob Hawkins', time: `${i + 1} days ago`, text: 'Looks good on my end.' })).slice(0, 3) },
  { id: 8, title: 'New Background', description: 'Replace the dashboard background illustration.', column: 'completed', date: 'Jun 17',
    labels: [], assignees: ['Jacob Hawkins'], createdBy: 'Shane Black', watchers: 1, image: true,
    checklist: [], attachmentFiles: [{ name: 'background.svg', size: '340 KB', date: '09.01.2020 at 14:20' }], commentsList: [] },
]

export const calendars = [
  { name: 'Important', dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-400', swatch: '#f87171' },
  { name: 'Meeting', dot: 'bg-sky-500', text: 'text-sky-700', bg: 'bg-sky-100', border: 'border-sky-400', swatch: '#38bdf8' },
  { name: 'Event', dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-500', swatch: '#22c55e' },
  { name: 'Work', dot: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400', swatch: '#facc15' },
  { name: 'Other', dot: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-400', swatch: '#94a3b8' },
]

// swatches offered in the "New Calendar" color picker (matches the Figma palette)
export const calendarSwatches = [
  { swatch: '#f87171', dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-400' },
  { swatch: '#5eead4', dot: 'bg-teal-400', text: 'text-teal-700', bg: 'bg-teal-100', border: 'border-teal-400' },
  { swatch: '#facc15', dot: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400' },
  { swatch: '#4ade80', dot: 'bg-green-400', text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-400' },
  { swatch: '#38bdf8', dot: 'bg-sky-500', text: 'text-sky-700', bg: 'bg-sky-100', border: 'border-sky-400' },
  { swatch: '#2dd4bf', dot: 'bg-teal-500', text: 'text-teal-700', bg: 'bg-teal-100', border: 'border-teal-500' },
  { swatch: '#a3e635', dot: 'bg-lime-400', text: 'text-lime-700', bg: 'bg-lime-100', border: 'border-lime-400' },
  { swatch: '#a78bfa', dot: 'bg-violet-400', text: 'text-violet-700', bg: 'bg-violet-100', border: 'border-violet-400' },
  { swatch: '#f472b6', dot: 'bg-pink-400', text: 'text-pink-700', bg: 'bg-pink-100', border: 'border-pink-400' },
  { swatch: '#94a3b8', dot: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-400' },
]

// Every event uses 10:00-11:30 for its time grid position, matching every Week/Day block in the Figma.
// `end` is the last day the bar covers (inclusive) so month view can draw multi-day bars.
export const initialEvents = [
  { id: 1, title: 'Call Back Priscilla', start: '2020-09-01', end: '2020-09-03', startHour: 10, endHour: 11.5, calendar: 'Important',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum risus egestas elementum erat elementum a est.' },
  { id: 2, title: 'Meeting with Judith', start: '2020-09-09', end: '2020-09-10', startHour: 10, endHour: 11.5, calendar: 'Meeting',
    description: 'Weekly sync to go over open items and blockers.' },
  { id: 3, title: 'Meeting', start: '2020-09-09', end: '2020-09-09', startHour: 10, endHour: 11.5, calendar: 'Meeting',
    description: 'Quick follow-up meeting.' },
  { id: 4, title: 'Project "Rocket"', start: '2020-09-14', end: '2020-09-16', startHour: 10, endHour: 11.5, calendar: 'Work', extra: 5,
    description: 'Kickoff and planning for the Rocket project.' },
  { id: 5, title: 'Presentation', start: '2020-09-23', end: '2020-09-23', startHour: 10, endHour: 11.5, calendar: 'Event',
    description: 'Present the quarterly results to the team.' },
  { id: 6, title: 'Presentation', start: '2020-09-24', end: '2020-09-24', startHour: 12, endHour: 13, calendar: 'Event',
    description: 'Present the quarterly results to leadership.' },
]

export const mailLabels = [
  { name: 'Personal', dot: 'bg-red-500', swatch: '#ef4444' },
  { name: 'Work', dot: 'bg-teal-400', swatch: '#2dd4bf' },
  { name: 'Friends', dot: 'bg-yellow-400', swatch: '#facc15' },
  { name: 'Family', dot: 'bg-green-700', swatch: '#15803d' },
  { name: 'Social', dot: 'bg-sky-400', swatch: '#38bdf8' },
]
export const labelSwatches = ['#ef4444', '#2dd4bf', '#facc15', '#15803d', '#38bdf8', '#22c55e', '#a3e635', '#a78bfa', '#f472b6', '#94a3b8']

export const initialEmails = [
  { id: 1, from: 'Regina Cooper', subject: 'Creative Director Resume', time: '10:45', folder: 'Inbox', starred: true, important: true, read: false, label: '',
    attachments: [{ name: 'Resume.pdf', size: '570 KB' }, { name: 'Portfolio.zip', size: '250 MB' }],
    body: "Hello, Regina Cooper!\n\nI am writing to introduce you to David Boyd. I know you've been looking hard for a candidate for that Creative Director position and I believe David Boyd fits the position.\n\nDavid Boyd and I worked together at Apple company, Where they were the senior Creative Director. They did a terrific job there. David Boyd was responsible for completely restructuring both the public-facing and internal websites. They'd be a great fit at Google company.\n\nI've attached David Boyd resume and portfolio for your review. You can contact David Boyd at regina_cooper@mail.com\n\nThanks for any help you can give. \u{1F642}\n\nBest regards,\nRegina Cooper" },
  { id: 2, from: 'Dustin Williamson', subject: 'Meeting with friends', time: '10:45', folder: 'Inbox', starred: false, important: false, read: false, label: '', attachments: [],
    body: 'Hello, Mark! I am writing to introduce you to David Boyd.\n\nWe use the Arts as a means of touching that part of us that we cannot reach with words alone.' },
  { id: 3, from: 'Jane Wilson', subject: 'UX Conference in New York', time: '10:45', folder: 'Inbox', starred: false, important: false, read: true, label: 'Work', attachments: [{ name: 'Schedule.pdf', size: '120 KB' }],
    body: 'The arts allow us to be as specific or as abstract as we please. It helps us become more thoughtful, open-minded people.' },
  { id: 4, from: 'Brandon Pena', subject: "Muzli's weekly design #236", time: '10:45', folder: 'Inbox', starred: true, important: true, read: false, label: '', attachments: [],
    body: "From dance and music to abstract art our concept of life is shown through the various art forms we create and enjoy." },
  { id: 5, from: 'Jacob Hawkins', subject: 'Weekly project report', time: '10:45', folder: 'Inbox', starred: false, important: true, read: false, label: 'Work', attachments: [],
    body: 'The arts teach us how to communicate through creative expressions of our thoughts.' },
  { id: 6, from: 'Shane Black', subject: 'Order Status #24197118', time: '10:45', folder: 'Inbox', starred: true, important: false, read: true, label: 'Personal', attachments: [],
    body: 'Music, singing, dancing, poetry, and sketching are just a few of the different art forms that let us express ourselves.' },
  { id: 7, from: 'Regina Cooper', subject: 'Welcome to Dribbble!', time: '10:45', folder: 'Inbox', starred: true, important: false, read: true, label: '', attachments: [],
    body: 'Prepare us to adapt to and respect the ways others think, work, and express themselves.' },
  { id: 8, from: 'Jane Wilson', subject: 'Creative Director Resume', time: '10:45', folder: 'Inbox', starred: false, important: false, read: true, label: '', attachments: [],
    body: 'Show us how to understand human experiences, past and present through creative work.' },
  { id: 9, from: 'Jacob Hawkins', subject: 'Weekly project report', time: '10:45', folder: 'Sent', starred: false, important: false, read: true, label: '', attachments: [],
    body: 'Attached is the weekly report. Everything is on schedule.' },
  { id: 10, from: 'Shane Black', subject: 'Order Status #24197120', time: '10:45', folder: 'Sent', starred: false, important: false, read: true, label: '', attachments: [],
    body: 'Music, singing, dancing, poetry, and sketching are just a few of the different art forms.' },
]

export const chatTeams = [
  { id: 't1', name: '#Managers', color: 'bg-sky-400', unread: 0, members: ['Regina Cooper', 'Jane Wilson'],
    files: [{ name: 'Brand Styles Guide.pdf', size: '487 KB' }],
    messages: [{ from: 'Jane Wilson', text: 'Hello, Mark! I am writing to introduce you to David Boyd.', time: '1 day ago', mine: false }] },
  { id: 't2', name: '#Designers', color: 'bg-teal-400', unread: 4, members: [
      { name: 'Jacob Hawkins', role: 'UI/UX Designer' }, { name: 'Regina Cooper', role: 'Project Manager' }, { name: 'Jane Wilson', role: 'Project Manager' },
    ],
    files: [
      { name: 'Brand Styles Guide.pdf', size: '487 KB' }, { name: 'Dashboard UI Kit.psd', size: '2.5 MB' },
      { name: 'Rocket - Admin Dashboard.fig', size: '4.2 MB' }, { name: 'Rocket - Admin Dashboard.sketch', size: '4.2 MB' },
    ],
    messages: [
      { from: 'Jane Wilson', text: 'Hi Cody, any progress on the project?', time: '1 day ago', mine: true },
      { from: 'Jacob Hawkins', text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.', time: '1 day ago', mine: false, images: 3 },
      { from: 'Jane Wilson', text: 'It looks amazing.\nThe customer will be very satisfied.', time: '1 day ago', mine: true },
      { from: 'Jacob Hawkins', text: 'Thank you, glad you liked it. Send me Styles Guide.', time: '1 day ago', mine: false },
      { from: 'Jane Wilson', text: '', time: '2 min ago', mine: true, file: { name: 'Brand Styles Guide.pdf', size: '487 KB' } },
      { from: 'Jacob Hawkins', text: "I'll see later", time: '1 min ago', mine: false },
      { from: 'Jacob Hawkins', text: '', time: 'now', mine: false, file: { name: 'Rocket - Admin Dashboard.fig', size: '8.2 MB' } },
      { from: 'Jane Wilson', text: 'OK, Thank You Jacob \u{1F642}', time: 'now', mine: true },
    ] },
]

export const initialChats = [
  { id: 1, name: 'Dustin Williamson', role: 'Web Developer', online: true, unread: 0,
    info: { email: 'example@mail.com', phone: '+123-4567-8800', birthday: '17 March, 1995', location: 'New York, NY' },
    messages: [{ mine: false, text: 'Hello, Mark! I am writing to introduce you to David.', time: '1 day ago' }] },
  { id: 2, name: 'Jane Wilson', role: 'Creative Director', online: true, unread: 4,
    info: { email: 'example@mail.com', phone: '+123-4567-8800', birthday: '17 March, 1995', location: 'New York, NY' },
    messages: [
      { mine: true, text: 'Hi Cody, any progress on the project?', time: 'day ago' },
      { mine: false, text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.', time: '1 day ago', images: 3 },
      { mine: true, text: 'It looks amazing.\nThe customer will be very satisfied.', time: 'day ago' },
      { mine: false, text: 'Thank you, glad you liked it.\nSend me Styles Guide.', time: '1 day ago' },
      { mine: true, text: '', time: '2 min ago', file: { name: 'Brand Styles Guide.pdf', size: '487 KB' } },
      { mine: false, text: "I'll see later", time: '1 min ago' },
    ] },
  { id: 3, name: 'Regina Cooper', role: 'Project Manager', online: true, unread: 0,
    info: { email: 'cooper@example.com', phone: '+1 (070) 123-4567', birthday: '17 March, 1995', location: 'Sochi, Russia' },
    messages: [{ mine: false, text: 'Hi Jacob. Will you be able to finish the last item by tomorrow?', time: '2 days ago' }] },
  { id: 4, name: 'Brandon Pena', role: 'Product Designer', online: true, unread: 0,
    info: { email: 'pena@example.com', phone: '+1 (070) 123-7890', birthday: '2 June, 1992', location: 'Oslo, Norway' },
    messages: [{ mine: false, text: 'The arts allow us to be as specific or as abstract as we like.', time: '3 days ago' }] },
  { id: 5, name: 'Cody Lane', role: 'Web Developer', online: true, unread: 0,
    info: { email: 'lane@example.com', phone: '+1 (070) 123-6655', birthday: '9 Jan, 1991', location: 'Oslo, Norway' },
    messages: [{ mine: false, text: 'From dance and music to abstract art, we express ourselves.', time: '4 days ago' }] },
  { id: 6, name: 'Shane Black', role: 'Developer', online: true, unread: 0,
    info: { email: 'black@example.com', phone: '+1 (070) 123-8896', birthday: '15 Oct, 1994', location: 'Oslo, Norway' },
    messages: [{ mine: false, text: 'The arts teach us how to communicate through creative expressions.', time: '5 days ago' }] },
]
