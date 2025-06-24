<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-light text-gray-900">Checkout</h1>
            <p class="text-gray-600 mt-1">Complete your order</p>
          </div>
          <router-link to="/cart" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Back to Cart
          </router-link>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Delivery Address Form -->
        <div class="space-y-8">
          <!-- Delivery Address -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-medium text-gray-900 mb-6">Delivery Address</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  v-model="user.first_name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 text-gray-600"
                  required
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  v-model="user.last_name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 text-gray-600"
                  required
                >
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  v-model="user.city"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 text-gray-600"
                  required
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                  v-model="user.postal_code"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 text-gray-600"
                  required
                >
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                v-model="user.street"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 text-gray-600"
                required
              >
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
              <textarea
                v-model="user.notes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 text-gray-600"
                placeholder="Any special delivery instructions..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div>
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 class="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center space-x-3 py-3 border-b border-gray-100 last:border-b-0"
              >
                <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    :src="item.image_url"
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  >
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900">{{ item.name }}</h4>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-gray-900">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="border-t border-gray-200 pt-4 mb-6">
              <div class="flex justify-between">
                <span class="text-lg font-medium text-gray-900">Total Amount</span>
                <span class="text-lg font-bold text-gray-900">${{ totalAmount.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="placeOrder"
              :disabled="!isFormValid || isProcessing"
              class="w-full bg-gray-900 text-white px-6 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 mb-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="isProcessing">Processing Order...</span>
              <span v-else>Place Order</span>
            </button>

            <!-- Security Notice -->
            <div class="flex items-center justify-center text-sm text-gray-500">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Secure ordering system
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Order Placed Successfully!</h3>
          <p class="text-sm text-gray-500 mb-4">Your order has been confirmed and will be delivered soon.</p>
          <button
            @click="closeModal"
            class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
    <Snackbar ref="snackbar" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import Snackbar from '@/components/Snackbar.vue'

const { user } = useAuth()
const router = useRouter()
const cartItems = ref([])
const isProcessing = ref(false)
const showSuccessModal = ref(false)
const snackbar = ref(null)


// Computed values
const totalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const isFormValid = computed(() => {
  const addr = user.value
  return addr.first_name && addr.last_name && addr.street && addr.city && addr.postal_code
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

const placeOrder = async () => {
  if (!isFormValid.value) return

  isProcessing.value = true

  try {
    const orderData = {
      items: cartItems.value.map(item => ({
        fruit_id: item.id,
        quantity: item.quantity
      })),
      delivery_address: user.value
    }

    // Add this to see what you're sending
    console.log('Sending order data:', orderData)
    console.log('User data:', user.value)
    console.log('Cart items:', cartItems.value)

    const response = await api.post('/orders', orderData)

    if(response.data.status){
      snackbar.value.showSnackbar('Order placed successfully!')
      localStorage.removeItem('cartItems')
      cartItems.value = []
      showSuccessModal.value = true
    }

  } catch (error) {
    console.error('Error placing order:', error)
    // Log the full error response
    if (error.response) {
      console.error('Error response:', error.response.data)
      console.error('Error status:', error.response.status)
    }
    snackbar.value.showSnackbar('Failed to place order. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const closeModal = () => {
  showSuccessModal.value = false
  router.push('/') // Redirect to home or products page
}

onMounted(() => {
  loadCartItems()
})
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
