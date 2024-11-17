<script setup>
import { computed, reactive, watch } from 'vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import IInput from '../IInput/IInput.vue'
import IModal from '../IModal/IModal.vue'
import InputImage from '../InputImage/InputImage.vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  },
  isLoading: {
    default: false,
    type: Boolean
  },
  hasError: {
    default: false,
    type: Boolean || String
  },
  errorMessage: {
    default: '',
    type: String
  }
})

const emit = defineEmits(['close', 'submit'])
const formData = reactive({
  title: '',
  description: '',
  img: ''
})

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.img = ''
}

const uploadText = computed(() => {
  return formData.img ? 'Click here to change photo' : 'Click here to add a photo'
})

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      resetForm()
    }
  }
)

const handleUpload = (url) => {
  formData.img = url
}
</script>

<template>
  <IModal :is-show="isOpen" @close="emit('close')" class="">
    <form @submit.prevent="emit('submit', formData, resetForm)" class="w-full sx:px-4">
      <div
        class="flex gap-2 justify-center items-center font-bold text-center mb-5 sx:mb-3 lg:mb-8"
      >
        <MarkerIcon />Add marker
      </div>
      <IInput
        label="Location"
        class="mb-3 sm:mb-[14px] max-h-screen lg:mb-5"
        required
        v-model="formData.title"
      />
      <IInput
        label="Description"
        type="textarea"
        class="lg:mb-5 sm:mb-3 mb-3"
        v-model="formData.description"
      />
      <div class="relative flex gap-3 items-center pb-2 lg:mb-5 mb-3">
        <img
          v-if="formData.img"
          :src="formData.img"
          alt="Preview"
          :key="formData.img"
          class="absolute w-12 h-12 lg:w-14 lg:h-14 object-cover transition-transform duration-300 scale-in"
          style="left: 0"
        />
        <InputImage
          :style="{
            transition: 'margin-left 0.3s ease',
            marginLeft: formData.img ? '60px' : '0px'
          }"
          @uploaded="handleUpload"
          >{{ uploadText }}</InputImage
        >
      </div>

      <IButton class="w-full" variant="modal" :is-loading="props.isLoading">Add point</IButton>

      <transition name="fade-slide">
        <div
          v-if="props.hasError && props.errorMessage"
          class="text-red-500 text-xs sx:text-base text-center font-semibold mt-2 sx:mt-[2px] -mb-6 sx:mb-[-26px]"
        >
          {{ props.errorMessage }}
        </div>
      </transition>
    </form>
  </IModal>
</template>

<style scoped>
.scale-in {
  animation: scaleIn 0.3s ease forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

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
