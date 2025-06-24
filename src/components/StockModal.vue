<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
    <div class="bg-white rounded-lg p-6 max-w-md mx-4 transform transition-all duration-300 scale-100" @click.stop>
      <div class="text-center">
        <!-- Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <!-- Dynamic Title and Message -->
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ modalTitle }}</h3>
        <p class="text-sm text-gray-500 mb-6">{{ modalMessage }}</p>

        <!-- Button -->
        <div class="flex justify-center">
          <button
            @click="closeModal"
            class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  // Remove productName prop since we'll handle it differently
})

const isVisible = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const modalMessages = {
  out_of_stock: (productName) => ({
    title: 'Out of Stock',
    message: `${productName} is currently out of stock. Please check back later or choose another product.`
  }),
  max_stock: (productName) => ({
    title: 'Maximum Reached',
    message: `You've reached the maximum available quantity for ${productName}.`
  })
}

const showModal = (type, productName) => {
  const messageConfig = modalMessages[type](productName)
  modalTitle.value = messageConfig.title
  modalMessage.value = messageConfig.message
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false
}

defineExpose({
  showModal,
  closeModal
})
</script>
