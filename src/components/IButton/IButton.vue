<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'outlined'].includes(value)
    }
  },
  to: String
})

const bgStyle = computed(() => {
  return props.variant === 'gradient'
    ? 'bg-gradient-to-r from-secondary to-primary'
    : 'bg-secondary'
})

const isLink = computed(() => !!props.to)
const componentName = computed(() => (isLink.value ? RouterLink : 'button'))
const link = computed(() => (isLink.value ? props.to : null))
</script>

<template>
  <componentName
    :is="componentName"
    :to="link"
    class="rounded-xl py-3 px-10 font-bold tracking-wider text-white overflow-hidden shadow-md transform transition duration-200 hover:shadow-lg active:scale-95"
    :class="bgStyle"
  >
    <slot></slot>
  </componentName>
</template>

<style scoped>
.componentName {
  transition:
    transform 0.1s ease,
    box-shadow 0.2s ease;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.active\:scale-95:active {
  transform: scale(0.7);
}
</style>
