<script setup>
import { computed, reactive } from 'vue'
import IButton from '../IButton/IButton.vue'
import MarkerIcon from '../icons/MarkerIcon.vue'
import IInput from '../IInput/IInput.vue'
import IModal from '../IModal/IModal.vue'
import InputImage from '../InputImage/InputImage.vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['close', 'submit'])
const formData = reactive({
  title: '',
  description: '',
  img: ''
})

const uploadText = computed(() => {
  return formData.img ? 'Click here to change photo' : 'Click here to add a photo'
})

const handleUpload = (url) => {
  formData.img = url
}
</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form @submit.prevent="emit('submit', formData)" class="min-w-[420px]">
      <div class="flex gap-2 justify-center items-center font-bold text-center mb-10">
        <MarkerIcon />Add marker
      </div>
      <IInput label="Location" class="mb-4" v-model="formData.title" />
      <IInput label="Description" type="textarea" class="mb-3" v-model="formData.description" />
      <div class="flex gap-3 items-center mb-10">
        <img v-if="formData.img" :src="formData.img" alt="Preview" class="w-8 h-8 object-cover" />
        <InputImage @uploaded="handleUpload">{{ uploadText }}</InputImage>
      </div>

      <IButton class="w-full" variant="gradient">Add point</IButton>
    </form>
  </IModal>
</template>
