<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-block mb-8">
          <span class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pure Flave
          </span>
        </router-link>
        <h2 class="text-3xl font-light text-gray-900 mb-2">Welcome back</h2>
        <p class="text-gray-600">Sign in to your account to continue</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="form.email"
              required
              class="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              placeholder="Enter your email"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                required
                class="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 pr-12"
                placeholder="Enter your password"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <router-link to="/forgot-password" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Forgot your password?
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="!isLoading">Sign in</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            </button>
          </div>

          <!-- Divider -->
          <div class="relative" style="display: none;">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Google Login Button -->
          <button
            type="button"
            class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            @click="redirectToGoogle"
            style="display: none;"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="ml-2">Google</span>
          </button>

        </form>
      </div>

      <!-- Sign up link -->
      <div class="text-center">
        <p class="text-gray-600">
          Don't have an account?
          <router-link to="/register" class="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">
            Sign up here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
  import { useAuth } from '@/composables/useAuth'
  import api from '@/services/api'

  const router = useRouter()
  const route = useRoute()
  const { login } = useAuth()

  const form = ref({
    email: '',
    password: '',
    rememberMe: false
  })

  const showPassword = ref(false)
  const isLoading = ref(false)
  const errorMessage = ref('')

  // Handle Google OAuth callback on page load
  onMounted(() => {
    handleGoogleCallback()
  })

  const handleGoogleCallback = async () => {
    const { google_success, token, user: userParam, error } = route.query

    if (error) {
      errorMessage.value = 'Google authentication failed. Please try again.'
      return
    }

    if (google_success && token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam))

        // Use the login function from useAuth
        await login(user, token)

        // Clear URL parameters
        router.replace('/login')

        // Redirect based on user role
        if (user.role === 'admin') {
          router.push({ name: 'admin-dashboard' })
        } else {
          router.push({ name: 'profile' })
        }
      } catch (e) {
        console.error('Error processing Google auth:', e)
        errorMessage.value = 'Google authentication failed. Please try again.'
      }
    }
  }

  const redirectToGoogle = () => {
    // Check if running locally
    const isLocal = window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';

    // Use local URL if running locally, otherwise use production URL
    const url = isLocal
      ? 'http://127.0.0.1:8000/auth/google/redirect'
      : 'https://pure-flave.apilab.website/auth/google/redirect';

    window.location.href = url;
  }

  // Your existing handleLogin function
  const handleLogin = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const response = await api.post('/auth/login', {
        email: form.value.email,
        password: form.value.password
      })

      if (response.data.status) {
        const { user, token } = response.data.data

        // Use the login function from useAuth
        await login(user, token)

        // Redirect based on user role
        if (user.role === 'admin') {
          router.push({ name: 'admin-dashboard' })
        } else {
          router.push({ name: 'profile' })
        }
      } else {
        errorMessage.value = response.data.message || 'Login failed. Please try again.'
      }
    } catch (error) {
      // Handle network errors or other issues
      if (error.response?.data?.message) {
        errorMessage.value = error.response.data.message
      } else {
        errorMessage.value = 'Something went wrong. Please try again.'
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

<style scoped>
/* Custom focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
