<script setup>
import { ref } from 'vue'
import UploadIcon from './UploadIcon.vue'

const emit = defineEmits(['uploaded'])
const errorMessage = ref('')

const handleUpLoading = (event) => {
  const file = event.target.files[0]

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
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>
