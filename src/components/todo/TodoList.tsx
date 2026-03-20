import { AnimatePresence } from 'framer-motion'
import type { Todo } from '../../types/todo'
import { FilterStatus } from '../../types/todo'
import { TodoItem } from './TodoItem'
import { EmptyState } from '../ui/EmptyState'

interface TodoListProps {
  todos: Todo[]
  filterStatus: FilterStatus
  hasSearch: boolean
  onToggle: (id: string) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, filterStatus, hasSearch, onToggle, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState status={filterStatus} hasSearch={hasSearch} />
  }

  return (
    <ul className="flex flex-col gap-2" role="list">
      <AnimatePresence mode="popLayout" initial={false}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </ul>
  )
}
