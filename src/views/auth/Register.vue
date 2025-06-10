<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-gray-500 space-y-8">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-block mb-8">
          <span class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pure Flave
          </span>
        </router-link>
        <h2 class="text-3xl font-light text-gray-900 mb-2">Create your account</h2>
        <p class="text-gray-600">Join us and start enjoying fresh fruits</p>
      </div>

      <!-- Registration Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                v-model="form.firstName"
                required
                class="w-full text-gray-500 text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                placeholder="John"
              >
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                v-model="form.lastName"
                required
                class="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                placeholder="Doe"
              >
            </div>
          </div>

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
              placeholder="john@example.com"
            >
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              Phone number (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              v-model="form.phone"
              class="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              placeholder="+1 (555) 123-4567"
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
                placeholder="Create a strong password"
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
            <!-- Password strength indicator -->
            <div class="mt-2">
              <div class="flex space-x-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  :class="getPasswordStrengthColor(i)"
                  class="h-1 flex-1 rounded-full transition-colors duration-200"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ passwordStrengthText }}</p>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm password
            </label>
            <div class="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="form.confirmPassword"
                required
                class="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 pr-12"
                placeholder="Confirm your password"
              >
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="form.confirmPassword && !passwordsMatch" class="text-xs text-red-600 mt-1">
              Passwords do not match
            </p>
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                v-model="form.acceptTerms"
                required
                class="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="text-gray-700">
                I agree to the
                <a href="#" class="text-gray-900 hover:text-gray-700 underline">Terms of Service</a>
                and
                <a href="#" class="text-gray-900 hover:text-gray-700 underline">Privacy Policy</a>
              </label>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                v-model="form.newsletter"
                class="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="newsletter" class="text-gray-700">
                Subscribe to our newsletter for updates and special offers
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="w-full text-gray-500 bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="!isLoading">Create account</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            </button>
          </div>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full text-gray-500 border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <!-- Social Registration -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="w-full text-gray-500 inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="ml-2">Google</span>
            </button>

            <button
              type="button"
              class="w-full text-gray-500 inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="ml-2">Facebook</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Sign in link -->
      <div class="text-center">
        <p class="text-gray-600">
          Already have an account?
          <router-link to="/login" class="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">
            Sign in here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Register',
  components: {
    EyeIcon,
    EyeSlashIcon
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        newsletter: false
      },
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false
    }
  },
  computed: {
    passwordStrength() {
      const password = this.form.password
      if (!password) return 0

      let strength = 0
      if (password.length >= 8) strength++
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
      if (/\d/.test(password)) strength++
      if (/[^a-zA-Z\d]/.test(password)) strength++

      return strength
    },
    passwordStrengthText() {
      const strength = this.passwordStrength
      if (!this.form.password) return 'Enter a password'
      if (strength === 1) return 'Weak password'
      if (strength === 2) return 'Fair password'
      if (strength === 3) return 'Good password'
      if (strength === 4) return 'Strong password'
      return 'Very weak password'
    },
    passwordsMatch() {
      return this.form.password === this.form.confirmPassword
    },
    isFormValid() {
      return (
        this.form.firstName &&
        this.form.lastName &&
        this.form.email &&
        this.form.password &&
        this.form.confirmPassword &&
        this.passwordsMatch &&
        this.passwordStrength >= 2 &&
        this.form.acceptTerms
      )
    }
  },
  methods: {
    getPasswordStrengthColor(index) {
      const strength = this.passwordStrength
      if (index <= strength) {
        if (strength === 1) return 'bg-red-400'
        if (strength === 2) return 'bg-yellow-400'
        if (strength === 3) return 'bg-blue-400'
        if (strength === 4) return 'bg-green-400'
      }
      return 'bg-gray-200'
    },
    async handleRegister() {
      this.isLoading = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Handle registration logic here
        console.log('Registration form submitted:', this.form)

        // Redirect to login or dashboard
        this.$router.push('/login')
      } catch (error) {
        console.error('Registration error:', error)
      } finally {
        this.isLoading = false
      }
    }
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

