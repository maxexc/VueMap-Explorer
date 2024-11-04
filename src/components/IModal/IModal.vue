<script setup>
import { onMounted, onUnmounted, Teleport } from 'vue'
import CrossIcon from '../icons/CrossIcon.vue'

const emit = defineEmits(['close'])

const closeOnEscape = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

const disableScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollbarWidth}px`
}

const enableScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

onMounted(() => {
  disableScroll()
  window.addEventListener('keydown', closeOnEscape)
})

onUnmounted(() => {
  enableScroll()
  window.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="flex w-full h-full fixed p-5 top-0 left-0 overflow-auto bg-[rgba(0,0,0,0.3)]"
      @click.self="emit('close')"
    >
      <div
        class="relative bg-white w-full sm:max-w-[500px] m-auto p-5 sm:p-10 text-black rounded-2xl"
      >
        <button class="absolute right-4 top-4 sm:right-6 sm:top-6">
          <CrossIcon class="w-6 h-6 sm:w-7 sm:h-7" @click="emit('close')" />
        </button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
