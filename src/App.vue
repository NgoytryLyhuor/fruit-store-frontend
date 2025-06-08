<!-- App.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
    <NavBar />
    <router-view />

  </div>
</template>

<script>
import NavBar from './components/common/Navbar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
