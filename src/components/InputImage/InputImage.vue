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

const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result

      img.onload = async () => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        // max 512x512
        const MAX_WIDTH = 512
        const MAX_HEIGHT = 512
        let width = img.width
        let height = img.height

        // Side ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        let quality = 0.9 // Set quality
        let dataUrl = canvas.toDataURL('image/jpeg', quality)

        // resize untill < 73 KB
        let base64Size =
          dataUrl.length * (3 / 4) - (dataUrl.endsWith('==') ? 2 : dataUrl.endsWith('=') ? 1 : 0)

        while (base64Size > 73 * 1024 && quality > 0.1) {
          quality -= 0.1
          dataUrl = canvas.toDataURL('image/jpeg', quality)
          base64Size =
            dataUrl.length * (3 / 4) - (dataUrl.endsWith('==') ? 2 : dataUrl.endsWith('=') ? 1 : 0)
        }

        resolve(dataUrl)
      }

      img.onerror = () => {
        reject('Error processing image')
        errorMessage.value = 'Error processing image'
      }
    }

    fileReader.readAsDataURL(file)
  })
}

const handleUpLoading = async (event) => {
  const file = event.target.files[0]
  console.log('file.size in bytes: ', file.size)

  if (file.size <= 73 * 1024) {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      emit('uploaded', fileReader.result)
    }
    fileReader.readAsDataURL(file)
    return
  }

  // max size 15 MB
  if (file.size > 15 * 1024 * 1024) {
    errorMessage.value = 'File size is too large - max 15MB'
    return
  }

  try {
    const resizedImage = await resizeImage(file)

    // Check base64
    const base64Size = Math.round(
      resizedImage.length * (3 / 4) -
        (resizedImage.endsWith('==') ? 2 : resizedImage.endsWith('=') ? 1 : 0)
    )

    console.log('Resized Base64 image size in bytes:', base64Size)
    console.log('Resized Base64 image size in KB:', base64Size / 1024)

    errorMessage.value = ''
    emit('uploaded', resizedImage)
  } catch (error) {
    errorMessage.value = 'Error processing image'
    console.error(error)
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
