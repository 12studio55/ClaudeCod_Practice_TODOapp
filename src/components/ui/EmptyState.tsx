import { FilterStatus } from '../../types/todo'

interface EmptyStateProps {
  status: FilterStatus
  hasSearch: boolean
}

export function EmptyState({ status, hasSearch }: EmptyStateProps) {
  const content = hasSearch
    ? { icon: '🔍', title: '検索結果がありません', sub: '別のキーワードで試してください' }
    : status === FilterStatus.COMPLETED
    ? { icon: '✅', title: '完了済みタスクはありません', sub: 'タスクを完了すると、ここに表示されます' }
    : status === FilterStatus.ACTIVE
    ? { icon: '🎉', title: '全てのタスクが完了しています！', sub: '新しいタスクを追加しましょう' }
    : { icon: '📝', title: 'タスクがありません', sub: '「タスクを追加」ボタンから始めましょう' }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">{content.icon}</div>
      <h3 className="text-lg font-semibold text-slate-300 mb-2">{content.title}</h3>
      <p className="text-sm text-slate-500">{content.sub}</p>
    </div>
  )
}
