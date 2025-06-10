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
        <h2 class="text-3xl font-light text-gray-900 mb-2">Reset your password</h2>
        <p class="text-gray-600">Enter your email address and we'll send you a link to reset your password</p>
      </div>

      <!-- Reset Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form v-if="!emailSent" class="space-y-6" @submit.prevent="handleResetRequest">
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
              placeholder="Enter your email address"
            >
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="!isLoading">Send reset link</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
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
            <h3 class="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
            <p class="text-gray-600 mb-4">
              We've sent a password reset link to <strong>{{ form.email }}</strong>
            </p>
            <p class="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or
              <button @click="resendEmail" class="text-gray-900 hover:text-gray-700 underline">
                click here to resend
              </button>
            </p>
          </div>

          <button
            @click="emailSent = false"
            class="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
          >
            Try different email
          </button>
        </div>
      </div>

      <!-- Back to login -->
      <div class="text-center">
        <router-link to="/login" class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Back to sign in
        </router-link>
      </div>

      <!-- Help Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Need help?</h3>
        <div class="space-y-3 text-sm">
          <div class="flex items-start space-x-3">
            <QuestionMarkCircleIcon class="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p class="text-gray-700 font-medium">Can't access your email?</p>
              <p class="text-gray-600">Contact our support team at support@pureflave.com</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <ClockIcon class="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p class="text-gray-700 font-medium">Reset link expired?</p>
              <p class="text-gray-600">Reset links are valid for 24 hours. Request a new one above.</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <ShieldCheckIcon class="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p class="text-gray-700 font-medium">Account security</p>
              <p class="text-gray-600">We take your security seriously. Reset links are single-use only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CheckIcon,
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'ForgotPassword',
  components: {
    CheckIcon,
    ArrowLeftIcon,
    QuestionMarkCircleIcon,
    ClockIcon,
    ShieldCheckIcon
  },
  data() {
    return {
      form: {
        email: ''
      },
      isLoading: false,
      emailSent: false
    }
  },
  methods: {
    async handleResetRequest() {
      this.isLoading = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Handle password reset request logic here
        console.log('Password reset requested for:', this.form.email)

        this.emailSent = true
      } catch (error) {
        console.error('Password reset error:', error)
      } finally {
        this.isLoading = false
      }
    },

    async resendEmail() {
      this.isLoading = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log('Resending email to:', this.form.email)

        // Show success message or notification
      } catch (error) {
        console.error('Resend email error:', error)
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

