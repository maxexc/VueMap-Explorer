<script setup>
import LogoutIcon from './LogoutIcon.vue'

const props = defineProps({
  onLogout: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <button
    v-button-animation
    @click="onLogout"
    class="group text-sm sm:text-xs lg:text-base text-green-500 hover:text-red-600 underline flex gap-1 sm:gap-1 lg:gap-2 items-center -mt-[2px] pb-[2px]"
  >
    <span v-if="isLoading" class="text-red-600">Loading...</span>
    <span v-else class="group-hover:text-inherit">Log out</span>
    <LogoutIcon class="text-black group-hover:text-inherit" />
  </button>
</template>
