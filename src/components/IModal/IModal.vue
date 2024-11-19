<script setup>
import { onMounted, onUnmounted, Teleport } from 'vue'
import CrossIcon from '../icons/CrossIcon.vue'

const emit = defineEmits(['close'])

const props = defineProps({
  isShow: Boolean
})

// Switch off inheritAttrs
defineOptions({
  inheritAttrs: false
})

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
// min-w-[90vw] sx:min-w-[500px]
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-bind="$attrs"
        v-show="isShow"
        class="flex z-10 w-full h-full fixed p-4 sm:p-0 lg:p-5 top-0 left-0 overflow-auto bg-[rgba(0,0,0,0.3)] backdrop"
        @click.self="emit('close')"
      >
        <Transition name="modal">
          <div
            v-show="isShow"
            class="relative bg-white min-w-[90vw] sx:min-w-[280px] m-auto p-4 lg:p-8 pb-8 sm:pb-8 text-black rounded-2xl shadow-lg"
          >
            <button v-button-animation class="absolute right-2 top-2 lg:right-5 lg:top-5">
              <CrossIcon class="w-6 h-6 lg:w-7 lg:h-7" @click="emit('close')" />
            </button>
            <slot></slot>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.modal-enter-to,
.modal-leave-from {
  transform: scale(1);
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
