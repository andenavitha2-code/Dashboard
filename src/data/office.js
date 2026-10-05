// Mock data for File Manager, Notes, Contacts and Social
export const initialFolders = [
  { id: 1, name: 'Design', size: '5.8 GB', modified: 'Sep 10, 2020 4:25', created: 'Sep 10, 2020 2:05' },
  { id: 2, name: 'Projects', size: '3.2 GB', modified: 'Sep 10, 2020 4:25', created: 'Sep 10, 2020 2:05' },
  { id: 3, name: 'Music', size: '1.6 GB', modified: 'Sep 8, 2020 1:10', created: 'Aug 2, 2020 9:40' },
  { id: 4, name: 'Pictures', size: '1.7 GB', modified: 'Sep 8, 2020 1:10', created: 'Aug 2, 2020 9:40' },
  { id: 5, name: 'Documents', size: '480 MB', modified: 'Sep 5, 2020 5:50', created: 'Jul 20, 2020 3:15' },
  { id: 6, name: 'Downloads', size: '10.1 GB', modified: 'Sep 12, 2020 8:00', created: 'Jul 20, 2020 3:15' },
]
export const initialFiles = [
  { id: 11, name: 'Rocket – Admin Dashboard', type: 'Figma', size: '1.8 MB', modified: 'Sep 12, 2020 1:40', created: 'Sep 1, 2020 11:00' },
  { id: 12, name: 'Arion – Admin Dashboard', type: 'Sketch', size: '1.2 MB', modified: 'Sep 12, 2020 1:40', created: 'Sep 1, 2020 11:00' },
  { id: 13, name: 'Project Brief', type: 'Docx', size: '1.4 MB', modified: 'Sep 9, 2020 10:15', created: 'Sep 1, 2020 11:00' },
  { id: 14, name: 'vCard – Resume', type: 'Psd', size: '2.5 MB', modified: 'Sep 9, 2020 10:15', created: 'Sep 1, 2020 11:00' },
  { id: 15, name: 'Brand Styles Guide', type: 'Pdf', size: '4.5 MB', modified: 'Sep 7, 2020 6:30', created: 'Aug 28, 2020 9:00' },
]
export const initialNotes = [
  { id: 1, title: 'The title of a note', text: 'Lorem ipsum dolor sit amet, ullamcorper consectetur adipiscing elit, sed do eiusmod tempor.', date: '12 June, 2020', pinned: false },
  { id: 2, title: 'Meeting ideas', text: 'Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.', date: '12 June, 2020', pinned: true },
  { id: 3, title: 'Shopping list', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.', date: '12 June, 2020', pinned: false },
  { id: 4, title: 'Reading list', text: 'Ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.', date: '12 June, 2020', pinned: false },
  { id: 5, title: 'Travel plans', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.', date: '12 June, 2020', pinned: false },
  { id: 6, title: 'Project ideas', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.', date: '12 June, 2020', pinned: false },
]

export const contactRoles = {
  Manager: 'bg-green-50 text-green-700', 'Creative Director': 'bg-yellow-50 text-yellow-700',
  Designer: 'bg-red-50 text-red-600', Developer: 'bg-teal-50 text-teal-700', 'Senior Vice President': 'bg-purple-50 text-purple-700',
}
export const initialContacts = [
  { id: 1, first: 'Regina', last: 'Cooper', email: 'cooper@example.com', location: 'Sochi, Russia', phone: '123-4567', job: 'Manager', status: 'Active', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: true },
  { id: 2, first: 'Judith', last: 'Black', email: 'black@example.com', location: 'New York, USA', phone: '123-8459', job: 'Creative Director', status: 'Active', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: false },
  { id: 3, first: 'Ronald', last: 'Robertson', email: 'robe@example.com', location: 'Paris, France', phone: '123-9221', job: 'Manager', status: 'Blocked', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: true },
  { id: 4, first: 'Dustin', last: 'Williamson', email: 'williams@example.com', location: 'Sydney, Australia', phone: '123-0507', job: 'Designer', status: 'Active', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: false },
  { id: 5, first: 'Calvin', last: 'Flores', email: 'flores@example.com', location: 'Berlin, Germany', phone: '123-3791', job: 'Manager', status: 'Active', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: false },
  { id: 6, first: 'Robert', last: 'Edwards', email: 'edwards@example.com', location: 'Shanghai, China', phone: '123-1147', job: 'Developer', status: 'Active', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: false },
  { id: 7, first: 'Colleen', last: 'Warren', email: 'warren@example.com', location: 'Ottawa, Canada', phone: '123-9127', job: 'Manager', status: 'Active', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: false },
  { id: 8, first: 'Bessie', last: 'Henry', email: 'henry@example.com', location: 'New York, USA', phone: '123-2578', job: 'Designer', status: 'Active', dob: { day: '17', month: 'March', year: '1995' }, notes: '', favorite: false },
]

export const initialPosts = [
  { id: 1, author: 'Dustin Williamson', time: 'Jan 17, 2020', text: 'Generally think of the arts as a prestigious topic. We can come up with new ideas and change our perspectives.', likes: 56, liked: false, comments: ['Very interesting and informative!'] },
  { id: 2, author: 'Judith Black', time: 'Jan 15, 2020', text: 'Creativity is a resource. It is possible that no other resource is as important.', likes: 21, liked: false, comments: [] },
]
