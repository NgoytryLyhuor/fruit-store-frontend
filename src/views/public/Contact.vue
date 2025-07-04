<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center">
          <h1 class="text-5xl lg:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Get In
            <span class="block font-medium text-gray-700">Touch</span>
          </h1>
          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>
      </div>
    </section>

    <!-- Contact Form & Info Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div class="bg-white">
            <div class="mb-8">
              <h2 class="text-3xl font-light text-gray-900 mb-4">Send us a message</h2>
              <p class="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="form.firstName"
                    class="text-gray-600  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                    placeholder="Sokha"
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="form.lastName"
                    class="text-gray-600  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                    placeholder="Chan"
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="text-gray-600 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                  placeholder="sokha@example.com"
                >
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  class="text-gray-600 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                  placeholder="+855 12 345 678"
                >
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  id="subject"
                  v-model="form.subject"
                  class="text-gray-600 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  class="text-gray-600  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="text-gray-600 w-full bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="bg-gray-50 rounded-lg p-8">
            <h3 class="text-2xl font-light text-gray-900 mb-8">Contact Information</h3>

            <div class="space-y-8">
              <div v-for="contact in contactInfo" :key="contact.id" class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                  <component :is="contact.icon" class="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 class="text-lg font-medium text-gray-900 mb-1">{{ contact.title }}</h4>
                  <p class="text-gray-600">{{ contact.value }}</p>
                  <p v-if="contact.additional" class="text-gray-500 text-sm mt-1">{{ contact.additional }}</p>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="mt-12 pt-8 border-t border-gray-200">
              <h4 class="text-lg font-medium text-gray-900 mb-4">Business Hours</h4>
              <div class="space-y-2">
                <div v-for="hour in businessHours" :key="hour.id" class="flex justify-between">
                  <span class="text-gray-600">{{ hour.day }}</span>
                  <span class="text-gray-900 font-medium">{{ hour.time }}</span>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="mt-8 pt-8 border-t border-gray-200">
              <h4 class="text-lg font-medium text-gray-900 mb-4">Follow Us</h4>
              <div class="flex space-x-4">
                <a
                  v-for="social in socialMedia"
                  :key="social.id"
                  :href="social.url"
                  class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <component :is="social.icon" class="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Visit Our Store</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Come see our fresh selection in person at our Phnom Penh location</p>
        </div>

        <div class="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <!-- Map Placeholder -->
            <div class="bg-gray-100 h-96 lg:h-auto flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.767433008373!2d104.92320961475704!3d11.562126391806897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDMzJzQzLjciTiAxMDTCsDU1JzIzLjUiRQ!5e0!3m2!1sen!2skh!4v1698765432100!5m2!1sen!2skh"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- Store Information -->
            <div class="p-8">
              <h3 class="text-2xl font-medium text-gray-900 mb-6">Pure Flave Phnom Penh Store</h3>

              <div class="space-y-6">
                <div class="flex items-start space-x-3">
                  <MapPinIcon class="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p class="text-gray-900 font-medium">Address</p>
                    <p class="text-gray-600">No. 123, Street 360, Boeung Keng Kang I<br>Phnom Penh, Cambodia</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <ClockIcon class="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p class="text-gray-900 font-medium">Store Hours</p>
                    <p class="text-gray-600">Monday - Saturday: 8:00 AM - 7:00 PM<br>Sunday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <PhoneIcon class="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p class="text-gray-900 font-medium">Store Phone</p>
                    <p class="text-gray-600">+855 12 345 678</p>
                  </div>
                </div>
              </div>

              <div class="mt-8">
                <button class="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div class="w-16 h-px bg-gray-300 mx-auto"></div>
        </div>

        <div class="space-y-6">
          <div v-for="faq in faqs" :key="faq.id" class="bg-white border border-gray-200 rounded-lg">
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
            >
              <span class="text-lg font-medium text-gray-900">{{ faq.question }}</span>
              <ChevronDownIcon
                :class="faq.isOpen ? 'transform rotate-180' : ''"
                class="w-5 h-5 text-gray-600 transition-transform duration-200"
              />
            </button>
            <div v-if="faq.isOpen" class="px-6 pb-4">
              <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChevronDownIcon ,
  GlobeAltIcon,
  ChatBubbleOvalLeftIcon,
  CameraIcon,
} from '@heroicons/vue/24/outline'

// Form reactive data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// Contact information
const contactInfo = ref([
  {
    id: 1,
    title: 'Phone',
    value: '+855 12 345 678',
    additional: 'Monday - Friday, 8 AM - 5 PM',
    icon: PhoneIcon
  },
  {
    id: 2,
    title: 'Email',
    value: 'hello@pureflave.kh',
    additional: 'We respond within 24 hours',
    icon: EnvelopeIcon
  },
  {
    id: 3,
    title: 'Address',
    value: 'No. 123, Street 360, Boeung Keng Kang I',
    additional: 'Phnom Penh, Cambodia',
    icon: MapPinIcon
  }
])

// Business hours
const businessHours = ref([
  { id: 1, day: 'Monday - Friday', time: '8:00 AM - 5:00 PM' },
  { id: 2, day: 'Saturday', time: '9:00 AM - 3:00 PM' },
  { id: 3, day: 'Sunday', time: 'Closed' }
])

// Social media links (updated with placeholder URLs)
const socialMedia = ref([
  { id: 1, name: 'Facebook', url: 'https://facebook.com/pureflavekh', icon: ChatBubbleOvalLeftIcon },
  { id: 2, name: 'Twitter', url: 'https://twitter.com/pureflavekh', icon: GlobeAltIcon },
  { id: 3, name: 'Instagram', url: 'https://instagram.com/pureflavekh', icon: CameraIcon }
])

// FAQs with reactive isOpen state
const faqs = ref([
  {
    id: 1,
    question: 'What are your delivery areas?',
    answer: 'We deliver across Phnom Penh and nearby areas within 20 km of our store. Enter your address at checkout to confirm availability.',
    isOpen: false
  },
  {
    id: 2,
    question: 'How do you ensure fruit freshness?',
    answer: 'Our fruits are sourced daily from local farms in Cambodia and delivered within 24 hours using temperature-controlled transport.',
    isOpen: false
  },
  {
    id: 3,
    question: 'Do you offer organic certification?',
    answer: 'Yes, our fruits are certified organic by local and international standards, ensuring high-quality, chemical-free produce.',
    isOpen: false
  },
  {
    id: 4,
    question: 'What is your return policy?',
    answer: 'We offer a 100% satisfaction guarantee. Contact us within 48 hours of delivery for a refund or replacement if not satisfied.',
    isOpen: false
  },
  {
    id: 5,
    question: 'Can I schedule recurring deliveries?',
    answer: 'Yes, you can set up weekly or monthly deliveries. Manage your subscription through your account dashboard.',
    isOpen: false
  }
])

// Toggle FAQ open/close state
const toggleFaq = (id) => {
  const faq = faqs.value.find(f => f.id === id)
  if (faq) {
    faq.isOpen = !faq.isOpen
  }
}
</script>

<style scoped>
/* Custom styles for form elements */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}
</style>
