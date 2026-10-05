// Mock data for the Projects > Gantt chart view
export const ganttMembers = ['Jacob Hawkins', 'Regina Cooper', 'Jane Wilson']

export const initialGanttGroups = [
  { id: 'planning', name: 'Planning', start: 3, end: 6, progress: 100, color: '#86efac', dateRange: '03 Sep, 2020 — 06 Sep, 2020', taskCount: 4, doneCount: 4, members: ganttMembers },
  { id: 'wireframing', name: 'Wireframing', start: 3, end: 7, progress: 100, color: '#5eead4', dateRange: '03 Sep, 2020 — 07 Sep, 2020', taskCount: 3, doneCount: 3, members: ganttMembers },
  { id: 'design', name: 'Design', start: 4, end: 10, progress: 60, color: '#fde68a', dateRange: '04 Sep, 2020 — 10 Sep, 2020', taskCount: 6, doneCount: 3, members: ganttMembers,
    tasks: [
      { id: 'font', name: 'Font Research', start: 5, end: 8, progress: 100 },
      { id: 'palette', name: 'Color Palette', start: 5, end: 9, progress: 80 },
      { id: 'mockup', name: 'Mockup', start: 6, end: 9, progress: 25 },
      { id: 'ui', name: 'User Interface', start: 7, end: 10, progress: 50 },
      { id: 'illustrations', name: 'Illustrations', start: 8, end: 10, progress: 100 },
      { id: 'animflow', name: 'Animated UI Flow', start: 5, end: 8, progress: 0 },
    ] },
  { id: 'development', name: 'Development', start: 9, end: 14, progress: 50, color: '#5eead4', dateRange: '09 Sep, 2020 — 14 Sep, 2020', taskCount: 8, doneCount: 4, members: ganttMembers },
  { id: 'testing', name: 'Testing', start: 11, end: 16, progress: 0, color: '#c4b5fd', dateRange: '11 Sep, 2020 — 16 Sep, 2020', taskCount: 5, doneCount: 0, members: ganttMembers },
]

// dependency arrow: end of one row links to the start of another (drawn as a dashed connector)
export const ganttDependency = { from: 'animflow', to: 'development' }
