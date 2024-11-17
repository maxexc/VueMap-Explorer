<script setup>
import { authService } from '@/api/authService'
import LoginForm from '@/components/Auth/LoginForm/LoginForm.vue'
import { useMutation } from '@/composables/useMutation'
import { ref, watch } from 'vue'
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
  <transition name="fade" appear>
    <div class="relative">
      <LoginForm
        v-if="!isLoading"
        @submit="handleSubmit"
        :is-loading="isLoading"
        class="transition-all"
      />
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
