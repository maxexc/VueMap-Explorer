<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center h-screen bg-white">
    <img
      src="src/assets/img/404.jpg"
      alt="Page Not Found"
      class="mx-auto max-w-2xl rounded-3xl shadow-lg"
    />
    <h1 class="text-5xl font-bold mt-5 text-[#2C3E50]">404</h1>
    <p class="text-xl mt-2 text-[#333333]">Page Not Found</p>
    <RouterLink :to="'/'">
      <div
        class="mt-5 bg-gradient-to-r from-secondary to-primary rounded-xl py-3 px-10 font-bold tracking-wider text-white overflow-hidden shadow-md transform transition duration-200 hover:shadow-lg active:scale-95"
      >
        Back to Home Page
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.active\:scale-95:active {
  transform: scale(0.7);
}
</style>
