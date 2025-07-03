<template>
  <div class="bg-gradient-to-b from-gray-50 to-white">
    <!-- Main 404 Section -->
    <section class="relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center">
          <!-- 404 Number with elegant styling -->
          <div class="mb-8">
            <h1 class="text-8xl lg:text-9xl font-light text-gray-200 mb-4 tracking-tight select-none">
              404
            </h1>
            <div class="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
          </div>

          <!-- Main heading -->
          <h2 class="text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Page Not Found
          </h2>

          <!-- Description -->
          <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off like a ripe fruit rolling away from the basket.
          </p>

          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button
              @click="goBack"
              class="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              Go Back
            </button>

            <router-link
              to="/"
              class="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Return Home
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  ShoppingBagIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()

const goBack = () => {
  // Check if there's history to go back to
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    // If no history, go to home
    router.push('/')
  }
}
</script>
