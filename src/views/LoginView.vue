<script setup>
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'

const handleSubmit = (userData) => {
  console.log('User data:', userData)
}
</script>

<template>
  <LoginForm @submit="handleSubmit" />
</template>
