import { FilterStatus } from '../../types/todo'

interface FilterBarProps {
  current: FilterStatus
  counts: { all: number; active: number; completed: number }
  onChangeStatus: (status: FilterStatus) => void
}

const TABS: { status: FilterStatus; label: string; key: keyof typeof FilterStatus }[] = [
  { status: FilterStatus.ALL, label: 'すべて', key: 'ALL' },
  { status: FilterStatus.ACTIVE, label: '未完了', key: 'ACTIVE' },
  { status: FilterStatus.COMPLETED, label: '完了済み', key: 'COMPLETED' },
]

export function FilterBar({ current, counts, onChangeStatus }: FilterBarProps) {
  const countMap = {
    [FilterStatus.ALL]: counts.all,
    [FilterStatus.ACTIVE]: counts.active,
    [FilterStatus.COMPLETED]: counts.completed,
  }

  return (
    <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
      {TABS.map(({ status, label }) => {
        const isActive = current === status
        return (
          <button
            key={status}
            onClick={() => onChangeStatus(status)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
              transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
              ${isActive
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {label}
            <span className={`
              text-xs px-1.5 py-0.5 rounded-full font-mono
              ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}
            `}>
              {countMap[status]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
