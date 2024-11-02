<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="flex h-440:flex-col h-440:gap-4 items-center justify-self-center h-440:justify-center gap-10 text-center h-screen pb-8 lg:w-full lg:bg-backgroundMain px-4 sm:px-8"
  >
    <img
      src="src/assets/img/404.jpg"
      alt="Page Not Found"
      class="mx-auto w-full max-w-[300px] h-auto h-440:max-w-xl rounded-3xl shadow-lg overflow-hidden object-cover"
    />

    <div class="mt-5 h-440:mt-0">
      <h1 class="text-4xl sm:text-5xl font-bold text-accent">404</h1>
      <p class="text-lg sm:text-xl mt-2 text-textSecondary">Page Not Found</p>
      <RouterLink :to="'/'">
        <div
          class="mt-5 bg-gradient-to-r from-secondary to-primary rounded-xl py-2 px-8 sm:py-3 sm:px-10 font-bold tracking-wider text-white shadow-md transform transition duration-200 hover:shadow-lg active:scale-95"
        >
          Back to Home Page
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.active\:scale-95:active {
  transform: scale(0.7);
}
</style>
