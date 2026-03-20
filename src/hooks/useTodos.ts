import { useCallback, useEffect, useReducer } from 'react'
import { type Todo, type TodoFormValues, Priority } from '../types/todo'
import { todoReducer } from '../store/todoStore'
import { loadTodos, saveTodos } from '../utils/localStorage'

function init(): Todo[] {
  return loadTodos()
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, init)

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = useCallback((values: TodoFormValues) => {
    const now = new Date().toISOString()
    const todo: Todo = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      description: values.description.trim(),
      completed: false,
      priority: values.priority,
      dueDate: values.dueDate || null,
      createdAt: now,
      updatedAt: now,
    }
    dispatch({ type: 'ADD', payload: todo })
  }, [])

  const updateTodo = useCallback((id: string, values: TodoFormValues) => {
    const existing = todos.find((t) => t.id === id)
    if (!existing) return
    const updated: Todo = {
      ...existing,
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      dueDate: values.dueDate || null,
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: 'UPDATE', payload: updated })
  }, [todos])

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE', payload: { id } })
  }, [])

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE', payload: { id } })
  }, [])

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }, [])

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
    high: todos.filter((t) => !t.completed && t.priority === Priority.HIGH).length,
  }

  return { todos, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted, stats }
}
