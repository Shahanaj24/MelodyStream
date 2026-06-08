import api from './api.js'

export function login(credentials) {
  return api.post('/auth/login', credentials)
}

export function register(payload) {
  return api.post('/auth/register', payload)
}

export function logout() {
  return api.post('/auth/logout')
}
