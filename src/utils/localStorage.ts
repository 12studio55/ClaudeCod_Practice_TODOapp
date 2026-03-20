import type { Todo } from '../types/todo'

const STORAGE_KEY = 'todo-app-v1'

interface StorageData {
  version: number
  todos: Todo[]
}

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as StorageData
    if (data.version !== 1 || !Array.isArray(data.todos)) return []
    return data.todos
  } catch {
    return []
  }
}

export function saveTodos(todos: Todo[]): void {
  const data: StorageData = { version: 1, todos }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
