import { createContext, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dispatch = (type, message, title) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setToasts((current) => [...current, { id, type, message, title }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3800)
  }

  const value = useMemo(
    () => ({
      toasts,
      success: (message, title = 'Success') => dispatch('success', message, title),
      error: (message, title = 'Error') => dispatch('error', message, title),
      info: (message, title = 'Info') => dispatch('info', message, title),
    }),
    [toasts],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
