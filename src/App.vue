<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import ISpinner from './components/ISpinner/ISpinner.vue'

const route = useRoute()

const isNotFoundPage = computed(() => route.name === 'NotFoundView')
const isMapPage = computed(() => route.name === 'Map')
</script>

<template>
  <main>
    <ISpinner />
    <RouterView />
  </main>

  <footer
    :class="[
      'fixed bottom-[16px] lg:bottom-1 z-10 left-0 right-0 text-center mt-12 pointer-events-none',
      isNotFoundPage || isMapPage ? 'text-gray-600' : 'text-white sm:text-gray-600'
    ]"
  >
    <p class="text-sm">&copy; Created by maxexc</p>
  </footer>
</template>
