<script setup>
import { register } from '@/api/user'
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
import { useMutation } from '@/composables/useMutation'
import { hideSpinner, showSpinner } from '@/utils/spinnerControl'
import { useRouter } from 'vue-router'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleRegister
} = useMutation({
  mutationFn: (data) => register(data).then((res) => console.log('Log data: ', res.data)),
  onSuccess: () => router.replace('/map')
})

function someAsyncAction() {
  console.log('It is a spinner!')

  isLoading.value = true
  showSpinner()
  setTimeout(() => {
    hideSpinner()
    isLoading.value = false
    router.replace('/map')
  }, 3000)
}
</script>

<template>
  <RegistrationForm @submit="someAsyncAction" :is-loading="isLoading" />
  <div v-if="error" class="text-red-500 mt-4 text-center font-semibold">{{ error }}</div>
</template>
