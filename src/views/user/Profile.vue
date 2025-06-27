<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-light text-gray-900">My Profile</h1>
        <p class="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <nav class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ul class="space-y-2">
              <li v-for="tab in tabs" :key="tab.id">
                <button
                  @click="activeTab = tab.id"
                  :class="activeTab === tab.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
                  class="w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                >
                  <component :is="tab.icon" class="w-5 h-5" />
                  <span class="font-medium">{{ tab.name }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">

          <!-- Personal Information -->
          <div v-if="activeTab === 'personal'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-light text-gray-900">Personal Information</h2>
              <button
                @click="editMode = !editMode"
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <PencilIcon class="w-5 h-5" />
              </button>
            </div>

            <form @submit.prevent="savePersonalInfo" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    id="firstName"
                    v-model="user.first_name"
                    :disabled="!editMode"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 bg-gray-50 text-gray-500"
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    v-model="user.last_name"
                    :disabled="!editMode"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 bg-gray-50 text-gray-500"
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  id="email"
                  v-model="user.email"
                  :disabled="!editMode"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 bg-gray-50 text-gray-500"
                >
              </div>

              <div v-if="editMode" class="flex space-x-4">
                <button
                  type="submit"
                  class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  @click="editMode = false"
                  class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- Order History -->
          <div v-if="activeTab === 'orders'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 class="text-2xl font-light text-gray-900 mb-8">Order History</h2>

            <div v-if="ordersItems.length === 0" class="text-center py-8">
              <p class="text-gray-500">No orders found</p>
            </div>

            <div v-else class="space-y-6">
              <div v-for="order in ordersItems" :key="order.id" class="border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">Order #{{ order.id }}</h3>
                    <p class="text-sm text-gray-600">
                    {{ formatDate(order.created_at) }} • {{ order.order_items?.length || 0 }} items
                  </p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-semibold text-gray-900">${{ order.total_amount }}</div>
                    <span :class="getStatusColor(order.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                      {{ order.status }}
                    </span>
                  </div>
                </div>

                <div v-if="order.order_items && order.order_items.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="item in order.order_items" :key="item.id" class="flex items-center space-x-3">
                    <img
                      :src="item.fruit.image_url"
                      :alt="item.fruit.name"
                      class="w-12 h-12 object-cover"
                    >
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ item.fruit.name }}</p>
                      <p class="text-xs text-gray-600">Qty: {{ item.quantity }} • ${{ item.price }}</p>
                    </div>
                  </div>
                </div>

                <div v-else class="text-sm text-gray-500 italic">
                  No items in this order
                </div>
              </div>
            </div>
          </div>

          <!-- Addresses -->
          <div v-if="activeTab === 'addresses'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-light text-gray-900">Saved Address</h2>
              <button
                @click="editModeAddress = !editModeAddress"
                class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <PencilIcon class="w-5 h-5" />
              </button>
            </div>

            <form @submit.prevent="saveAddressInfo" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    id="city"
                    v-model="user.city"
                    :disabled="!editModeAddress"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 bg-gray-50 text-gray-500"
                  >
                </div>
                <div>
                  <label for="postal_code" class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input
                    id="postal_code"
                    v-model="user.postal_code"
                    :disabled="!editModeAddress"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 bg-gray-50 text-gray-500"
                  >
                </div>
              </div>

              <div>
                <label for="street" class="block text-sm font-medium text-gray-700 mb-2">Street</label>
                <input
                  id="street"
                  v-model="user.street"
                  :disabled="!editModeAddress"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 bg-gray-50 text-gray-500"
                >
              </div>

              <div v-if="editModeAddress" class="flex space-x-4">
                <button
                  type="submit"
                  class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  @click="editModeAddress = false"
                  class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- Settings -->
          <div v-if="activeTab === 'settings'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 class="text-2xl font-light text-gray-900 mb-8">Account Settings</h2>

            <div class="space-y-8">
              <!-- Notifications -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                <div class="space-y-4">
                  <div v-for="notification in notificationSettings" :key="notification.id" class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-sm text-gray-600">{{ notification.description }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        :checked="notification.enabled"
                        @change="toggleNotification(notification)"
                        class="sr-only peer"
                      >
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Password Change -->
              <div class="border-t border-gray-200 pt-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                <form @submit.prevent="changePassword" class="space-y-4 max-w-md">
                  <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      id="currentPassword"
                      v-model="passwordForm.current"
                      type="password"
                      class="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                    >
                  </div>
                  <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      id="newPassword"
                      v-model="passwordForm.new"
                      type="password"
                      class="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                    >
                  </div>
                  <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      id="confirmPassword"
                      v-model="passwordForm.confirm"
                      type="password"
                      class="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                    >
                  </div>
                  <button
                    type="submit"
                    class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Snackbar ref="snackbar" />

  </div>
</template>

<script setup>
import { ref , onMounted } from 'vue'
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CogIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import api from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import Snackbar from '@/components/Snackbar.vue'

const { user , refreshUser } = useAuth()
const activeTab = ref('personal')
const editMode = ref(false)
const editModeAddress = ref(false)
const ordersItems = ref([])
const snackbar = ref(null)
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const loadNotifications = async () => {
  try {
    const response = await api.get('/notification-settings')
    notificationSettings.value = response.data.data
  } catch (error) {
    snackbar.value.showSnackbar('Failed to load notifications', 'error')
  }
}

const toggleNotification = async (notification) => {
  notification.enabled = !notification.enabled

  // Prepare the payload as required by backend
  const payload = {
    notificationSettings: notificationSettings.value.map(n => ({
      id: n.id,
      enabled: n.enabled
    }))
  }

  try {
    const response = await api.put('/notification-settings', payload)
    if (response.data.status) {
      snackbar.value.showSnackbar('Notification settings updated successfully!')
    } else {
      snackbar.value.showSnackbar(response.data.message || 'Failed to update notification settings', 'error')
    }
  } catch (error) {
    snackbar.value.showSnackbar('Failed to update notification settings', 'error')
  }
}

const tabs = ref([
  { id: 'personal', name: 'Personal Info', icon: 'UserIcon' },
  { id: 'orders', name: 'Order History', icon: 'ShoppingBagIcon' },
  { id: 'addresses', name: 'Addresses', icon: 'MapPinIcon' },
  { id: 'settings', name: 'Settings', icon: 'CogIcon' }
])

const ordersData = async () => {
  try {
    const response = await api.get('/orders')
    ordersItems.value = response.data.data
  } catch (error) {
    snackbar.value.showSnackbar('Failed to load order history', 'error')
  }
}

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

const notificationSettings = ref([
  {
    id: 1,
    title: 'Order Updates',
    description: 'Get notified about your order status',
    enabled: true
  },
  {
    id: 3,
    title: 'New Products',
    description: 'Be the first to know about new arrivals',
    enabled: true
  }
])

const savePersonalInfo = async () => {
  try {
    const userData = {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      email: user.value.email,
    }

    await api.post("/auth/update", userData)
    editMode.value = false
    refreshUser()

    snackbar.value.showSnackbar('Personal info updated successfully!')
  } catch (error) {
    snackbar.value.showSnackbar('Failed to update personal info', 'error')
  }
}

const saveAddressInfo = async () => {
  try {
    const addressData = {
      street: user.value.street,
      postal_code: user.value.postal_code,
      city: user.value.city
    }

    await api.post('/auth/update', addressData)
    editModeAddress.value = false
    refreshUser()
    snackbar.value.showSnackbar('Address updated successfully!')
  } catch (error) {
    snackbar.value.showSnackbar('Failed to update address', 'error')
  }
}

const getStatusColor = (status) => {
  const colors = {
    'processing': 'bg-yellow-100 text-yellow-800',
    'shipped': 'bg-blue-100 text-blue-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

onMounted(() => {
  ordersData()
  loadNotifications()
})

const changePassword = async () => {
  // Validation
  if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
    snackbar.value.showSnackbar('Please fill in all password fields', 'error')
    return
  }

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    snackbar.value.showSnackbar('New passwords do not match', 'error')
    return
  }

  if (passwordForm.value.new.length < 6) {
    snackbar.value.showSnackbar('New password must be at least 6 characters', 'error')
    return
  }

  try {
    const passwordData = {
      current_password: passwordForm.value.current,
      password: passwordForm.value.new,
    }

    const response = await api.post('/auth/update', passwordData)

    if (response.data.status) {
      passwordForm.value = {
        current: '',
        new: '',
        confirm: ''
      }

      snackbar.value.showSnackbar('Password updated successfully!')
    } else {
      snackbar.value.showSnackbar(response.data.message || 'Failed to update password', 'error')
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update password'
    snackbar.value.showSnackbar(errorMessage, 'error')
  }
}
</script>

<style scoped>
/* Custom toggle switch styles */
.peer:checked + div {
  background-color: #111827;
}
</style>

