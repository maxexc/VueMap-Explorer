<script setup>
import { authService } from '@/api/authService'
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { useMutation } from '@/composables/useMutation'
import { useRouter } from 'vue-router'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleSubmit
} = useMutation({
  mutationFn: (data) => authService.login(data),
  onSuccess: () => router.push('/map')
})
</script>

<template>
  <div class="relative">
    <LoginForm @submit="handleSubmit" :is-loading="isLoading" />
    <div v-if="error" class="text-red-500 mt-4 text-center font-semibold">
      {{ error }}
    </div>
  </div>
</template>
