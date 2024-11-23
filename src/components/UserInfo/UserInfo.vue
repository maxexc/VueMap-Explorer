<script setup>
import UserIcon from './UserIcon.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LogoutIcon from '../LogoutButton/LogoutIcon.vue'

const username = ref('Tom Cruise') // Здесь можно заменить на реальные данные пользователя.
const router = useRouter()

const handleLogout = () => {
  // Логика для выхода пользователя
  console.log('User logged out')
  router.push('/auth') // Перенаправление на страницу авторизации
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:bg-gray-100 transition"
  >
    <div class="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
      <UserIcon class="text-primary-600" />
    </div>
    <div class="flex-1">
      <p class="font-semibold text-gray-900 text-sm sm:text-base">{{ username }}</p>
      <button
        @click="handleLogout"
        class="text-xs text-red-600 hover:text-red-700 underline flex gap-2"
      >
        Log out
        <LogoutIcon />
      </button>
    </div>
  </div>
</template>

<style scoped></style>

<!-- <script setup>
import UserIcon from './UserIcon.vue'
</script>

<template>
  <div
    class="flex sticky top-0 items-center text-black gap-3 bg-[#ffe6dc] border-solid border-b-2 border-primary rounded-bl-2xl rounded-br-2xlpx-6 py-4 mb-10"
  >
    <div class="w-10 h-10 flex items-center justify-center rounded-full color-primary bg-primary">
      <UserIcon class="text-white" />
    </div>
  </div>
</template> -->
