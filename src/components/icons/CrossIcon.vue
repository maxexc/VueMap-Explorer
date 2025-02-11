<script setup>
import { computed } from 'vue'

const props = defineProps({
  strokeWidth: {
    type: Number,
    default: 2
  }
})

const strokeStyle = computed(() => props.strokeWidth)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeStyle"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M21 7L7 21" />
    <path d="M7 7L21 21" />
  </svg>
</template>
