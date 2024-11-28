<script setup>
import LogoutIcon from './LogoutIcon.vue'

const props = defineProps({
  onLogout: {
    type: Function,
    required: true
  },
  isLogOutLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    v-button-animation
    @click="onLogout"
    class="group cursor-pointer text-sm sm:text-xs lg:text-base text-green-500 hover:text-red-600 font-semibold underline transition-all duration-200 ease-in-out flex gap-1 sm:gap-1 lg:gap-2 items-center -mt-[2px] pb-[2px]"
  >
    <span v-if="isLogOutLoading" class="text-red-600">Loading...</span>
    <span v-else class="group-hover:text-inherit">Log out</span>
    <LogoutIcon class="text-black group-hover:text-inherit" />
  </button>
</template>

<!-- <style scoped>
/* text-[#48bb78] */
button {
  background: none;
  border: none;
  color: #48bb78;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}
/* 
button:hover {
  color: #e53e3e; 
} */
</style> -->
