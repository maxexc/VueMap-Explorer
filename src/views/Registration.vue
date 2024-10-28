<script setup>
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'

const handleSubmit = (userData) => {
  console.log('User data:', userData)
}
</script>

<template>
  <RegistrationForm @submit="handleSubmit" />
</template>
