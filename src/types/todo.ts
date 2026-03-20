export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: Priority
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export interface TodoFormValues {
  title: string
  description: string
  priority: Priority
  dueDate: string
}

export interface FilterState {
  status: FilterStatus
  searchQuery: string
  priorityFilter: Priority[]
}

export type TodoAction =
  | { type: 'ADD'; payload: Todo }
  | { type: 'UPDATE'; payload: Todo }
  | { type: 'DELETE'; payload: { id: string } }
  | { type: 'TOGGLE'; payload: { id: string } }
  | { type: 'CLEAR_COMPLETED' }
