<script setup>
import UserIcon from './UserIcon.vue'
import LogoutButton from '../LogoutButton/LogoutButton.vue'
import { useMutation } from '@/composables/useMutation'
import { getUserInfo } from '@/api/user'
import { onMounted } from 'vue'

const props = defineProps({
  onLogout: {
    type: Function,
    required: true
  }
})

const {
  data: userInfo,
  mutation: getUser,
  isLoading,
  error
} = useMutation({
  mutationFn: () => getUserInfo()
})

onMounted(() => {
  getUser()
})

if (error.value) {
  console.error('Error fetching user info:', error.value)
}

// v-if="userInfo"
</script>

<template>
  <div
    class="bg-white lg:max-w-[46%] rounded-lg shadow-md flex items-center gap-1 sm:gap-0 lg:gap-1 hover:bg-gray-100 transition"
  >
    <div
      class="flex items-center px-1 sm:px-0 lg:px-1 justify-center w-6 sm:w-4 lg:w-8 bg-primary-100 rounded-full"
    >
      <UserIcon class="text-primary-600" />
    </div>
    <div class="flex-1 truncate">
      <span v-if="isLoading" class="text-red-500">Loading...</span>
      <span v-if="true" class="sticky font-semibold text-gray-900 text-sm sm:text-xs lg:text-base">
        {{ userInfo?.data?.name || 'Tom Cruise' }}
      </span>
      <LogoutButton :onLogout="onLogout" />
    </div>
  </div>
</template>
