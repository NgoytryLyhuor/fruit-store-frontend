// composables/useAuth.js
import { ref, computed } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

// Global state - shared across all components
const user = ref(null)
const token = ref(localStorage.getItem('token'))

export const useAuth = () => {
  const router = useRouter() // Move this inside the function

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const isAdmin = computed(() => user.value?.role === 'admin')

  // Login function
  const login = async (userData, authToken) => {
    localStorage.setItem('token', authToken)
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
      const response = await api.get('/auth/me')

      if (response.data.success) {
        token.value = storedToken
        user.value = response.data.data.user
        return true
      } else {
        logout()
        return false
      }
    } catch (error) {
      logout()
      return false
    }
  }

  // Refresh user data from server
  const refreshUser = async () => {
    if (!token.value) return

    try {
      const response = await api.get('/auth/me')
      if (response.data.success) {
        user.value = response.data.data.user
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
