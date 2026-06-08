import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/auth.service.js'
import { useToast } from './ToastContext.jsx'

const AuthContext = createContext(null)
const STORAGE_KEY = 'melodystream_auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const value = JSON.parse(raw)
        setUser(value)
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const saveUser = (payload) => {
    setUser(payload)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }

  const clearUser = () => {
    setUser(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const login = async (credentials) => {
    const response = await authService.login(credentials)
    saveUser(response.data.user)
    toast.success(response.data.message || 'Welcome back!')
    return response.data.user
  }

  const register = async (payload) => {
    const response = await authService.register(payload)
    saveUser(response.data.user)
    toast.success(response.data.message || 'Registration successful!')
    return response.data.user
  }

  const logout = async () => {
    await authService.logout()
    clearUser()
    toast.info('You have been logged out.')
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout, clearUser }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
