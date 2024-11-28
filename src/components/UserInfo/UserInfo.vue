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

// v-if="userInfo"
</script>

<template>
  <div
    class="bg-white lg:max-w-[46%] rounded-lg shadow-md flex items-center gap-1 sm:gap-0 lg:gap-1 hover:bg-gray-100 transition"
  >
    <div
      class="flex items-center px-1 ml-[6px] mr-1 sm:mx-1 md:mx-2 md:mr-[6px] lg:mx-1 sm:px-0 lg:px-1 justify-center w-6 sm:w-4 lg:w-8 rounded-full hover:scale-105 transition-transform duration-200"
    >
      <!-- <div class="icon-wrapper"> -->
      <UserIcon class="text-black" />
    </div>
    <div class="flex-1 truncate">
      <span v-if="isUserLoading" class="text-red-500">Loading...</span>
      <span v-if="true" class="sticky font-semibold text-gray-900 text-sm sm:text-xs lg:text-base">
        {{ userInfo?.data?.name || 'Tom Cruise' }}
      </span>
      <LogoutButton :onLogout="onLogout" :isLogOutLoading="isLogOutLoading" />
    </div>
  </div>
</template>

<!-- <style scoped>
.user-info-container {
  display: flex;
  align-items: center;
  /* padding: 12px; */
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  /* margin-right: 10px; */
}

.user-details {
  display: flex;
  flex-direction: column;
}

.loading-text {
  color: #e53e3e;
  font-size: 12px;
}

.user-name {
  font-size: 14px;
  font-weight: bold;
  color: #1a202c;
}
</style> -->
