<script setup>
import { ref } from 'vue'
import HomepageView from './views/HomepageView.vue'
import CreateNewPlaceModal from './components/CreateNewPlaceModal/CreateNewPlaceModal.vue'

const isOpen = ref(true)
const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}
</script>

<template>
  <HomepageView />
  <button @click="openModal">Click modal</button>
  <CreateNewPlaceModal
    :is-open="isOpen"
    @close="closeModal"
    @submit="console.log"
  ></CreateNewPlaceModal>

  <footer class="fixed bottom-1 left-0 right-0 text-gray-600 text-center mt-12 pointer-events-none">
    <p class="text-sm">&copy; Created by maxexc</p>
  </footer>
</template>
