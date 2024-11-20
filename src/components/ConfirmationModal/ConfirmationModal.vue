<script setup>
import IButton from '../IButton/IButton.vue'
import IModal from '../IModal/IModal.vue'

defineProps({
  title: {
    default: '',
    type: String
  },
  isLoading: {
    default: false,
    type: Boolean
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  // hasError: {
  //   type: Boolean,
  //   default: false
  // },
  errorMessage: {
    default: '',
    type: String
  }
})

const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
  <IModal :is-show="isOpen" @close="emit('cancel')">
    <div class="my-4 text-center text-base lg:text-lg">
      {{ title }}
    </div>
    <div class="flex gap-3 justify-center">
      <IButton variant="modal-confirm" @click="emit('cancel')">Cancel</IButton>
      <IButton variant="gradient" :is-loading="isLoading" @click="emit('confirm')">Delete</IButton>
    </div>
    <transition name="fade-slide">
      <div
        v-if="errorMessage"
        class="text-red-500 text-xs sx:text-base text-center font-semibold mt-2 sx:mt-[2px] -mb-6 sx:mb-[-26px]"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </IModal>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
