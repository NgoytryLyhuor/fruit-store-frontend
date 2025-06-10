// composables/useAuth.js
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Global reactive state
const user = ref(null)
const isLoading = ref(false)

// Initialize user from localStorage
const initializeAuth = () => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (error) {
      console.error('Error parsing stored user:', error)
      localStorage.removeItem('user')
    }
  }
}

// Initialize on first load
initializeAuth()

export function useAuth() {
  const router = useRouter()

  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isCustomer = computed(() => user.value?.role === 'customer')
  const userName = computed(() => user.value?.name || user.value?.email || 'User')

  // Login function
  const login = (userData) => {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout function
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    router.push({ name: 'home' })
  }

  // Check if user has specific role
  const hasRole = (role) => {
    return user.value?.role === role
  }

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user.value?.role)
  }

  return {
    // State
    user: computed(() => user.value),
    isLoading,

    // Computed
    isAuthenticated,
    isAdmin,
    isCustomer,
    userName,

    // Methods
    login,
    logout,
    hasRole,
    hasAnyRole,
    initializeAuth
  }
}
