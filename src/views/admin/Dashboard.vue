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
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="product in products" :key="product.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full object-cover" :src="product.image_url" :alt="product.name">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                          <div class="text-sm text-gray-500">{{ product.description.substring(0, 30) }}...</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ product.category }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${{ product.price.toFixed(2) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ product.stock > 0 ? product.stock + ' In Stock' : 'Out of Stock' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="openProductModal('edit', product)" class="text-gray-600 hover:text-gray-900 mr-3">
                        <PencilIcon class="w-5 h-5" />
                      </button>
                      <button @click="deleteProduct(product.id)" class="text-red-600 hover:text-red-900">
                        <TrashIcon class="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                  <tr v-for="order in orders" :key="order.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ order.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.customerName }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.date }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ order.total.toFixed(2) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusColor(order.status)"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="viewOrderDetails(order.id)" class="text-gray-600 hover:text-gray-900 mr-3">
                        <EyeIcon class="w-5 h-5" />
                      </button>
                      <button @click="deleteOrder(order.id)" class="text-red-600 hover:text-red-900">
                        <TrashIcon class="w-5 h-5" />
                      </button>
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
                    <th scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in users" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full object-cover" :src="user.avatar_url" :alt="user.name">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="editUserRole(user.id)" class="text-gray-600 hover:text-gray-900 mr-3">
                        <PencilIcon class="w-5 h-5" />
                      </button>
                      <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">
                        <TrashIcon class="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <div v-if="isProductModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div class="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg">
        <h3 class="text-2xl font-light text-gray-900 mb-6">{{ modalMode === 'add' ? 'Add New Product' : 'Edit Product'
        }}</h3>
        <form @submit.prevent="saveProduct" class="space-y-4">
          <div>
            <label for="productName" class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input type="text" id="productName" v-model="currentProduct.name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              required>
          </div>
          <div>
            <label for="productCategory" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input type="text" id="productCategory" v-model="currentProduct.category"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              required>
          </div>
          <div>
            <label for="productPrice" class="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input type="number" id="productPrice" v-model.number="currentProduct.price"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              step="0.01" required>
          </div>
          <div>
            <label for="productStock" class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input type="number" id="productStock" v-model.number="currentProduct.stock"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
              required>
          </div>
          <div>
            <label for="productImage" class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input type="text" id="productImage" v-model="currentProduct.image_url"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200">
          </div>
          <div>
            <label for="productDescription" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea id="productDescription" v-model="currentProduct.description" rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 resize-none"></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="closeProductModal"
              class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
              Cancel
            </button>
            <button type="submit"
              class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
              {{ modalMode === 'add' ? 'Add Product' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CubeTransparentIcon,
  ShoppingBagIcon,
  UsersIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'AdminDashboard',
  components: {
    CubeTransparentIcon,
    ShoppingBagIcon,
    UsersIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon
  },
  data() {
    return {
      activeTab: 'products',
      isProductModalOpen: false,
      modalMode: 'add', // 'add' or 'edit'
      currentProduct: {
        id: null,
        name: '',
        category: '',
        price: 0,
        stock: 0,
        image_url: '',
        description: ''
      },
      tabs: [
        { id: 'products', name: 'Products', icon: 'CubeTransparentIcon' },
        { id: 'orders', name: 'Orders', icon: 'ShoppingBagIcon' },
        { id: 'users', name: 'Users', icon: 'UsersIcon' }
      ],
      products: [
        {
          id: 1,
          name: 'Fresh Oranges',
          category: 'Citrus',
          price: 4.99,
          stock: 25,
          image_url: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=100&h=100&fit=crop',
          description: 'Sweet and juicy oranges packed with vitamin C, perfect for fresh juice or snacking.'
        },
        {
          id: 2,
          name: 'Organic Bananas',
          category: 'Tropical',
          price: 2.99,
          stock: 30,
          image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop',
          description: 'Perfectly ripe organic bananas, great source of potassium and natural energy.'
        },
        {
          id: 3,
          name: 'Fresh Strawberries',
          category: 'Berries',
          price: 6.99,
          stock: 15,
          image_url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100&h=100&fit=crop',
          description: 'Sweet and succulent strawberries, perfect for desserts or eating fresh.'
        },
        {
          id: 4,
          name: 'Green Apples',
          category: 'Stone Fruits',
          price: 3.99,
          stock: 20,
          image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop',
          description: 'Crisp and tart green apples, excellent for baking or healthy snacking.'
        }
      ],
      orders: [
        {
          id: 'ORD001',
          customerName: 'Alice Smith',
          date: '2024-05-20',
          total: 12.98,
          status: 'Processing'
        },
        {
          id: 'ORD002',
          customerName: 'Bob Johnson',
          date: '2024-05-19',
          total: 25.50,
          status: 'Delivered'
        },
        {
          id: 'ORD003',
          customerName: 'Charlie Brown',
          date: '2024-05-18',
          total: 8.75,
          status: 'Cancelled'
        }
      ],
      users: [
        {
          id: 'USR001',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'Admin',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
        },
        {
          id: 'USR002',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'Customer',
          avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop'
        }
      ]
    }
  },
  methods: {
    openProductModal(mode, product = null) {
      this.modalMode = mode;
      if (mode === 'add') {
        this.currentProduct = {
          id: null,
          name: '',
          category: '',
          price: 0,
          stock: 0,
          image_url: '',
          description: ''
        };
      } else {
        this.currentProduct = { ...product };
      }
      this.isProductModalOpen = true;
    },
    closeProductModal() {
      this.isProductModalOpen = false;
    },
    saveProduct() {
      if (this.modalMode === 'add') {
        const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        this.products.push({ ...this.currentProduct, id: newId });
      } else {
        const index = this.products.findIndex(p => p.id === this.currentProduct.id);
        if (index !== -1) {
          this.products.splice(index, 1, { ...this.currentProduct });
        }
      }
      this.closeProductModal();
    },
    deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.products = this.products.filter(product => product.id !== id);
      }
    },
    getStatusColor(status) {
      const colors = {
        'Delivered': 'bg-green-100 text-green-800',
        'Processing': 'bg-yellow-100 text-yellow-800',
        'Cancelled': 'bg-red-100 text-red-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    },
    viewOrderDetails(id) {
      console.log('Viewing order details for:', id);
      // Implement navigation to order details page or modal
    },
    deleteOrder(id) {
      if (confirm('Are you sure you want to delete this order?')) {
        this.orders = this.orders.filter(order => order.id !== id);
      }
    },
    editUserRole(id) {
      console.log('Editing user role for:', id);
      // Implement user role editing logic or modal
    },
    deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.users = this.users.filter(user => user.id !== id);
      }
    }
  }
}
</script>

<style scoped>

</style>
