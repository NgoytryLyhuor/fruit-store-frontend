<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
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
            <button class="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
              Shop Collection
            </button>
            <button class="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Shop by Category</h2>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="category in categories" :key="category.id"
            class="group cursor-pointer">
            <div class="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
                <component :is="category.icon" class="w-8 h-8 text-gray-700" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">{{ category.name }}</h3>
              <p class="text-sm text-gray-500">{{ category.count }} items</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Featured Selection</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Handpicked fruits at their peak freshness</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="product in featuredProducts" :key="product.id"
            class="group cursor-pointer">
            <div class="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300">
              <div class="relative overflow-hidden aspect-square">
                <img :src="product.image_url" :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-4 right-4">
                  <span v-if="product.stock > 0"
                    class="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 shadow-sm">
                    In Stock
                  </span>
                  <span v-else class="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Sold Out
                  </span>
                </div>
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ product.category }}</span>
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xl font-medium text-gray-900">${{ product.price }}</span>
                  <button
                    class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-16">
          <button
            class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Why Choose Pure Flave</h2>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center group">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
              <SparklesIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">Premium Quality</h3>
            <p class="text-gray-600 leading-relaxed">Hand-selected fruits from certified organic farms, ensuring the highest quality and freshness</p>
          </div>
          <div class="text-center group">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
              <BoltIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">Fast Delivery</h3>
            <p class="text-gray-600 leading-relaxed">Same-day delivery available in most areas, bringing farm-fresh produce to your door</p>
          </div>
          <div class="text-center group">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors duration-300">
              <HeartIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">100% Organic</h3>
            <p class="text-gray-600 leading-relaxed">All our fruits are certified organic and pesticide-free, grown with care for you and the environment</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
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
          <button class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 whitespace-nowrap transform hover:scale-105">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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

export default {
  name: 'Home',
  components: {
    SparklesIcon,
    BoltIcon,
    HeartIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    SunIcon,
    BeakerIcon,
    StarIcon
  },
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Citrus',
          icon: 'SunIcon',
          count: 12
        },
        {
          id: 2,
          name: 'Tropical',
          icon: 'GlobeAltIcon',
          count: 18
        },
        {
          id: 3,
          name: 'Berries',
          icon: 'StarIcon',
          count: 8
        },
        {
          id: 4,
          name: 'Stone Fruits',
          icon: 'BeakerIcon',
          count: 15
        }
      ],
      featuredProducts: [
        {
          id: 1,
          name: 'Fresh Oranges',
          price: 4.99,
          image_url: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=400&fit=crop',
          category: 'Citrus',
          stock: 25,
          description: 'Sweet and juicy oranges packed with vitamin C, perfect for fresh juice or snacking.'
        },
        {
          id: 2,
          name: 'Organic Bananas',
          price: 2.99,
          image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
          category: 'Tropical',
          stock: 30,
          description: 'Perfectly ripe organic bananas, great source of potassium and natural energy.'
        },
        {
          id: 3,
          name: 'Fresh Strawberries',
          price: 6.99,
          image_url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop',
          category: 'Berries',
          stock: 15,
          description: 'Sweet and succulent strawberries, perfect for desserts or eating fresh.'
        },
        {
          id: 4,
          name: 'Green Apples',
          price: 3.99,
          image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
          category: 'Stone Fruits',
          stock: 20,
          description: 'Crisp and tart green apples, excellent for baking or healthy snacking.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
