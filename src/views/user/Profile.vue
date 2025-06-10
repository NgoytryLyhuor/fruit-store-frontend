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
                    v-model="profile.firstName"
                    :disabled="!editMode"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    id="lastName"
                    v-model="profile.lastName"
                    :disabled="!editMode"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  id="email"
                  v-model="profile.email"
                  :disabled="!editMode"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                >
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  id="phone"
                  v-model="profile.phone"
                  :disabled="!editMode"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
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
            
            <div class="space-y-6">
              <div v-for="order in orders" :key="order.id" class="border border-gray-200 rounded-lg p-6">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">Order #{{ order.id }}</h3>
                    <p class="text-sm text-gray-600">{{ order.date }} • {{ order.items.length }} items</p>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-semibold text-gray-900">${{ order.total.toFixed(2) }}</div>
                    <span :class="getStatusColor(order.status)" class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                      {{ order.status }}
                    </span>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-3">
                    <img :src="item.image_url" :alt="item.name" class="w-12 h-12 object-cover rounded-lg">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                      <p class="text-xs text-gray-600">Qty: {{ item.quantity }} • ${{ item.price }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Addresses -->
          <div v-if="activeTab === 'addresses'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-light text-gray-900">Saved Addresses</h2>
              <button 
                @click="showAddressForm = true"
                class="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
              >
                Add Address
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="address in addresses" :key="address.id" class="border border-gray-200 rounded-lg p-6">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ address.label }}</h3>
                    <span v-if="address.isDefault" class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-1">
                      Default
                    </span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="text-gray-400 hover:text-gray-600">
                      <PencilIcon class="w-4 h-4" />
                    </button>
                    <button class="text-gray-400 hover:text-red-600">
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="text-sm text-gray-600 space-y-1">
                  <p>{{ address.street }}</p>
                  <p>{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                  <p>{{ address.country }}</p>
                </div>
              </div>
            </div>
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
                        v-model="notification.enabled" 
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
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                    >
                  </div>
                  <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      id="newPassword"
                      v-model="passwordForm.new"
                      type="password"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                    >
                  </div>
                  <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      id="confirmPassword"
                      v-model="passwordForm.confirm"
                      type="password"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
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
  </div>
</template>

<script>
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
  CogIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Profile',
  components: {
    UserIcon,
    ShoppingBagIcon,
    MapPinIcon,
    CogIcon,
    PencilIcon,
    TrashIcon
  },
  data() {
    return {
      activeTab: 'personal',
      editMode: false,
      showAddressForm: false,
      tabs: [
        { id: 'personal', name: 'Personal Info', icon: 'UserIcon' },
        { id: 'orders', name: 'Order History', icon: 'ShoppingBagIcon' },
        { id: 'addresses', name: 'Addresses', icon: 'MapPinIcon' },
        { id: 'settings', name: 'Settings', icon: 'CogIcon' }
      ],
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567'
      },
      orders: [
        {
          id: '12345',
          date: 'March 15, 2024',
          status: 'Delivered',
          total: 24.97,
          items: [
            {
              id: 1,
              name: 'Fresh Oranges',
              quantity: 2,
              price: 4.99,
              image_url: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=100&h=100&fit=crop'
            },
            {
              id: 2,
              name: 'Organic Bananas',
              quantity: 1,
              price: 2.99,
              image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop'
            }
          ]
        },
        {
          id: '12344',
          date: 'March 10, 2024',
          status: 'Processing',
          total: 18.96,
          items: [
            {
              id: 3,
              name: 'Fresh Strawberries',
              quantity: 2,
              price: 6.99,
              image_url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100&h=100&fit=crop'
            }
          ]
        }
      ],
      addresses: [
        {
          id: 1,
          label: 'Home',
          street: '123 Main Street',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'United States',
          isDefault: true
        },
        {
          id: 2,
          label: 'Work',
          street: '456 Business Ave',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'United States',
          isDefault: false
        }
      ],
      notificationSettings: [
        {
          id: 1,
          title: 'Order Updates',
          description: 'Get notified about your order status',
          enabled: true
        },
        {
          id: 2,
          title: 'Promotional Emails',
          description: 'Receive special offers and discounts',
          enabled: false
        },
        {
          id: 3,
          title: 'New Products',
          description: 'Be the first to know about new arrivals',
          enabled: true
        }
      ],
      passwordForm: {
        current: '',
        new: '',
        confirm: ''
      }
    }
  },
  methods: {
    savePersonalInfo() {
      // Handle saving personal information
      console.log('Saving personal info:', this.profile)
      this.editMode = false
    },
    
    getStatusColor(status) {
      const colors = {
        'Delivered': 'bg-green-100 text-green-800',
        'Processing': 'bg-yellow-100 text-yellow-800',
        'Shipped': 'bg-blue-100 text-blue-800',
        'Cancelled': 'bg-red-100 text-red-800'
      }
      return colors[status] || 'bg-gray-100 text-gray-800'
    },
    
    changePassword() {
      // Handle password change
      console.log('Changing password')
      this.passwordForm = { current: '', new: '', confirm: '' }
    }
  }
}
</script>

<style scoped>
/* Custom toggle switch styles */
.peer:checked + div {
  background-color: #111827;
}
</style>

