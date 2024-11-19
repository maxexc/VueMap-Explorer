<script setup>
import IButton from '../IButton/IButton.vue'
import IModal from '../IModal/IModal.vue'

defineProps({
  // title: {
  //   default: false,
  //   type: String
  // },
  isLoading: {
    default: false,
    type: Boolean
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    default: '',
    type: String
  }
})
// Are you sure you want to delete this marker?
</script>

<template>
  <IModal :is-show="false" class="" @close="emit('cancel')">
    <div class="my-4 text-center text-base lg:text-lg">
      Are you sure you want to delete this marker?
    </div>
    <div class="flex gap-3 justify-center">
      <IButton variant="modal-confirm">Cancel</IButton>
      <IButton variant="gradient">Delete</IButton>
    </div>
    <transition name="fade-slide">
      <div
        v-if="hasError && errorMessage"
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
