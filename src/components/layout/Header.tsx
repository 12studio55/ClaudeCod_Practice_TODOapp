interface HeaderProps {
  stats: {
    total: number
    active: number
    completed: number
    high: number
  }
}

export function Header({ stats }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">TODO App</h1>
      </div>
      <p className="text-slate-400 text-sm mb-6">タスクを管理して、生産性を高めましょう</p>

      <div className="flex justify-center gap-4">
        <StatCard label="合計" value={stats.total} color="text-slate-300" />
        <StatCard label="未完了" value={stats.active} color="text-purple-400" />
        <StatCard label="完了済み" value={stats.completed} color="text-emerald-400" />
        {stats.high > 0 && (
          <StatCard label="高優先度" value={stats.high} color="text-red-400" />
        )}
      </div>
    </header>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 min-w-[70px]">
      <span className={`text-2xl font-bold tabular-nums ${color}`}>{value}</span>
      <span className="text-xs text-slate-500 mt-0.5">{label}</span>
    </div>
  )
}
