import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Todo } from '../../types/todo'
import { Priority } from '../../types/todo'
import { Badge } from '../ui/Badge'
import { formatDate, isOverdue, isDueToday } from '../../utils/dateUtils'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

const BORDER_COLOR: Record<Priority, string> = {
  [Priority.HIGH]: 'border-l-red-500',
  [Priority.MEDIUM]: 'border-l-amber-400',
  [Priority.LOW]: 'border-l-emerald-400',
}

export const TodoItem = memo(function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const overdue = !todo.completed && isOverdue(todo.dueDate)
  const dueToday = !todo.completed && isDueToday(todo.dueDate)

  function handleDelete() {
    if (confirmDelete) {
      onDelete(todo.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.2 }}
      className={`
        group flex items-start gap-4 p-4 rounded-xl
        bg-white/5 border border-white/10 border-l-4
        hover:bg-white/8 transition-colors duration-150
        ${BORDER_COLOR[todo.priority]}
        ${todo.completed ? 'opacity-50' : ''}
      `}
      role="listitem"
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'タスクを未完了にする' : 'タスクを完了にする'}
        className={`
          mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
          ${todo.completed
            ? 'bg-purple-600 border-purple-600'
            : 'border-white/30 hover:border-purple-400'
          }
          flex items-center justify-center
        `}
      >
        {todo.completed && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <span className={`
            font-medium text-sm leading-relaxed break-words
            ${todo.completed ? 'line-through text-slate-500' : 'text-white'}
          `}>
            {todo.title}
          </span>
          <Badge priority={todo.priority} />
        </div>

        {todo.description && (
          <p className="text-xs text-slate-400 mt-1 leading-relaxed break-words">
            {todo.description}
          </p>
        )}

        {todo.dueDate && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium
            ${overdue ? 'text-red-400' : dueToday ? 'text-amber-400' : 'text-slate-500'}
          `}>
            {overdue && (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{overdue ? '期限切れ: ' : dueToday ? '今日まで: ' : ''}{formatDate(todo.dueDate)}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        <button
          onClick={() => onEdit(todo)}
          aria-label="編集"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10
            transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          aria-label={confirmDelete ? '本当に削除する' : '削除'}
          className={`p-1.5 rounded-lg transition-all duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500
            ${confirmDelete
              ? 'text-red-400 bg-red-500/20 ring-1 ring-red-500/50'
              : 'text-slate-400 hover:text-red-400 hover:bg-red-500/10'
            }
          `}
        >
          {confirmDelete ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
    </motion.li>
  )
})
