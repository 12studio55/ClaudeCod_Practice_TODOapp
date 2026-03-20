import { useCallback, useMemo, useState } from 'react'
import { FilterStatus, Priority, type FilterState, type Todo } from '../types/todo'
import { sortTodos } from '../utils/sortUtils'

const DEFAULT_FILTER: FilterState = {
  status: FilterStatus.ALL,
  searchQuery: '',
  priorityFilter: [],
}

export function useFilter(todos: Todo[]) {
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER)

  const setStatus = useCallback((status: FilterStatus) => {
    setFilterState((prev) => ({ ...prev, status }))
  }, [])

  const setSearch = useCallback((searchQuery: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery }))
  }, [])

  const togglePriorityFilter = useCallback((priority: Priority) => {
    setFilterState((prev) => {
      const exists = prev.priorityFilter.includes(priority)
      return {
        ...prev,
        priorityFilter: exists
          ? prev.priorityFilter.filter((p) => p !== priority)
          : [...prev.priorityFilter, priority],
      }
    })
  }, [])

  const filteredTodos = useMemo(() => {
    let result = todos

    if (filterState.status === FilterStatus.ACTIVE) {
      result = result.filter((t) => !t.completed)
    } else if (filterState.status === FilterStatus.COMPLETED) {
      result = result.filter((t) => t.completed)
    }

    if (filterState.priorityFilter.length > 0) {
      result = result.filter((t) => filterState.priorityFilter.includes(t.priority))
    }

    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    }

    return sortTodos(result)
  }, [todos, filterState])

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }), [todos])

  return { filterState, setStatus, setSearch, togglePriorityFilter, filteredTodos, counts }
}
