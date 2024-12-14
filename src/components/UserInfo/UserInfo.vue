<script setup>
import UserIcon from './UserIcon.vue'
import LogoutButton from '../LogoutButton/LogoutButton.vue'

const props = defineProps({
  userInfo: {
    type: Object,
    default: null
  },
  isUserLoading: {
    type: Boolean,
    default: false
  },
  isLogOutLoading: {
    type: Boolean,
    default: false
  },
  onLogout: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div
    class="bg-white lg:max-w-[46%] rounded-lg shadow-md flex items-center gap-1 sm:gap-0 md:gap-1 lg:gap-1 hover:bg-gray-100 transition"
  >
    <div
      class="flex items-center px-1 ml-[7px] mr-1 sm:ml-[6px] md:ml-[7px] sm:mr-[5px] lg:mx-1 sm:px-0 lg:px-1 justify-center w-6 sm:w-4 lg:w-8 rounded-full hover:scale-105 transition-transform duration-200"
    >
      <UserIcon class="text-black" />
    </div>
    <div class="flex-1 truncate">
      <span v-if="isUserLoading" class="text-red-500 text-xs">Loading...</span>
      <span class="sticky font-semibold text-gray-900 text-sm sm:text-xs lg:text-base">
        {{ userInfo?.data?.name || 'User' }}
      </span>
      <LogoutButton :onLogout="onLogout" :isLogOutLoading="isLogOutLoading" />
    </div>
  </div>
</template>
