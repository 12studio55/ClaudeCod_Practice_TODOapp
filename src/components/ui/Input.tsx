import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-300">{label}</label>
      )}
      <input
        className={`
          w-full rounded-lg bg-white/5 border px-4 py-2.5 text-white placeholder-slate-500
          transition-all duration-150 outline-none
          ${error
            ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
            : 'border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20'
          }
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
