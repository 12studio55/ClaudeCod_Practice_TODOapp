import { Button } from '../ui/Button'

interface FooterProps {
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

export function Footer({ activeCount, completedCount, onClearCompleted }: FooterProps) {
  return (
    <footer className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
      <span className="text-xs text-slate-500">
        {activeCount} 件のタスクが残っています
      </span>
      {completedCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCompleted}
          className="text-xs"
        >
          完了済みを削除 ({completedCount})
        </Button>
      )}
    </footer>
  )
}
