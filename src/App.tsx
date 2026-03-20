import { useState, useCallback } from 'react'
import type { Todo, TodoFormValues } from './types/todo'
import { useTodos } from './hooks/useTodos'
import { useFilter } from './hooks/useFilter'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { SearchBar } from './components/filters/SearchBar'
import { FilterBar } from './components/filters/FilterBar'
import { PriorityFilter } from './components/filters/PriorityFilter'
import { TodoList } from './components/todo/TodoList'
import { TodoModal } from './components/todo/TodoModal'
import { TodoForm } from './components/todo/TodoForm'
import { Button } from './components/ui/Button'

type ModalState =
  | { type: 'closed' }
  | { type: 'add' }
  | { type: 'edit'; todo: Todo }

export default function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted, stats } = useTodos()
  const { filterState, setStatus, setSearch, togglePriorityFilter, filteredTodos, counts } = useFilter(todos)
  const [modal, setModal] = useState<ModalState>({ type: 'closed' })

  const handleOpenAdd = useCallback(() => setModal({ type: 'add' }), [])
  const handleOpenEdit = useCallback((todo: Todo) => setModal({ type: 'edit', todo }), [])
  const handleCloseModal = useCallback(() => setModal({ type: 'closed' }), [])

  function handleSubmit(values: TodoFormValues) {
    if (modal.type === 'add') {
      addTodo(values)
    } else if (modal.type === 'edit') {
      updateTodo(modal.todo.id, values)
    }
    handleCloseModal()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Header stats={stats} />

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <SearchBar value={filterState.searchQuery} onChange={setSearch} />
            </div>
            <Button onClick={handleOpenAdd} size="md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              タスクを追加
            </Button>
          </div>

          <FilterBar current={filterState.status} counts={counts} onChangeStatus={setStatus} />

          <PriorityFilter selected={filterState.priorityFilter} onToggle={togglePriorityFilter} />
        </div>

        {/* List */}
        <div className="bg-white/3 rounded-2xl border border-white/10 p-4 backdrop-blur-sm">
          <TodoList
            todos={filteredTodos}
            filterStatus={filterState.status}
            hasSearch={filterState.searchQuery.trim().length > 0}
            onToggle={toggleTodo}
            onEdit={handleOpenEdit}
            onDelete={deleteTodo}
          />
          <Footer
            activeCount={stats.active}
            completedCount={stats.completed}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>

      {/* Modal */}
      <TodoModal
        isOpen={modal.type !== 'closed'}
        title={modal.type === 'edit' ? 'タスクを編集' : 'タスクを追加'}
        onClose={handleCloseModal}
      >
        {modal.type !== 'closed' && (
          <TodoForm
            initialValues={modal.type === 'edit' ? modal.todo : undefined}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        )}
      </TodoModal>
    </div>
  )
}
