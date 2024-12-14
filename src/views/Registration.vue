<script setup>
import { authService } from '@/api/authService'
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
import { useMutation } from '@/composables/useMutation'
import { useRouter } from 'vue-router'

const router = useRouter()

const {
  isLoading,
  error,
  mutation: handleRegister
} = useMutation({
  mutationFn: (data) => authService.register(data),
  onSuccess: () => router.replace('/map')
})
</script>

<template>
  <transition name="fade" appear>
    <div>
      <RegistrationForm @submit="handleRegister" :is-loading="isLoading" />
      <transition name="fade-slide">
        <div v-if="error" class="text-red-500 -mb-6 lg:mt-2 lg:-mb-8 text-center font-semibold">
          {{ error }}
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active {
  transition: all 0.5s ease-out;
}
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

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
