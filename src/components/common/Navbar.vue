<template>
  <nav class="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <span class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Pure Flave
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link
              to="/"
              class="nav-link text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link
              to="/category"
              class="nav-link text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'category' }"
            >
              Category
            </router-link>
            <router-link
              to="/about"
              class="nav-link text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'about' }"
            >
              About
            </router-link>
            <router-link
              to="/contact"
              class="nav-link text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'contact' }"
            >
              Contact
            </router-link>
          </div>
        </div>

        <!-- Desktop User Menu -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Cart Icon (for authenticated users) -->
          <router-link
            v-if="isAuthenticated"
            to="/cart"
            class="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <!-- Cart Badge (optional) -->
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </router-link>

          <!-- Guest Navigation -->
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Sign In
            </router-link>
            <router-link
              to="/register"
              class="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </router-link>
          </template>

          <!-- Authenticated User Menu -->
          <div v-else class="relative" ref="userMenuRef">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-gray-600 font-medium text-sm">
                  {{ userInitial }}
                </span>
              </div>
              <span class="hidden lg:block">{{ userName }}</span>
              <svg class="w-4 h-4" :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-show="showUserMenu" class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                <div class="px-4 py-3 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                  <p class="text-sm text-gray-500">{{ user?.email }}</p>
                </div>

                <router-link
                  v-if="isCustomer"
                  to="/profile"
                  @click="closeUserMenu"
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </router-link>

                <router-link
                  v-if="isAdmin"
                  to="/admin/dashboard"
                  @click="closeUserMenu"
                  class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Dashboard
                </router-link>

                <div class="border-t border-gray-100 mt-2 pt-2">
                  <button
                    @click="handleLogout"
                    class="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg class="w-6 h-6" :class="{ 'hidden': showMobileMenu, 'block': !showMobileMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="w-6 h-6" :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-show="showMobileMenu" class="md:hidden bg-white border-t border-gray-100">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              to="/"
              @click="closeMobileMenu"
              class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'home' }"
            >
              Home
            </router-link>
            <router-link
              to="/category"
              @click="closeMobileMenu"
              class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'category' }"
            >
              Category
            </router-link>
            <router-link
              to="/about"
              @click="closeMobileMenu"
              class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'about' }"
            >
              About
            </router-link>
            <router-link
              to="/contact"
              @click="closeMobileMenu"
              class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
              :class="{ 'bg-gray-100 text-gray-900': $route.name === 'contact' }"
            >
              Contact
            </router-link>

            <!-- Cart for mobile (authenticated users) -->
            <router-link
              v-if="isAuthenticated"
              to="/cart"
              @click="closeMobileMenu"
              class="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4M7 13l-1.5 4m0 0h3.5m3.5-4v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8-4a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v0z" />
              </svg>
              Cart
            </router-link>
          </div>

          <!-- Mobile User Section -->
          <div class="pt-4 pb-3 border-t border-gray-100">
            <template v-if="!isAuthenticated">
              <div class="px-2 space-y-1">
                <router-link
                  to="/login"
                  @click="closeMobileMenu"
                  class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                >
                  Sign In
                </router-link>
                <router-link
                  to="/register"
                  @click="closeMobileMenu"
                  class="block px-3 py-2 rounded-lg text-base font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign Up
                </router-link>
              </div>
            </template>

            <template v-else>
              <div class="px-3 py-3">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span class="text-gray-600 font-medium">
                      {{ userInitial }}
                    </span>
                  </div>
                  <div>
                    <p class="text-base font-medium text-gray-900">{{ userName }}</p>
                    <p class="text-sm text-gray-500">{{ user?.email }}</p>
                  </div>
                </div>
              </div>
              <div class="px-2 space-y-1">
                <router-link
                  to="/profile"
                  @click="closeMobileMenu"
                  class="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </router-link>

                <router-link
                  v-if="isAdmin"
                  to="/admin/dashboard"
                  @click="closeMobileMenu"
                  class="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Dashboard
                </router-link>

                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user, isAuthenticated, isAdmin, userName, logout ,isCustomer } = useAuth()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const userMenuRef = ref(null)

// Computed properties
const userInitial = computed(() => {
  if (userName.value) {
    return userName.value.charAt(0).toUpperCase()
  }
  return 'U'
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const handleLogout = () => {
  logout()
  closeUserMenu()
  closeMobileMenu()
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    closeUserMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.nav-link.router-link-active {
  @apply bg-gray-100 text-gray-900;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
}

/* Custom scrollbar for dropdown if needed */
.dropdown-menu {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.dropdown-menu::-webkit-scrollbar {
  width: 4px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: transparent;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}
</style>
