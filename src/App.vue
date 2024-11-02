<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isNotFoundPage = computed(() => route.name === 'NotFoundView')
console.log('isNotFoundPage: ', isNotFoundPage.value)
</script>

<template>
  <section class="fixed top-0 left-1 z-20">
    <nav class="flex gap-4">
      <strong>Current route path:</strong> {{ $route.fullPath }}
      <RouterLink class="underline" exact-active-class="text-blue-600" :to="'/'"
        >GreetingPage</RouterLink
      >
      <RouterLink class="underline" exact-active-class="text-blue-600" :to="'/map'"
        >MapPage</RouterLink
      >
    </nav>
  </section>
  <main>
    <RouterView />
  </main>

  <footer
    :class="[
      'fixed bottom-1 z-10 left-0 right-0 text-center mt-12 pointer-events-none',
      isNotFoundPage ? 'text-gray-600' : 'text-white sm:text-gray-600'
    ]"
  >
    <p class="text-sm">&copy; Created by maxexc</p>
  </footer>
</template>
