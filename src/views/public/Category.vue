<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-light text-gray-900 mb-4">All Products</h1>
          <p class="text-lg text-gray-600">Discover our complete collection of fresh fruits</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters and Search -->
      <div class="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <!-- Search Bar -->
          <div class="relative flex-1 max-w-md">
            <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input v-model="searchQuery" type="text" placeholder="Search fruits..."
              class="w-full text-gray-900 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 bg-white">
          </div>

          <!-- Category Filter -->
          <div class="flex gap-4 items-center">
            <select v-model="selectedCategory" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none bg-white text-gray-700">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>

            <!-- Sort Options -->
            <select v-model="sortBy"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none bg-white text-gray-700">
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Stock Level</option>
            </select>

            <!-- View Toggle -->
            <div class="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
              <button @click="viewMode = 'grid'"
                :class="viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
                class="px-3 py-2 transition-colors duration-200">
                <Squares2X2Icon class="w-5 h-5" />
              </button>
              <button @click="viewMode = 'list'"
                :class="viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
                class="px-3 py-2 transition-colors duration-200">
                <ListBulletIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="selectedCategory || searchQuery" class="mt-4 flex flex-wrap gap-2">
          <span v-if="searchQuery"
            class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            Search: "{{ searchQuery }}"
            <button @click="searchQuery = ''" class="hover:text-gray-600">
              <XMarkIcon class="w-4 h-4" />
            </button>
          </span>
          <span v-if="selectedCategory"
            class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            Category: {{ selectedCategory }}
            <button @click="selectedCategory = ''" class="hover:text-gray-600">
              <XMarkIcon class="w-4 h-4" />
            </button>
          </span>
        </div>
      </div>

      <!-- Results Info -->
      <div class="mb-6 flex justify-between items-center">
        <p class="text-gray-600">
          Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} products
        </p>
        <div class="text-sm text-gray-500">
          Page {{ pagination.current_page }} of {{ pagination.last_page }}
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>

      <!-- Products Grid/List -->
      <template v-else>
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="product in pagination.data" :key="product.id" class="group cursor-pointer">
            <!-- Fixed height card with flex layout -->
            <div
              class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300 h-[400px] flex flex-col">

              <!-- Image section - fixed height -->
              <div class="relative overflow-hidden flex-shrink-0">
                <img :src="product.image_url" :alt="product.name"
                  class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-4 left-4">
                  <span
                    class="bg-white bg-opacity-95 text-gray-700 px-2 py-1 rounded-full text-xs font-medium border border-gray-200">
                    {{ product.category }}
                  </span>
                </div>
              </div>

              <!-- Content section - grows to fill remaining space -->
              <div class="p-6 flex flex-col flex-grow">
                <!-- Product name - fixed space -->
                <h3 class="text-lg font-semibold text-gray-900 mb-2 h-6 line-clamp-1">
                  {{ product.name }}
                </h3>

                <!-- Description - takes available space but limited -->
                <p class="text-gray-600 text-sm mb-4 flex-grow line-clamp-3 overflow-hidden">
                  {{ product.description }}
                </p>

                <!-- Price and button section - always at bottom -->
                <div class="flex justify-between items-center mt-auto">
                  <span class="text-2xl font-bold text-gray-900">
                    ${{ product.price }}
                  </span>

                  <!-- Add to cart button with count badge -->
                  <div class="relative">
                    <button @click="handleAddToCart(product)"
                      class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>

                    <!-- Cart count badge - only show if count > 0 -->
                    <span v-if="getCartCount(product.id) > 0"
                      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {{ getCartCount(product.id) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div v-for="product in pagination.data" :key="product.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 overflow-hidden">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-64 h-48 md:h-auto">
                <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover">
              </div>
              <div class="flex-1 p-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <h3 class="text-xl font-semibold text-gray-900">{{ product.name }}</h3>
                      <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">{{ product.category
                      }}</span>
                    </div>
                    <p class="text-gray-600 mb-4">{{ product.description }}</p>
                  </div>
                  <div class="text-right">
                    <div class="text-3xl font-bold text-gray-900 mb-2">${{ product.price }}</div>
                    <span
                      :class="product.stock > 0 ? 'text-gray-700 bg-gray-100 border border-gray-200' : 'text-gray-500 bg-gray-50 border border-gray-200'"
                      class="px-3 py-1 rounded-full text-sm font-medium">
                      {{ product.stock > 0 ? `${product.stock} available` : 'Out of Stock' }}
                    </span>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-4">
                    <button class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <HeartIcon class="w-5 h-5" />
                    </button>
                    <button class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                      <ShareIcon class="w-5 h-5" />
                    </button>
                  </div>
                  <div class="relative">
                    <button @click="handleAddToCart(product)"
                      class="bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>

                    <!-- Cart count badge - only show if count > 0 -->
                    <span v-if="getCartCount(product.id) > 0"
                      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {{ getCartCount(product.id) }}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Pagination -->
      <div class="mt-12 flex justify-center">
        <div class="flex items-center space-x-2">
          <button @click="prevPage" :disabled="pagination.current_page === 1"
            class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white">
            <ChevronLeftIcon class="w-5 h-5" />
          </button>

          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
            :class="page === pagination.current_page ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'"
            class="px-4 py-2 rounded-lg border cursor-pointer transition-colors duration-200">
            {{ page }}
          </button>

          <button @click="nextPage" :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white">
            <ChevronRightIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    <StockModal
      ref="stockModal"
      :product-name="selectedProductName"
      @close="handleModalClose"
    />
  </div>
</template>

<script setup>
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  XMarkIcon,
  HeartIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { ref, reactive, computed, watch, onMounted } from 'vue'
import api from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import StockModal from '@/components/StockModal.vue'

const { isAuthenticated } = useAuth()
const stockModal = ref(null)
const selectedProductName = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')
const viewMode = ref('grid')
const loading = ref(false)
const cartCount = ref({})
const pagination = reactive({
  current_page: 1,
  data: [],
  first_page_url: '',
  from: 1,
  last_page: 1,
  last_page_url: '',
  links: [],
  next_page_url: null,
  path: '',
  per_page: 8,
  prev_page_url: null,
  to: 8,
  total: 0
})

const categories = ref([])

const visiblePages = computed(() => {
  const pages = []
  const current = pagination.current_page
  const last = pagination.last_page
  const delta = 2

  let left = current - delta
  let right = current + delta + 1

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      pages.push(i)
    }
  }

  return pages
})

watch(searchQuery, () => {
  debouncedFetchProducts()
})

watch(selectedCategory, () => {
  debouncedFetchProducts()
})

watch(sortBy, () => {
  debouncedFetchProducts()
})

function debounce(func, wait) {
  let timeout

  return function (...args) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

const debouncedFetchProducts = debounce(fetchProducts, 500)

const getCartCount = (productId) => {
  return cartCount.value[productId] || 0
}

const handleAddToCart = (product) => {
  if(!isAuthenticated.value){
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

const findCartItemIndex = (cartItems, productId) => {
  return cartItems.findIndex(item => item.id === productId)
}

const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
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

async function fetchCategories() {
  try{
    const response = await api.get('/fruits/categories')
    categories.value = response.data
  }catch{
    console.error('Error fetching products:', error)
  }
}

async function fetchProducts() {
  loading.value = true

  try {
    const params = {
      page: pagination.current_page,
      search: searchQuery.value,
      category: selectedCategory.value ? selectedCategory.value : null,
      sortBy: sortBy.value
    }

    const response = await api.get('/fruits', { params })
    Object.assign(pagination, response.data)

  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

function nextPage() {
  if (pagination.current_page < pagination.last_page) {
    pagination.current_page++
    fetchProducts()
  }
}

function prevPage() {
  if (pagination.current_page > 1) {
    pagination.current_page--
    fetchProducts()
  }
}

function goToPage(page) {
  if (page === pagination.current_page) return

  pagination.current_page = page
  fetchProducts()
}

onMounted(async () => {
  fetchProducts()
  updateCartCounts()
  fetchCategories()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
