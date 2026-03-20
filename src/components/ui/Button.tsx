import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20',
  secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/10',
  danger: 'text-red-400 hover:text-red-300 hover:bg-red-500/10',
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-150 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
