<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    default: 'primary',
    type: String,
    validator: (value) => {
      return ['primary', 'gradient', 'modal', 'modal-edit', 'modal-confirm', 'mobile'].includes(
        value
      )
    }
  },
  to: String,
  isLoading: {
    default: false,
    type: Boolean
  }
})

const bgStyle = computed(() => {
  switch (props.variant) {
    case 'gradient':
      return 'bg-gradient-to-r from-secondary to-primary text-white w-full rounded-xl py-2 lg:py-[11px] px-10 font-bold'
    case 'mobile':
      return 'bg-gradient-to-r from-secondary to-primary text-white w-full rounded-md lg:rounded-xl py-1 lg:py-2 px-1 lg:px-6 font-medium lg:font-bold'
    case 'modal':
      return 'bg-gradient-to-r from-secondary to-primary text-white w-full rounded-xl py-[6px] sx:py-2 px-10 font-medium lg:font-bold '
    case 'modal-edit':
      return 'bg-gradient-to-r from-secondary to-primary text-white w-full rounded-xl py-[6px] lg:py-[11px] px-10 font-medium lg:font-bold'
    case 'modal-confirm':
      return ' bg-white text-primary border-2 border-secondary w-full rounded-xl py-[6px] lg:py-[9px] px-[38px] font-bold hover:text-primary hover:border-buttonPrimary'
    default:
      return 'bg-buttonPrimary text-white max-w-48 rounded-xl py-2 lg:py-[11px] px-10 font-bold'
  }
})

const isLink = computed(() => !!props.to)
const componentName = computed(() => (isLink.value ? RouterLink : 'button'))
const link = computed(() => (isLink.value ? props.to : null))
</script>

<template>
  <componentName :is="componentName" :to="link" class="flex justify-center">
    <button
      v-button-animation
      class="js-animated-button tracking-wider shadow-md transition-all duration-200 hover:shadow-lg hover:text-accent"
      :class="bgStyle"
    >
      <template v-if="props.isLoading">Loading...</template>
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
}

.hover\:shadow-lg:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.transition-all {
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}
</style>
