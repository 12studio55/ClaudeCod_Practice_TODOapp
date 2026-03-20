import { useEffect, useRef, useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onChange(localValue)
    }, 300)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [localValue, onChange])

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="タスクを検索..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/10
          text-white placeholder-slate-500 outline-none transition-all duration-150
          focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-sm"
      />
      {localValue && (
        <button
          onClick={() => { setLocalValue(''); onChange('') }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
          aria-label="検索をクリア"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
