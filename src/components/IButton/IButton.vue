<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'outlined'].includes(value)
    }
  },
  to: String,
  isLoading: {
    default: false,
    type: Boolean
  }
})

const bgStyle = computed(() => {
  return props.variant === 'gradient'
    ? 'bg-gradient-to-r from-secondary to-primary w-full'
    : 'bg-buttonPrimary max-w-48 '
})

const isLink = computed(() => !!props.to)
const componentName = computed(() => (isLink.value ? RouterLink : 'button'))
const link = computed(() => (isLink.value ? props.to : null))

onMounted(() => {
  // JS for iOS
  const button = document.querySelector('.js-animated-button')

  if (button) {
    button.addEventListener('touchstart', () => {
      button.style.transform = 'scale(0.75) translateZ(0)'
      button.style.transition = 'transform 0.1s ease'
    })

    button.addEventListener('touchend', () => {
      setTimeout(() => {
        button.style.transform = 'scale(1) translateZ(0)'
        button.style.transition = 'transform 0.1s ease'
      }, 100)
    })
  }
})
</script>

<template>
  <componentName :is="componentName" :to="link" class="flex justify-center">
    <button
      class="js-animated-button rounded-xl py-2 lg:py-[11px] px-10 font-bold tracking-wider text-white shadow-md transform transition-all duration-200 hover:shadow-lg hover:text-accent"
      :class="bgStyle"
    >
      <template v-if="props.isLoading">Loading...!</template>
      <template v-else>
        <slot></slot>
      </template>
    </button>
  </componentName>
</template>

<style scoped>
.componentName {
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  /* transition:
    transform 0.1s ease,
    box-shadow 0.2s ease; */
}

.hover\:shadow-lg:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.transition-all {
  transition-property: color, background-color, box-shadow, transform;
}

/* .active\:scale-95:active {
  transform: scale(0.7);
  -webkit-transform: scale(0.7);
} */
/* 
  class="rounded-xl py-2 lg:py-[11px] px-10 hover:text-accent font-bold tracking-wider text-white overflow-hidden shadow-md transform transition duration-200 hover:shadow-lg active:scale-75"
  */
</style>
