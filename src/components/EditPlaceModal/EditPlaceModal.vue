<script setup>
import { computed, reactive, watch } from 'vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import IInput from '../IInput/IInput.vue'
import IModal from '../IModal/IModal.vue'
import fallbackImage from 'assets/img/Berlin.jpg'
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
  img: fallbackImage // fallbackImage ''
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
  <IModal :is-show="isOpen" @close="emit('close')">
    <form
      @submit.prevent="emit('submit', formData, resetForm)"
      class="w-full sm:min-w-[570px] lg:min-w-[700px]"
    >
      <div class="flex gap-2 items-center justify-center sx:justify-normal mb-2 sx:ml-[2px]">
        <MarkerIcon class="w-5" />
        <span class="font-bold text-base">Edit marker</span>
      </div>
      <div class="flex flex-wrap sx:flex-nowrap gap-3 sx:gap-5 justify-center">
        <div class="sx:w-[42%] m-auto">
          <img
            v-if="fallbackImage"
            :src="fallbackImage"
            :key="fallbackImage"
            class="scale-90 sx:scale-100 sm:w-[231px] lg:w-[286px] min-h-[195px] sm:h-[231px] lg:h-[286px] object-cover rounded-md"
            alt="place img"
          />
          <InputImage class="sx:hidden" @uploaded="handleUpload">
            <span class="text-[11px]"> Click here to change photo </span>
          </InputImage>
        </div>
        <div class="w-full max-h-screen sx:w-[58%]">
          <IInput label="Location" class="mb-2 lg:mb-3 max-h-screen" v-model="formData.title" />
          <IInput
            label="Description"
            type="textarea"
            class="mb-[18px] lg:mb-6 sm:h-[88px] lg:h-[119px]"
            v-model="formData.description"
          />
          <IButton class="w-full" variant="modal-edit" :is-loading="props.isLoading">
            Save
          </IButton>
        </div>
      </div>
    </form>
    <InputImage class="mt-2 hidden sx:block" @uploaded="handleUpload">
      <span class="text-[11px]"> Click here to change photo </span>
    </InputImage>
    <transition name="fade-slide">
      <div
        v-if="props.hasError && props.errorMessage"
        class="text-red-500 text-[14px] sx:text-base text-center font-semibold mt-1 sx:mt-[2px] sx:mb-[-26px] mb-[-26px]"
      >
        {{ props.errorMessage }} Test test test test test test test
      </div>
    </transition>
  </IModal>
</template>
