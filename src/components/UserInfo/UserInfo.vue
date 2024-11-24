<script setup>
import UserIcon from './UserIcon.vue'
import LogoutIcon from '../LogoutButton/LogoutIcon.vue'

const props = defineProps({
  onLogout: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md flex items-center gap-1 sm:gap-0 lg:gap-1 hover:bg-gray-100 transition"
  >
    <div
      class="flex items-center px-1 sm:px-0 lg:px-1 justify-center w-6 sm:w-4 lg:w-8 bg-primary-100 rounded-full"
    >
      <UserIcon class="text-primary-600" />
    </div>
    <div class="flex-1">
      <p class="font-semibold text-gray-900 text-sm sm:text-xs lg:text-base">Tom Cruise</p>
      <button
        v-button-animation
        @click="onLogout"
        class="text-sm sm:text-xs lg:text-base text-green-500 hover:text-red-600 underline flex gap-1 sm:gap-1 lg:gap-2 items-center"
      >
        Log out
        <LogoutIcon />
      </button>
    </div>
  </div>
</template>

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
