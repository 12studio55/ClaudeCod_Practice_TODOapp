import { Priority } from '../../types/todo'

interface BadgeProps {
  priority: Priority
  size?: 'sm' | 'md'
}

const CONFIG: Record<Priority, { label: string; className: string }> = {
  [Priority.HIGH]: {
    label: '高',
    className: 'bg-red-500/20 text-red-400 border border-red-500/30',
  },
  [Priority.MEDIUM]: {
    label: '中',
    className: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  },
  [Priority.LOW]: {
    label: '低',
    className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  },
}

export function Badge({ priority, size = 'sm' }: BadgeProps) {
  const { label, className } = CONFIG[priority]
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${className}`}>
      {label}
    </span>
  )
}
