<script setup>
import { registerUser } from '@/api/user'
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
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

const handleRegisterUser = async (userData) => {
  isLoading.value = true
  try {
    // showSpinner()
    // await registerUser(userData).then((res) => console.log('User data: ', res.data))
    // router.replace('/map')
  } catch (error) {
    console.error(error)
  }
  // finally {
  //   hideSpinner()
  //   isLoading.value = false
  // }
}
</script>

<template>
  <RegistrationForm @submit="someAsyncAction" :is-loading="isLoading" />
</template>
