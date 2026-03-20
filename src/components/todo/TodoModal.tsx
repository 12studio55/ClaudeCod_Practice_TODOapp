import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TodoModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function TodoModal({ isOpen, title, onClose, children }: TodoModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors rounded-lg p-1
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                aria-label="閉じる"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
