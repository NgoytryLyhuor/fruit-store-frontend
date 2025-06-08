<template>
  <nav class="bg-white/95 backdrop-blur-md py-4 px-6 border-b border-gray-100/50 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Left side - Brand -->
      <div class="flex items-center space-x-12">
        <router-link to="/" class="group flex items-center space-x-2">
          <span class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Pure Flave
          </span>
        </router-link>

        <!-- Navigation links -->
        <div class="hidden lg:flex space-x-8">
          <router-link to="/" class="nav-link text-gray-600 group">
            <span class="relative">
              Home
              <span class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>
          </router-link>

          <router-link to="/category" class="nav-link text-gray-600 group">
            <span class="relative">
              Category
              <span class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>
          </router-link>

          <router-link to="/about" class="nav-link text-gray-600 group">
            <span class="relative">
              About Us
              <span class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>
          </router-link>

          <router-link to="/contact" class="nav-link text-gray-600 group">
            <span class="relative">
              Contact
              <span class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </span>
          </router-link>
        </div>
      </div>

      <!-- Right side - Search & Auth -->
      <div class="flex items-center space-x-4">
        <!-- Search button -->
        <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 hidden md:block">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>

        <!-- Cart button -->
        <button class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 hidden sm:block">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7"/>
          </svg>
          <span class="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">3</span>
        </button>

        <div class="h-6 w-px bg-gray-200 hidden sm:block"></div>

        <router-link to="/login" class="text-gray-600 hover:text-gray-900 hidden sm:block font-medium transition-colors duration-200">
          Log In
        </router-link>

        <router-link to="/signup" class="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-orange-500 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Sign Up
        </router-link>

        <!-- Mobile menu button -->
        <button class="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.nav-link text-gray-600 {
  @apply text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium py-2;
}

.dropdown-item {
  @apply flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:text-gray-900 transition-all duration-200 mx-2 rounded-lg;
}

/* Custom backdrop blur for better browser support */
@supports not (backdrop-filter: blur(12px)) {
  nav {
    background-color: rgba(255, 255, 255, 0.98);
  }

  .dropdown-item {
    background-color: rgba(255, 255, 255, 0.98);
  }
}
</style>
