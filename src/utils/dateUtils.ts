export function formatDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00')
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate + 'T00:00:00')
  return due < today
}

export function isDueToday(dueDate: string | null): boolean {
  if (!dueDate) return false
  const today = new Date().toISOString().split('T')[0]
  return dueDate === today
}

export function todayIso(): string {
  return new Date().toISOString().split('T')[0] ?? ''
}
