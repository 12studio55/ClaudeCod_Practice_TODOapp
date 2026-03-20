import { Priority } from '../../types/todo'

interface PriorityFilterProps {
  selected: Priority[]
  onToggle: (priority: Priority) => void
}

const PRIORITIES: { priority: Priority; label: string; className: string; activeClass: string }[] = [
  {
    priority: Priority.HIGH,
    label: '高',
    className: 'text-red-400 border-red-500/30 hover:border-red-400',
    activeClass: 'bg-red-500/20 border-red-400 text-red-300',
  },
  {
    priority: Priority.MEDIUM,
    label: '中',
    className: 'text-amber-400 border-amber-500/30 hover:border-amber-400',
    activeClass: 'bg-amber-500/20 border-amber-400 text-amber-300',
  },
  {
    priority: Priority.LOW,
    label: '低',
    className: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400',
    activeClass: 'bg-emerald-500/20 border-emerald-400 text-emerald-300',
  },
]

export function PriorityFilter({ selected, onToggle }: PriorityFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 whitespace-nowrap">優先度:</span>
      <div className="flex gap-1">
        {PRIORITIES.map(({ priority, label, className, activeClass }) => {
          const isSelected = selected.includes(priority)
          return (
            <button
              key={priority}
              onClick={() => onToggle(priority)}
              className={`
                px-3 py-1 text-xs font-medium rounded-full border transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                ${isSelected ? activeClass : `bg-transparent text-slate-500 border-white/10 hover:${className}`}
              `}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
