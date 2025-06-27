<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-light text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-600 mt-1">Manage products, orders, and users</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <nav class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <ul class="space-y-1">
              <li v-for="tab in tabs" :key="tab.id">
                <button @click="activeTab = tab.id" :class="[
                  'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3',
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900 shadow-inner'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                ]">
                  <component :is="tab.icon" :class="[
                    'w-5 h-5 transition-colors duration-200',
                    activeTab === tab.id ? 'text-gray-700' : 'text-gray-400'
                  ]" />
                  <span class="font-medium">{{ tab.name }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Product Management -->
          <div v-if="activeTab === 'products'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-light text-gray-900">Product Management</h2>
              <button @click="openProductModal('add')"
                class="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                Add New Product
              </button>
            </div>

            <!-- Product List -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="fruit in fruits" :key="fruit.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full object-cover" :src="fruit.image_url" :alt="fruit.name">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ fruit.name }}</div>
                          <div class="text-sm text-gray-500">{{ fruit.description.substring(0, 30) }}...</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ fruit.category }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${{ fruit.price }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="fruit.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ fruit.stock > 0 ? fruit.stock + ' In Stock' : 'Out of Stock' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="openProductModal('edit', fruit)" class="text-gray-600 hover:text-gray-900 mr-3">
                        <PencilIcon class="w-5 h-5" />
                      </button>
                      <button @click="deleteProduct(fruit.id)" class="text-red-600 hover:text-red-900">
                        <TrashIcon class="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="flex items-center justify-center gap-4 my-8">
                <!-- Previous Button -->
                <button @click="fetchFruits(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1"
                  class="px-4 py-2 rounded-md border text-gray-400"
                  :class="pagination.currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'">
                  Previous
                </button>

                <!-- Page Numbers -->
                <div class="flex gap-1">
                  <button v-for="page in pagination.totalPages" :key="page" @click="fetchFruits(page)"
                    class="w-10 h-10 rounded-md border"
                    :class="pagination.currentPage === page ? 'bg-blue-500' : 'hover:bg-gray-100 text-gray-400'">
                    {{ page }}
                  </button>
                </div>

                <!-- Next Button -->
                <button @click="fetchFruits(pagination.currentPage + 1)"
                  :disabled="pagination.currentPage === pagination.totalPages"
                  class="px-4 text-gray-400 py-2 rounded-md border"
                  :class="pagination.currentPage === pagination.totalPages ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-100'">
                  Next
                </button>
              </div>

            </div>
          </div>

          <!-- Order Management -->
          <div v-if="activeTab === 'orders'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 class="text-2xl font-light text-gray-900 mb-8">Order Management</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in allOrders" :key="order.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ order.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.delivery_address.first_name }} {{ order.delivery_address.last_name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ new Date(order.updated_at).toLocaleString() }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ order.total_amount }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <select
                        :class="getStatusColor(order.status)"
                        v-model="order.status"
                        @change="updateOrderStatus(order)"
                        class="px-2 text-gray-700"
                        :disabled="order.status === 'cancelled' || order.status === 'delivered'"
                      >
                        <!-- Always show current status -->
                        <option :value="order.status" selected>{{ order.status }}</option>

                        <!-- Additional available options -->
                        <template v-for="option in getAvailableStatusOptions(order.status)" :key="option.value">
                          <option
                            v-if="option.value !== order.status"
                            :value="option.value"
                          >
                            {{ option.label }}
                          </option>
                        </template>
                      </select>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="viewOrderDetails(order)" class="text-gray-600 hover:text-gray-900 mr-3">
                        <EyeIcon class="w-5 h-5" />
                      </button>
                      <!-- <button @click="deleteOrder(order.id)" class="text-red-600 hover:text-red-900">
                        <TrashIcon class="w-5 h-5" />
                      </button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- User Management -->
          <div v-if="activeTab === 'users'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 class="text-2xl font-light text-gray-900 mb-8">User Management</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in allUsers" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.first_name }} {{ user.last_name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <div v-if="isProductModalOpen" class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50" @click="isProductModalOpen = false">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 p-8" @click.stop>
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          {{ modalMode === 'add' ? 'Add New Product' : 'Edit Product' }}
        </h2>

        <form @submit.prevent="saveProduct" class="grid grid-cols-1 md:grid-cols-3 gap-6">

          <!-- Product Name -->
          <div>
            <label for="productName" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" id="productName" v-model="currentProduct.name"
              class="w-full text-gray-700 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              required />
          </div>

          <!-- Category Dropdown -->
          <div>
            <label for="productCategory" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select id="productCategory" v-model="currentProduct.category"
              class="w-full text-gray-700 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              required>
              <option value="" disabled>Select a category</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Price -->
          <div>
            <label for="productPrice" class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input type="number" id="productPrice" v-model.number="currentProduct.price" step="0.01"
              class="w-full text-gray-700 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              required />
          </div>

          <!-- Stock -->
          <div>
            <label for="productStock" class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input type="number" id="productStock" v-model.number="currentProduct.stock"
              class="w-full text-gray-700 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              required />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label for="productDescription" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="productDescription"
              v-model="currentProduct.description"
              rows="1"
              class="w-full text-gray-700 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 resize-none"
            >
            </textarea>
          </div>

          <!-- Image Upload with Preview -->
          <div >
            <label class="block text-sm font-medium text-gray-700 mb-1">Product Image</label>

            <!-- Upload Area -->
            <div @click="triggerFileInput" class="border-2 border-dashed border-gray-300 rounded-lg p-4 py-12 text-center cursor-pointer hover:bg-gray-50 transition" >
              <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                class="hidden"
              >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="mt-2 text-sm text-gray-600">Click to upload an image</p>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>

          <!-- Image Preview -->
          <div v-if="currentProduct.image_url" class="mt-6">
            <img
              :src="currentProduct.image_url"
              alt="Product preview"
              class="h-[184px] w-[184px] object-cover rounded-lg border border-gray-200"
            >
          </div>

          <!-- Buttons -->
          <div class="md:col-span-3 flex justify-end gap-4 mt-4">
            <button type="button" @click="isProductModalOpen = false"
              class="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Cancel
            </button>
            <button type="submit"
              class="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition transform hover:scale-[1.02]">
              {{ modalMode === 'add' ? 'Add Product' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>


    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="isDeleteModalOpen = false">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100" @click.stop>
        <!-- Modal Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center">
            <!-- Warning Icon -->
            <div class="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z">
                </path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <p class="text-sm text-gray-500 mt-1">This action cannot be undone</p>
            </div>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-gray-700 mb-4">
            Are you sure you want to delete <strong>{{ productToDelete?.name }}</strong>?
          </p>

          <!-- Product Info Card -->
          <div v-if="productToDelete" class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex items-center">
              <img
                :src="productToDelete.image_url"
                :alt="productToDelete.name"
                class="w-12 h-12 rounded-lg object-cover mr-3"
              >
              <div>
                <div class="font-medium text-gray-900">{{ productToDelete.name }}</div>
                <div class="text-sm text-gray-500">{{ productToDelete.category }} • ${{ productToDelete.price }}</div>
                <div class="text-xs text-gray-400">Stock: {{ productToDelete.stock }}</div>
              </div>
            </div>
          </div>

          <!-- Warning Text -->
          <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-red-700">
                This will permanently remove the product from your inventory and cannot be recovered.
              </p>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
          <button
            @click="isDeleteModalOpen = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors transform hover:scale-105"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>


    <!-- Order Details Modal -->
    <div v-if="isOrderDetailsOpen && orderDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="isOrderDetailsOpen = false">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 p-8" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-gray-800">Order Details</h2>
          <button @click="isOrderDetailsOpen = false" class="text-gray-500 hover:text-gray-900 text-xl">&times;</button>
        </div>
        <div class="mb-6">
          <div class="text-gray-700 mb-2"><strong>Order ID:</strong> #{{ orderDetailsModal.id }}</div>
          <div class="text-gray-700 mb-2"><strong>Customer:</strong> {{ orderDetailsModal.delivery_address?.first_name }} {{ orderDetailsModal.delivery_address?.last_name }}</div>
          <div class="text-gray-700 mb-2"><strong>Date:</strong> {{ new Date(orderDetailsModal.updated_at).toLocaleString() }}</div>
          <div class="text-gray-700 mb-2"><strong>Status:</strong> <span :class="getStatusColor(orderDetailsModal.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">{{ orderDetailsModal.status }}</span></div>
          <div class="text-gray-700 mb-2"><strong>Total:</strong> ${{ orderDetailsModal.total_amount }}</div>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Order Items</h3>
          <table class="min-w-full divide-y divide-gray-200 mb-4">
          <thead class="bg-gray-50">
            <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in orderDetailsModal.order_items" :key="item.id">
            <td class="px-4 py-2 text-gray-500 flex items-center">
              <img :src="item.fruit?.image_url" :alt="item.fruit?.name" class="w-10 h-10 rounded object-cover mr-3" v-if="item.fruit">
              <span>{{ item.fruit?.name || 'N/A' }}</span>
            </td>
            <td class="px-4 py-2 text-gray-500">{{ item.quantity }}</td>
            <td class="px-4 py-2 text-gray-500">${{ item.price }}</td>
            <td class="px-4 py-2 text-gray-500">${{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
          </table>
        </div>
        <div class="px-6 py-4 rounded-b-xl flex justify-end space-x-3">
          <button
          @click="isOrderDetailsOpen = false"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
          Close
          </button>
        </div>
      </div>
    </div>

    <Snackbar ref="snackbar" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import {
  CubeTransparentIcon,
  ShoppingBagIcon,
  UsersIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'
import Snackbar from '@/components/Snackbar.vue'


// Reactive state
const activeTab = ref('products')
const isProductModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isOrderDetailsOpen = ref(false)
const orderDetailsModal = ref([])
const modalMode = ref('add')
const fruits = ref([])
const allOrders = ref([])
const productToDelete = ref(null)
const allUsers = ref([])
const snackbar = ref(null)
const fileInput = ref(null)
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  perPage: 8,
  totalItems: 0
})
const currentProduct = ref({
  id: null,
  name: '',
  category: '',
  price: 0,
  stock: 0,
  image_url: '',
  description: '',
})

// Categories for dropdown
const categories = [
  'Citrus',
  'Tropical',
  'Berries',
  'Stone Fruits',
  'Exotic Fruit',
  'Melons'
]

// Navigation tabs
const tabs = [
  { id: 'products', name: 'Products', icon: 'CubeTransparentIcon' },
  { id: 'orders', name: 'Orders', icon: 'ShoppingBagIcon' },
  { id: 'users', name: 'Users', icon: 'UsersIcon' }
]

// API Functions
const fetchFruits = async (page = 1) => {
  try {
    const response = await api.get('/fruits?page=' + page)
    fruits.value = response.data.data
    pagination.value = {
      currentPage: response.data.current_page,
      totalPages: response.data.last_page,
      perPage: response.data.per_page,
      totalItems: response.data.total
    }
  } catch (error) {
    console.error('Error fetching fruits:', error)
  }
}

const getAvailableStatusOptions = (currentStatus) => {
  const allOptions = [
    { value: 'processing', label: 'processing' },
    { value: 'shipped', label: 'shipped' },
    { value: 'delivered', label: 'delivered' },
    { value: 'cancelled', label: 'cancelled' }
  ]

  if (currentStatus === 'processing') {
    return allOptions
  } else if (currentStatus === 'shipped') {
    return allOptions.filter(opt => opt.value !== 'processing')
  } else {
    return []
  }
}

const updateOrderStatus = async (order) => {
  try {

    console.log('Updating order status:', order);

    const response = await api.put('/orders/' + order.id, {
      status: order.status,
    })

    if(response.data.status) {
      orderDetailsModal.value = response.data.data
      snackbar.value.showSnackbar('Order status updated successfully!')
    } else {
      snackbar.value.showSnackbar('Failed to update order status. Please try again.', 'error')
      return
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    snackbar.value.showSnackbar('Failed to update order status. Please try again.', 'error')
  }
}

const confirmDelete = async () => {
  if (!productToDelete.value) return

  try {
    await api.delete('/fruits/' + productToDelete.value.id)
    await fetchFruits()
    isDeleteModalOpen.value = false
    productToDelete.value = null
    snackbar.value.showSnackbar('Product deleted successfully!')
  } catch (error) {
    console.error('Error deleting product:', error)
    snackbar.value.showSnackbar('Failed to delete product. Please try again.', 'error')
  }
}

const allOrdersData = async () => {
  try {
    const response = await api.get('/orders')
    allOrders.value = response.data.data
  } catch (error) {
    console.error('Error fetching orders:', error)
  }
}

const allUsersData = async () => {
  try {
    const response = await api.get('/user')
    allUsers.value = response.data.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Utility Functions
const getStatusColor = (status) => {
  const colors = {
    'processing': 'bg-yellow-100 text-yellow-800',
    'shipped': 'bg-blue-100 text-blue-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

// Image Upload Functions
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Create a FileReader to convert the file to base64 URL
    const reader = new FileReader()
    reader.onload = (e) => {
      currentProduct.value.image_url = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Modal Functions
const openProductModal = (mode, product = null) => {
  modalMode.value = mode
  if (mode === 'add') {
    currentProduct.value = {
      id: null,
      name: '',
      category: '',
      price: 0,
      stock: 0,
      image_url: '',
      description: ''
    }
  } else {
    currentProduct.value = { ...product }
  }
  isProductModalOpen.value = true
}

// CRUD Functions
const saveProduct = async () => {
  isProductModalOpen.value = false
  try {
    if (modalMode.value === 'add') {
      const newProduct = {
        name: currentProduct.value.name,
        category: currentProduct.value.category,
        price: currentProduct.value.price,
        stock: currentProduct.value.stock,
        description: currentProduct.value.description,
        image_url: currentProduct.value.image_url,
      }
      await api.post('/fruits', newProduct)
      snackbar.value.showSnackbar('Product added successfully!')
    } else {
      await api.put('/fruits/' + currentProduct.value.id, currentProduct.value)
      snackbar.value.showSnackbar('Product updated successfully!')
    }
    await fetchFruits()
  } catch (error) {
    console.error('Error saving product:', error)
    snackbar.value.showSnackbar('Failed to save product. Please try again.', 'error')
  }
}

const deleteProduct = (id) => {
  productToDelete.value = fruits.value.find(fruit => fruit.id === id)
  isDeleteModalOpen.value = true
}

const viewOrderDetails = (id) => {
  isOrderDetailsOpen.value = true
  orderDetailsModal.value = id
}

// const deleteOrder = async (id) => {
//   if (confirm('Are you sure you want to delete this order?')) {
//     try {
//       await api.delete('/orders/' + id)
//       await allOrdersData()
//     } catch (error) {
//       console.error('Error deleting order:', error)
//     }
//   }
// }

const deleteUser = async (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await api.delete('/user/' + id)
      await allUsersData()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}

// Initialize data on component mount
onMounted(() => {
  fetchFruits()
  allOrdersData()
  allUsersData()
})
</script>

<style scoped></style>
