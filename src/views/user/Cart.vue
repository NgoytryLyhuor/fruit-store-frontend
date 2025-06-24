<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-light text-gray-900">Shopping Cart</h1>
            <p class="text-gray-600 mt-1">{{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'items' }} in your cart</p>
          </div>
          <router-link to="/category" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="cartItems.length === 0" class="text-center py-16">
        <ShoppingCartIcon class="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 class="text-2xl font-light text-gray-900 mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-8">Add some fresh fruits to get started</p>
        <router-link
          to="/category"
          class="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 inline-block"
        >
          Shop Now
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center space-x-4">
              <!-- Product Image -->
              <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  :src="item.image_url"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                >
              </div>

              <!-- Product Details -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900 mb-1">{{ item.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ item.category }}</p>
                <p class="text-sm text-gray-500">{{ item.description }}</p>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center space-x-3">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <MinusIcon class="w-4 h-4 text-gray-600" />
                </button>

                <span class="w-12 text-center font-medium text-gray-900">{{ item.quantity }}</span>

                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  :disabled="item.quantity >= item.stock"
                  class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <PlusIcon class="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <!-- Price and Remove -->
              <div class="text-right">
                <div class="text-lg font-semibold text-gray-900 mb-2">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
                <div class="text-sm text-gray-500 mb-3">
                  ${{ item.price }} each
                </div>
                <button
                  @click="removeItem(item.id)"
                  class="text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  <TrashIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 class="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium text-gray-900">${{ subtotal.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium text-gray-900">
                  {{ subtotal >= 50 ? 'Free' : '$5.99' }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium text-gray-900">${{ tax.toFixed(2) }}</span>
              </div>

              <div class="border-t border-gray-200 pt-4">
                <div class="flex justify-between">
                  <span class="text-lg font-medium text-gray-900">Total</span>
                  <span class="text-lg font-bold text-gray-900">${{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Free Shipping Notice -->
            <div v-if="subtotal < 50" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div class="flex items-start space-x-3">
                <TruckIcon class="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p class="text-sm font-medium text-blue-900">Free shipping on orders over $50</p>
                  <p class="text-sm text-blue-700">Add ${{ (50 - subtotal).toFixed(2) }} more to qualify</p>
                </div>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="mb-6">
              <label for="promoCode" class="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              <div class="flex space-x-2">
                <input
                  id="promoCode"
                  v-model="promoCode"
                  type="text"
                  placeholder="Enter code"
                  class="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                >
                <button
                  @click="applyPromoCode"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Apply
                </button>
              </div>
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToCheckout"
              class="w-full bg-gray-900 text-white px-6 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 mb-4"
            >
              Proceed to Checkout
            </button>

            <!-- Continue Shopping -->
            <router-link
              to="/category"
              class="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-center block"
            >
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ShoppingCartIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon,
    TruckIcon
  } from '@heroicons/vue/24/outline'
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const promoCode = ref('')
  const cartItems = ref([])

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const shipping = computed(() => {
    return subtotal.value >= 50 ? 0 : 5.99
  })

  const tax = computed(() => {
    return (subtotal.value + shipping.value) * 0.08 // 8% tax
  })

  const total = computed(() => {
    return subtotal.value + shipping.value + tax.value
  })

  const loadCartItems = () => {
    // Load existing cart items from localStorage
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart)
      } catch (error) {
        console.error('Error loading cart items:', error)
        cartItems.value = []
      }
    }
  }

  const saveCartItems = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }

  const handleNewProduct = () => {
    // Check if there's a new product to add from query params
    const newProductData = route.query.addProduct
    if (newProductData) {
      try {
        const product = JSON.parse(newProductData)
        addToCart(product)

        // Remove the query parameter to clean up URL
        router.replace({ name: 'cart' })
      } catch (error) {
        console.error('Error parsing product data:', error)
      }
    }
  }

  const addToCart = (product) => {
    // Check if product already exists in cart
    const existingItem = cartItems.value.find(item => item.id === product.id)

    if (existingItem) {
      // Increase quantity if product already exists
      if (existingItem.quantity < existingItem.stock) {
        existingItem.quantity += 1
      }
    } else {
      // Add new product to cart
      cartItems.value.push({
        ...product,
        quantity: 1
      })
    }

    saveCartItems()
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    const item = cartItems.value.find(item => item.id === itemId)

    if (item && newQuantity <= item.stock) {
      item.quantity = newQuantity
      saveCartItems()
    }
  }

  const removeItem = (itemId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== itemId)
    saveCartItems()
  }

  const applyPromoCode = () => {
    // Handle promo code logic here
    console.log('Applying promo code:', promoCode.value)
  }

  const proceedToCheckout = () => {
    // Handle checkout logic here
    router.push('/checkout')
  }

  onMounted(() => {
    loadCartItems()
    handleNewProduct()
  })
</script>

<style scoped>
/* Custom styles for better visual hierarchy */
.sticky {
  position: sticky;
}
</style>

