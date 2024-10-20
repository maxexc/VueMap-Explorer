<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'outlined'].includes(value)
    }
  }
})

const bgStyle = computed(() => {
  return props.variant === 'gradient'
    ? 'bg-gradient-to-r from-secondary to-primary'
    : 'bg-secondary'
})
</script>

<template>
  <button class="rounded-xl py-3 px-10 text-white font-bold tracking-wider" :class="bgStyle">
    <slot></slot>
  </button>
</template>
