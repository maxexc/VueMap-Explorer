<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import AuthView from './views/AuthView.vue'
</script>

<template>
  <section class="fixed top-0 left-1">
    <nav class="flex gap-4">
      <strong>Current route path:</strong> {{ $route.fullPath }}
      <RouterLink class="underline" exact-active-class="text-blue-600" to="/VueMap-Explorer/"
        >GreetingPage</RouterLink
      >
      <RouterLink class="underline" exact-active-class="text-blue-600" to="/VueMap-Explorer/map"
        >MapPage</RouterLink
      >
    </nav>
  </section>
  <main>
    <RouterView />
  </main>
  <!-- <AuthView /> -->

  <footer class="fixed bottom-1 left-0 right-0 text-gray-600 text-center mt-12 pointer-events-none">
    <p class="text-sm">&copy; Created by maxexc</p>
  </footer>
</template>
