// composables/useAuth.js
import { ref, computed } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

// Global state - shared across all components
const user = ref(null)
const token = ref(localStorage.getItem('token'))

// Load user from localStorage if available
if (token.value) {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      localStorage.removeItem('user')
    }
  }
}

export const useAuth = () => {
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const isAdmin = computed(() => user.value?.role === 'admin')

  // Login function
  const login = async (userData, authToken) => {
    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(userData))
    token.value = authToken
    user.value = userData
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = null
    user.value = null
    router.push({ name: 'home' })
  }

  // Check if user is still valid (call this on app startup)
  const checkAuth = async () => {
    const storedToken = localStorage.getItem('token')

    if (!storedToken) {
      return false
    }

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await api.get('/auth/me', {
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (response.data.status) {
        token.value = storedToken
        user.value = response.data.data.user
        localStorage.setItem('user', JSON.stringify(user.value))
        return true
      } else {
        logout()
        return false
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Auth check timed out')
      }
      // Don't logout on network errors - user might be offline
      // Only logout if we get a clear 401/403 response
      if (error.response && [401, 403].includes(error.response.status)) {
        logout()
      }
      return false
    }
  }

  // Refresh user data from server
  const refreshUser = async () => {
    if (!token.value) return

    try {
      const response = await api.get('/auth/me')
      if (response.data.status) {
        user.value = response.data.data.user
        localStorage.setItem('user', JSON.stringify(user.value))
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error)
    }
  }

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    isAdmin,
    login,
    logout,
    checkAuth,
    refreshUser
  }
}
