// Small set of line icons (feather style). Add more paths here when needed.
const paths = {
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  cart: 'M6 6h15l-1.5 9h-12zM6 6L5 2H2M9 20h.01M18 20h.01',
  calendar: 'M3 5h18v16H3zM16 3v4M8 3v4M3 10h18',
  mail: 'M3 5h18v14H3zM3 5l9 8 9-8',
  chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  tasks: 'M9 3h6v3H9zM6 5H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1',
  layers: 'M12 2l10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5',
  folder: 'M3 6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  menu: 'M3 6h18M3 12h12M3 18h18',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  plus: 'M12 5v14M5 12h14',
  x: 'M18 6L6 18M6 6l12 12',
  chevron: 'M6 9l6 6 6-6',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  clip: 'M21.4 11l-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5',
  smile: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01',
  image: 'M3 3h18v18H3zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  reply: 'M9 14L4 9l5-5M4 9h10a6 6 0 0 1 6 6v3',
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  twitter: 'M23 3a10.9 10.9 0 0 1-3.1 1.5 4.5 4.5 0 0 0-7.7 4.1A12.9 12.9 0 0 1 2.8 3.9a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6 4.5 4.5 0 0 0 3.6 4.5 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 19.5 12.8 12.8 0 0 0 8 21.5c8.3 0 12.9-6.9 12.9-12.9v-.6A9.2 9.2 0 0 0 23 3z',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2zM17.5 6.5h.01',
}

export default function Icon({ name, size = 18, className = '', fill = 'none' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name]} />
    </svg>
  )
}
