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
        <h2 class="text-3xl font-light text-gray-900 mb-2">Set new password</h2>
        <p class="text-gray-600">Enter your new password below</p>
      </div>

      <!-- Reset Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form v-if="!resetComplete" class="space-y-6" @submit.prevent="handlePasswordReset">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input id="password" name="password" type="password" v-model="form.password" required
              class="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              placeholder="Enter your new password">
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input id="password_confirmation" name="password_confirmation" type="password"
              v-model="form.password_confirmation" required
              class="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              placeholder="Confirm your new password">
          </div>

          <!-- Password Requirements -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li class="flex items-center">
                <CheckIcon v-if="passwordValidation.minLength" class="w-4 h-4 text-green-500 mr-2" />
                <XMarkIcon v-else class="w-4 h-4 text-red-500 mr-2" />
                At least 6 characters
              </li>
              <li class="flex items-center">
                <CheckIcon v-if="passwordValidation.match" class="w-4 h-4 text-green-500 mr-2" />
                <XMarkIcon v-else class="w-4 h-4 text-red-500 mr-2" />
                Passwords match
              </li>
            </ul>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <ExclamationTriangleIcon class="w-5 h-5 text-red-400" />
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="isLoading || !isFormValid"
              class="w-full bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              <span v-if="!isLoading">Reset Password</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Resetting...
              </span>
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-else class="text-center space-y-6">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckIcon class="w-8 h-8 text-green-600" />
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Password Reset Successful!</h3>
            <p class="text-gray-600 mb-4">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
          </div>

          <router-link to="/login"
            class="w-full inline-block bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 text-center">
            Sign In Now
          </router-link>
        </div>
      </div>

      <!-- Back to login -->
      <div class="text-center">
        <router-link to="/login"
          class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Back to sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  CheckIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const form = ref({
  email: '',
  token: '',
  password: '',
  password_confirmation: ''
})

const isLoading = ref(false)
const resetComplete = ref(false)
const error = ref('')

// Get email and token from URL parameters
onMounted(() => {
  form.value.email = route.query.email || ''
  form.value.token = route.query.token || ''

  if (!form.value.email || !form.value.token) {
    error.value = 'Invalid reset link. Please request a new password reset.'
  }
})

// Password validation
const passwordValidation = computed(() => ({
  minLength: form.value.password.length >= 6,
  match: form.value.password === form.value.password_confirmation && form.value.password !== ''
}))

const isFormValid = computed(() => {
  return passwordValidation.value.minLength &&
    passwordValidation.value.match &&
    form.value.email &&
    form.value.token
})

const handlePasswordReset = async () => {
  if (!isFormValid.value) return

  isLoading.value = true
  error.value = ''

  try {
    const response = await api.post('/auth/reset-password', {
      email: form.value.email,
      token: form.value.token,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation
    })

    if (response.data.status) {
      resetComplete.value = true
    } else {
      error.value = response.data.message || 'Failed to reset password'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to reset password. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
