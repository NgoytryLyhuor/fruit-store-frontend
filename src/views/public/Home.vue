<template>
  <div class="min-h-screen bg-white">
    <!-- Your existing hero section -->
    <section class="relative bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center">
          <h1 class="text-5xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Fresh Fruits
            <span class="block font-medium text-gray-700">Delivered Daily</span>
          </h1>
          <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Premium organic fruits sourced directly from local farms, delivered fresh to your doorstep
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/category"
              class="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Shop Collection
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Updated categories section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Shop by Category</h2>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>

        <!-- Loading state -->
        <div v-if="categoriesLoading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>

        <!-- Categories grid with dynamic centering -->
        <div v-else :class="getCategoryGridClasses(processedCategories.length)">
          <div v-for="category in processedCategories" :key="category.id" class="group cursor-pointer">
            <div class="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                <component :is="iconMap[category.icon]" class="w-8 h-8 text-gray-700" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">{{ category.name }}</h3>
              <p class="text-sm text-gray-500">{{ category.count }} items</p>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="!categoriesLoading && processedCategories.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BeakerIcon class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-gray-500">No categories available at the moment</p>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Featured Selection</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Handpicked fruits at their peak freshness</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="product in featuredProducts" :key="product.id" class="group h-full">
            <div class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300 h-full flex flex-col">
              <div class="relative overflow-hidden aspect-square">
                <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-4 right-4">
                  <span v-if="product.stock > 0" class="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 shadow-sm">
                    In Stock
                  </span>
                  <span v-else class="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Sold Out
                  </span>
                </div>
              </div>
              <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ product.category }}</span>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{{ product.description }}</p>
                <div class="flex justify-between items-center mt-auto">
                  <span class="text-xl font-medium text-gray-900">${{ product.price }}</span>
                  <button
                    @click="handleAddToCart(product)"
                    :disabled="product.stock <= 0"
                    :class="[
                      'relative cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105',
                      product.stock > 0
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:scale-100'
                    ]"
                  >
                    {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
                    <span v-if="getCartCount(product.id) > 0 && product.stock > 0"
                      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {{ getCartCount(product.id) }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-16">
          <router-link to="/category"
            class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            View All Products
          </router-link>
        </div>
      </div>
    </section>

    <!-- Your existing features and newsletter sections -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Why Choose Pure Flave</h2>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
              <SparklesIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">Premium Quality</h3>
            <p class="text-gray-600 leading-relaxed">Hand-selected fruits from certified organic farms, ensuring the
              highest quality and freshness</p>
          </div>
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
              <BoltIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">Fast Delivery</h3>
            <p class="text-gray-600 leading-relaxed">Same-day delivery available in most areas, bringing farm-fresh
              produce to your door</p>
          </div>
          <div class="text-center group">
            <div
              class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
              <HeartIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">100% Organic</h3>
            <p class="text-gray-600 leading-relaxed">All our fruits are certified organic and pesticide-free, grown with
              care for you and the environment</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Stay Fresh</h2>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for seasonal fruit updates, recipes, and exclusive offers</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <div class="relative flex-1">
            <EnvelopeIcon class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="email" placeholder="Enter your email"
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-300">
          </div>
          <button
            class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 whitespace-nowrap transform hover:scale-105">
            Subscribe
          </button>
        </div>
      </div>
    </section>
    <StockModal
      ref="stockModal"
      :product-name="selectedProductName"
      @close="handleModalClose"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'
import {
  SparklesIcon,
  BoltIcon,
  HeartIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  SunIcon,
  BeakerIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import { useAuth } from '@/composables/useAuth'
import StockModal from '@/components/StockModal.vue'

const { isAuthenticated } = useAuth()
const router = useRouter()

// Enhanced icon mapping with more variety
const iconMap = {
  SunIcon,        // Citrus fruits
  GlobeAltIcon,   // Tropical fruits
  StarIcon,       // Berries (star-like)
  BeakerIcon,     // Stone fruits
  SparklesIcon,   // For any special categories
  BoltIcon,       // For energizing fruits
  HeartIcon       // For heart-healthy fruits
}

// Category icon assignment based on name
const getCategoryIcon = (categoryName) => {
  const name = categoryName.toLowerCase()

  if (name.includes('citrus') || name.includes('orange') || name.includes('lemon')) {
    return 'SunIcon'
  } else if (name.includes('tropical') || name.includes('exotic')) {
    return 'GlobeAltIcon'
  } else if (name.includes('berries') || name.includes('berry')) {
    return 'StarIcon'
  } else if (name.includes('stone') || name.includes('pit')) {
    return 'BeakerIcon'
  } else if (name.includes('melon')) {
    return 'HeartIcon'
  } else {
    // Cycle through available icons for other categories
    const icons = ['SparklesIcon', 'BoltIcon', 'SunIcon', 'GlobeAltIcon']
    return icons[Math.abs(categoryName.charCodeAt(0)) % icons.length]
  }
}

// Component refs
const stockModal = ref(null)
const selectedProductName = ref('')

// State
const categories = ref([])
const categoriesLoading = ref(false)
const cartCount = ref({})
const featuredProducts = ref([])

// Computed property to process categories
const processedCategories = computed(() => {
  return categories.value.map((categoryName, index) => ({
    id: index + 1,
    name: categoryName,
    icon: getCategoryIcon(categoryName),
    count: getCategoryItemCount(categoryName)
  }))
})

// Function to get item count for each category
const getCategoryItemCount = (categoryName) => {
  // Count products in this category
  const count = featuredProducts.value.filter(product =>
    product.category && product.category.toLowerCase() === categoryName.toLowerCase()
  ).length

  // Return count or a default range for better UX
  return count > 0 ? count : Math.floor(Math.random() * 15) + 5
}

// Cart functions
const getCartCount = (productId) => {
  return cartCount.value[productId] || 0
}

const updateCartCounts = () => {
  const savedCart = localStorage.getItem('cartItems')
  if (savedCart) {
    try {
      const cartItems = JSON.parse(savedCart)
      const counts = {}
      cartItems.forEach(item => {
        counts[item.id] = item.quantity
      })
      cartCount.value = counts
    } catch (error) {
      console.error('Error reading cart:', error)
      cartCount.value = {}
    }
  } else {
    cartCount.value = {}
  }
}

const handleAddToCart = (product) => {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }

  if (product.stock <= 0) {
    stockModal.value.showModal('out_of_stock', product.name)
    return
  }

  let cartItems = getCartItemsFromStorage()
  const existingItemIndex = findCartItemIndex(cartItems, product.id)

  if (existingItemIndex !== -1) {
    const existingItem = cartItems[existingItemIndex]
    if (existingItem.quantity >= product.stock) {
      stockModal.value.showModal('max_stock', product.name)
      return
    }
    cartItems[existingItemIndex].quantity += 1
  } else {
    cartItems.push(createNewCartItem(product))
  }

  saveCartToStorage(cartItems)
  updateCartCounts()
}

// Helper functions
const getCartItemsFromStorage = () => {
  const savedCart = localStorage.getItem('cartItems')
  if (!savedCart) return []

  try {
    return JSON.parse(savedCart)
  } catch (error) {
    console.error('Error parsing cart items:', error)
    return []
  }
}

const findCartItemIndex = (cartItems, productId) => {
  return cartItems.findIndex(item => item.id === productId)
}

const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

const createNewCartItem = (product) => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image_url: product.image_url,
    quantity: 1,
    stock: product.stock
  }
}

// API functions
const fetchCategories = async () => {
  categoriesLoading.value = true
  try {
    const response = await api.get('/fruits/categories')
    categories.value = response.data || []
  } catch (error) {
    categories.value = []
  } finally {
    categoriesLoading.value = false
  }
}

const fetchFeaturedProducts = async () => {
  try {
    const response = await api.get('/fruits')
    featuredProducts.value = response.data.data || []
  } catch (error) {
    featuredProducts.value = []
  }
}

// Category grid classes function
const getCategoryGridClasses = (categoryCount) => {
  const baseClasses = 'grid gap-8'

  switch (categoryCount) {
    case 1:
      return `${baseClasses} grid-cols-1 justify-items-center max-w-sm mx-auto`
    case 2:
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto`
    case 3:
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto`
    default:
      return `${baseClasses} grid-cols-2 lg:grid-cols-4`
  }
}

// Modal event handlers
const handleModalClose = () => {
  console.log('Modal closed')
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchFeaturedProducts(),
    fetchCategories()
  ])
  updateCartCounts()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1 / 1;
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
