<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useRouteStore } from '@/stores/routeStore'
import { storeToRefs } from 'pinia'
import ISpinner from './components/ISpinner/ISpinner.vue'
import RouteStatusBar from './components/RouteStatusBar/RouteStatusBar.vue'
import { fitToCurrentRoute, removeRoute } from './services/routeService'

const route = useRoute()
const routeStore = useRouteStore()
const { isMobile, hasRoute, routeIcon } = storeToRefs(routeStore)

function updateIsMobile() {
  routeStore.setMobile(window.innerWidth < 640)
}

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
})

const isNotFoundPage = computed(() => route.name === 'NotFoundView')
const isMapPage = computed(() => route.name === 'Map')
</script>

<template>
  <main id="app">
    <ISpinner />
    <RouterView />
  </main>

  <footer
    :class="[
      'fixed bottom-[20px] lg:bottom-1 z-10 left-0 right-0 text-center mt-12 pointer-events-none',
      isNotFoundPage || isMapPage ? 'text-gray-600' : 'text-white sm:text-gray-600'
    ]"
  >
    <p class="text-sm z-10">&copy; Created by maxexc</p>
    <div class="pointer-events-auto">
      <RouteStatusBar
        v-if="hasRoute && isMobile && isMapPage"
        :isMobile="true"
        :routeIcon="routeIcon"
        :onFitRoute="fitToCurrentRoute"
        :onRemoveRoute="removeRoute"
        class="fixed z-[-1] bottom-[0px] right-5"
      />
    </div>
  </footer>
</template>

<style scoped>
#app {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
