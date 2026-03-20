import { useState, type FormEvent } from 'react'
import { Priority, type Todo, type TodoFormValues } from '../../types/todo'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { todayIso } from '../../utils/dateUtils'

interface TodoFormProps {
  initialValues?: Todo
  onSubmit: (values: TodoFormValues) => void
  onCancel: () => void
}

const PRIORITY_OPTIONS: { value: Priority; label: string; className: string }[] = [
  { value: Priority.HIGH, label: '高', className: 'text-red-400' },
  { value: Priority.MEDIUM, label: '中', className: 'text-amber-400' },
  { value: Priority.LOW, label: '低', className: 'text-emerald-400' },
]

export function TodoForm({ initialValues, onSubmit, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [priority, setPriority] = useState<Priority>(initialValues?.priority ?? Priority.MEDIUM)
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? '')
  const [titleError, setTitleError] = useState('')

  const isEdit = !!initialValues

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setTitleError('タイトルを入力してください')
      return
    }
    setTitleError('')
    onSubmit({ title, description, priority, dueDate })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="タイトル *"
        placeholder="タスクのタイトルを入力..."
        value={title}
        onChange={(e) => { setTitle(e.target.value); setTitleError('') }}
        error={titleError}
        autoFocus
        maxLength={100}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300">メモ</label>
        <textarea
          placeholder="詳細を入力（任意）..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={500}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white
            placeholder-slate-500 outline-none transition-all duration-150 resize-none text-sm
            focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-slate-300">優先度</label>
          <div className="flex gap-2">
            {PRIORITY_OPTIONS.map(({ value, label, className }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPriority(value)}
                className={`
                  flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
                  ${priority === value
                    ? `bg-white/10 border-white/30 ${className}`
                    : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-400'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-slate-300">期限日</label>
          <input
            type="date"
            value={dueDate}
            min={isEdit ? undefined : todayIso()}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-white
              outline-none transition-all duration-150 text-sm
              focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20
              [color-scheme:dark]"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2 border-t border-white/10">
        <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit" variant="primary" className="flex-1">
          {isEdit ? '更新する' : '追加する'}
        </Button>
      </div>
    </form>
  )
}
