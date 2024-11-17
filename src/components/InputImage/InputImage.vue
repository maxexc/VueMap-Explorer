<script setup>
import { ref, watch } from 'vue'
import UploadIcon from './UploadIcon.vue'

const emit = defineEmits(['uploaded'])
const errorMessage = ref('')

const props = defineProps({
  resetError: {
    default: false,
    type: Boolean
  }
})

const handleUpLoading = (event) => {
  const file = event.target.files[0]
  console.log('file.size in bytes: ', file.size)

  if (file.size > 3 * 1024 * 1024) {
    errorMessage.value = 'File size is too large - max 3Mb'
    return
  }

  const fileReader = new FileReader()

  fileReader.readAsDataURL(file)

  fileReader.onload = () => {
    errorMessage.value = ''
    emit('uploaded', fileReader.result)
  }
}

watch(
  () => props.resetError,
  (newVal) => {
    if (newVal) {
      errorMessage.value = ''
    }
  }
)
</script>

<template>
  <div>
    <label class="cursor-pointer hover:text-primary">
      <input type="file" accept="image/*" class="hidden" @change="handleUpLoading" />
      <span class="flex gap-2 items-center">
        <UploadIcon />
        <span class="underline text-xs"><slot></slot></span>
      </span>
    </label>
    <transition name="fade-slide">
      <div
        v-if="errorMessage"
        class="text-red-500 mb-[-17.6px] lg:mb-[-19.2px] text-[11px] lg:text-[12px] text-center sx:text-left"
      >
        {{ errorMessage }}
      </div>
    </transition>
  </div>
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
