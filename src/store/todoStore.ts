import type { Todo, TodoAction } from '../types/todo'

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]

    case 'UPDATE':
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      )

    case 'DELETE':
      return state.filter((todo) => todo.id !== action.payload.id)

    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )

    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed)

    default:
      return state
  }
}
