<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
    <!-- Cleaner loading screen -->
    <div v-if="isCheckingAuth"
      class="min-h-screen flex items-center justify-center bg-white transition-colors duration-300">
      <div class="flex flex-col items-center space-y-4">
        <!-- Smooth animated spinner -->
        <div class="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>

    <!-- Main app content -->
    <template v-else>
      <NavBar />
      <router-view />
    </template>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/common/Navbar.vue'
import { useAuth } from '@/composables/useAuth'

const { checkAuth } = useAuth()
const isCheckingAuth = ref(true)

onMounted(async () => {
  // Check if user is still authenticated when app loads
  try {
    await checkAuth()
  } catch (error) {
    console.error('Auth check failed:', error)
  } finally {
    // Hide loading screen regardless of auth check result
    isCheckingAuth.value = false
  }
})
</script>
