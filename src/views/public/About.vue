<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center">
          <h1 class="text-5xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            About
            <span class="block font-medium text-gray-700">Pure Flave</span>
          </h1>
          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We're passionate about bringing you the freshest, highest quality fruits from local farms to your table.
            Our commitment to excellence and sustainability drives everything we do.
          </p>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-6">Our Story</h2>
            <div class="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2020, Pure Flave began as a simple idea: to connect people with the freshest,
                most delicious fruits while supporting local farmers and sustainable agriculture practices.
              </p>
              <p>
                What started as a small family business has grown into a trusted source for premium organic fruits,
                serving thousands of customers who value quality, freshness, and ethical sourcing.
              </p>
              <p>
                Today, we work directly with over 50 certified organic farms, ensuring that every piece of fruit
                meets our strict standards for taste, nutrition, and environmental responsibility.
              </p>
            </div>
            <div class="mt-8">
              <button class="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                Shop Our Collection
              </button>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop"
                alt="Fresh fruits from local farms"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              >
            </div>
            <div class="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">50+</div>
                <div class="text-sm text-gray-600">Partner Farms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Our Values</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center group">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-sm border border-gray-200">
              <HeartIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">Sustainability</h3>
            <p class="text-gray-600 leading-relaxed">
              We're committed to environmentally responsible farming practices and reducing our carbon footprint through local sourcing and eco-friendly packaging.
            </p>
          </div>
          <div class="text-center group">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-sm border border-gray-200">
              <HeartIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">Quality</h3>
            <p class="text-gray-600 leading-relaxed">
              Every fruit is hand-selected and inspected to ensure it meets our high standards for freshness, taste, and nutritional value.
            </p>
          </div>
          <div class="text-center group">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300 shadow-sm border border-gray-200">
              <UsersIcon class="w-8 h-8 text-gray-700" />
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-3">Community</h3>
            <p class="text-gray-600 leading-relaxed">
              We believe in supporting local farmers and building strong relationships with our customers and the communities we serve.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Meet Our Team</h2>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div v-for="member in teamMembers" :key="member.id" class="text-center group">
            <div class="relative mb-6">
              <div class="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ member.name }}</h3>
            <p class="text-gray-600 mb-4">{{ member.role }}</p>
            <p class="text-gray-500 text-sm leading-relaxed">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Our Impact</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Numbers that reflect our commitment to quality and community</p>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.id" class="text-center">
            <div class="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
              <div class="text-4xl font-bold text-gray-900 mb-2">{{ stat.value }}</div>
              <div class="text-gray-600 font-medium">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-8">Our Mission</h2>
        <p class="text-xl text-gray-600 leading-relaxed mb-12">
          "To make fresh, organic, and sustainably-grown fruits accessible to everyone while supporting local farmers
          and promoting healthy living in our communities."
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
            Join Our Mission
          </button>
          <button class="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  HeartIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'About',
  components: {
    HeartIcon,
    UsersIcon
  },
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'Founder & CEO',
          bio: 'Passionate about sustainable agriculture and connecting communities with fresh, healthy food.',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
        },
        {
          id: 2,
          name: 'Michael Chen',
          role: 'Head of Operations',
          bio: 'Ensures our supply chain runs smoothly and maintains the highest quality standards.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          role: 'Customer Experience',
          bio: 'Dedicated to providing exceptional service and building lasting relationships with our customers.',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
        }
      ],
      stats: [
        {
          id: 1,
          value: '50+',
          label: 'Partner Farms'
        },
        {
          id: 2,
          value: '10K+',
          label: 'Happy Customers'
        },
        {
          id: 3,
          value: '100%',
          label: 'Organic Certified'
        },
        {
          id: 4,
          value: '24/7',
          label: 'Fresh Delivery'
        }
      ]
    }
  }
}
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>

