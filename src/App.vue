<!-- App.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/common/Navbar.vue'
import { useAuth } from '@/composables/useAuth'

const { checkAuth } = useAuth()

onMounted(async () => {
  // Check if user is still authenticated when app loads
  await checkAuth()
})
</script>
