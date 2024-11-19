<script setup>
import { ref } from 'vue'

const isFullscreen = ref(false)

const toggleFullscreen = () => {
  const element = document.documentElement
  if (!isFullscreen.value) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else {
      alert('Fullscreen is not supported on your browser.')
    }
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    isFullscreen.value = false
  }
}
</script>

<template>
  <button
    v-button-animation
    @click="toggleFullscreen"
    class="z-10 bg-white/80 backdrop-blur-[2px] rounded shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
    title="Toggle Fullscreen"
  >
    <svg
      v-if="!isFullscreen"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#5e5e5e"
      viewBox="-2 -2 36 36"
      stroke="#fff"
      stroke-width="1"
    >
      <path
        d="M11.148 17.988l-6.58 6.58-2.568-2.568c-1.105 0-2 0.895-2 2v6c0 1.105 0.894 2 2 2h6c1.105 0 2-0.895 2-2l-2.568-2.566 6.58-6.582-2.863-2.863zM30 0h-6c-1.105 0-2 0.895-2 2l2.568 2.568-6.58 6.58 2.863 2.863 6.58-6.579 2.568 2.567c1.105 0 2-0.895 2-2v-6c0-1.105-0.895-2-2-2zM30 22l-2.568 2.568-6.58-6.58-2.863 2.863 6.58 6.582-2.568 2.567c0 1.105 0.895 2 2 2h6c1.105 0 2-0.895 2-2v-6c0-1.105-0.895-2-2-2zM10 2c0-1.105-0.895-2-2-2h-6c-1.105 0-2 0.895-2 2v6c0 1.105 0.894 2 2 2l2.568-2.567 6.58 6.579 2.863-2.863-6.58-6.58 2.568-2.568z"
      ></path>
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      stroke="#5e5e5e"
      stroke-width="1"
      viewBox="-2 -2 36 36"
    >
      <path
        d="M11.148 17.988l-6.58 6.58-2.568-2.568c-1.105 0-2 0.895-2 2v6c0 1.105 0.894 2 2 2h6c1.105 0 2-0.895 2-2l-2.568-2.566 6.58-6.582-2.863-2.863zM30 0h-6c-1.105 0-2 0.895-2 2l2.568 2.568-6.58 6.58 2.863 2.863 6.58-6.579 2.568 2.567c1.105 0 2-0.895 2-2v-6c0-1.105-0.895-2-2-2zM30 22l-2.568 2.568-6.58-6.58-2.863 2.863 6.58 6.582-2.568 2.567c0 1.105 0.895 2 2 2h6c1.105 0 2-0.895 2-2v-6c0-1.105-0.895-2-2-2zM10 2c0-1.105-0.895-2-2-2h-6c-1.105 0-2 0.895-2 2v6c0 1.105 0.894 2 2 2l2.568-2.567 6.58 6.579 2.863-2.863-6.58-6.58 2.568-2.568z"
      ></path>
    </svg>
  </button>
</template>
