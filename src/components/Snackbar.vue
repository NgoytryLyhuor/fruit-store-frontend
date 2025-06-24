<template>
  <Transition name="snackbar">
    <div
      v-if="show"
      class="fixed top-[80px] right-4 px-6 py-3 rounded-lg shadow-lg text-white flex items-center justify-between min-w-[300px]"
      :class="[typeClass]"
      :style="neonShadow"
    >
      <span>{{ message }}</span>
      <button
        @click="show = false"
        class="ml-4 hover:scale-125 transition-transform duration-200"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.snackbar-enter-from {
  transform: translateX(120%);
  opacity: 0;
}
.snackbar-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.snackbar-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.snackbar-leave-to {
  transform: translateX(120%);
  opacity: 0;
}
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s ease;
}
</style>

<script setup>
import { ref, computed } from 'vue';

const show = ref(false);
const message = ref('');
const type = ref('success');

const typeClass = computed(() => ({
  'success': 'bg-green-200 text-green-800',
  'error': 'bg-red-200 text-red-800',
  'warning': 'bg-yellow-200 text-yellow-800',
  'info': 'bg-blue-200 text-blue-800'
}[type.value]));

const neonShadow = computed(() => {
  const colorMap = {
    'success': '#bbf7d0',
    'error': '#fecaca',
    'warning': '#fef08a',
    'info': '#bfdbfe'
  };
  const color = colorMap[type.value] || colorMap.success;
  return {
    'box-shadow': `0 0 5px ${color}, 0 0 5px ${color}`
  };
});

const showSnackbar = (msg, msgType = 'success', duration = 3000) => {
  message.value = msg;
  type.value = msgType;
  show.value = true;

  if (duration > 0) {
    setTimeout(() => {
      show.value = false;
    }, duration);
  }
};

defineExpose({ showSnackbar });
</script>
