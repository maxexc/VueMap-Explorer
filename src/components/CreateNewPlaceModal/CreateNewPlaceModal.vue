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

const closeWithReset = () => {
  resetForm()
  emit('close')
}

const localErrorMessage = computed(() => props.errorMessage)

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
  <IModal v-if="props.isOpen" @close="closeWithReset">
    <form @submit.prevent="emit('submit', formData, resetForm)" class="w-full sm:min-w-[420px]">
      <div
        class="flex gap-2 justify-center items-center font-bold text-center mb-5 sm:mb-3 lg:mb-10"
      >
        <MarkerIcon />Add marker
      </div>
      <IInput label="Location" class="mb-3 lg:mb-4" required v-model="formData.title" />
      <IInput
        label="Description"
        type="textarea"
        class="mb-3 sm:mb-1 lg:mb-4"
        v-model="formData.description"
      />
      <div class="flex gap-3 items-center pb-2 mb-8 sm:mb-4 lg:mb-8">
        <img
          v-if="formData.img"
          :src="formData.img"
          alt="Preview"
          class="w-8 h-8 sm:w-12 sm:h-12 object-cover"
        />
        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>

      <IButton class="w-full" variant="modal" :is-loading="props.isLoading">Add point</IButton>
      <div
        v-if="props.hasError && props.errorMessage"
        class="text-red-500 text-center font-semibold mt-1"
      >
        {{ props.errorMessage }}
      </div>
    </form>
  </IModal>
</template>
