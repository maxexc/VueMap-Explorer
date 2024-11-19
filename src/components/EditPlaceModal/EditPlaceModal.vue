<script setup>
import { ref, reactive, watch, computed } from 'vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import IInput from '../IInput/IInput.vue'
import IModal from '../IModal/IModal.vue'
import fallbackImage from 'assets/img/marking_point.jpg'
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
  errorMessage: {
    default: '',
    type: String
  },
  place: Object
})

const emit = defineEmits(['close', 'submit'])
const resetError = ref(true)

const formData = reactive({
  id: '',
  title: '',
  description: '',
  img: '',
  coordinates: null
})

const flipCount = ref(0)
const backImage = ref('')

const isFlipped = computed(() => flipCount.value % 2 === 1)

const cardTransform = computed(() => {
  return `rotateY(${flipCount.value * 180}deg)`
})

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      formData.id = props.place.id || ''
      formData.title = props.place.title || ''
      formData.description = props.place.description || ''
      formData.img = props.place.img || fallbackImage
      formData.coordinates = props.place.coordinates || null
      flipCount.value = 0
      backImage.value = ''
      resetError.value = !resetError.value
    }
  },
  { immediate: true }
)

const handleChangeImg = (url) => {
  if (formData.img !== url) {
    backImage.value = isFlipped.value ? formData.img : url
    flipCount.value += 1
    resetError.value = false

    setTimeout(() => {
      formData.img = url
    }, 400)
  }
}
</script>

<template>
  <IModal :is-show="isOpen" @close="emit('close')">
    <form
      @submit.prevent="emit('submit', formData)"
      class="w-full sm:min-w-[570px] lg:min-w-[700px]"
    >
      <div class="flex gap-2 items-center justify-center sx:justify-normal mb-2 sx:ml-[2px]">
        <MarkerIcon class="w-5" />
        <span class="font-bold text-base">Edit marker</span>
      </div>
      <div class="flex flex-wrap sx:flex-nowrap gap-3 sx:gap-5 justify-center">
        <div class="sx:w-[42%] m-auto perspective">
          <div
            class="card relative w-full h-full scale-90 sx:scale-100 min-w-64 sx:min-w-[195px] sm:w-[231px] lg:w-[286px] min-h-64 sx:min-h-[195px] sm:h-[231px] lg:h-[286px]"
            :style="{ transform: cardTransform }"
          >
            <img
              v-if="formData.img"
              :src="formData.img || fallbackImage"
              class="card-face absolute w-full h-full object-cover rounded-md"
              alt="front image"
            />
            <img
              v-if="backImage"
              class="card-face card-back object-cover rounded-md"
              :src="backImage"
              alt="back image"
            />
          </div>
          <InputImage :reset-error="resetError" class="sx:hidden" @uploaded="handleChangeImg">
            <span class="text-[11px]"> Click here to change photo </span>
          </InputImage>
        </div>
        <div class="w-full max-h-screen sx:w-[58%]">
          <IInput label="Location" class="mb-2 lg:mb-3 max-h-screen" v-model="formData.title" />
          <IInput
            label="Description"
            type="textarea"
            class="mb-[18px] lg:mb-6 sx:max-h-[58px] sm:min-h-[88px] lg:min-h-[119px]"
            v-model="formData.description"
          />
          <IButton class="w-full" variant="modal-edit" :is-loading="isLoading"> Save </IButton>
        </div>
      </div>
    </form>
    <InputImage :reset-error="resetError" class="mt-2 hidden sx:block" @uploaded="handleChangeImg">
      <span class="text-[11px]"> Click here to change photo </span>
    </InputImage>
    <transition name="fade-slide">
      <div
        v-if="errorMessage"
        class="text-red-500 text-[14px] sx:text-base text-center font-semibold mt-1 sx:mt-[2px] sx:mb-[-26px] mb-[-26px]"
      >
        {{ props.errorMessage }}
      </div>
    </transition>
  </IModal>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

.card {
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
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
