import { Priority, type Todo } from '../types/todo'
import { isOverdue } from './dateUtils'

const PRIORITY_WEIGHT: Record<Priority, number> = {
  [Priority.HIGH]: 0,
  [Priority.MEDIUM]: 1,
  [Priority.LOW]: 2,
}

export function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    // Completed items go to bottom
    if (a.completed !== b.completed) return a.completed ? 1 : -1

    // Among incomplete: overdue first
    const aOverdue = !a.completed && isOverdue(a.dueDate)
    const bOverdue = !b.completed && isOverdue(b.dueDate)
    if (aOverdue !== bOverdue) return aOverdue ? -1 : 1

    // Then by priority
    const pDiff = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
    if (pDiff !== 0) return pDiff

    // Then by due date (earlier first, nulls last)
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate)
    if (a.dueDate) return -1
    if (b.dueDate) return 1

    // Finally by creation time (newest first)
    return b.createdAt.localeCompare(a.createdAt)
  })
}
