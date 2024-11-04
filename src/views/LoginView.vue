<script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { hideSpinner, showSpinner } from '@/utils/spinnerControl'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

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

const handleSubmit = (userData) => {
  console.log('User data:', userData)
}
</script>

<template>
  <LoginForm @submit="someAsyncAction" :is-loading="isLoading" />
</template>
