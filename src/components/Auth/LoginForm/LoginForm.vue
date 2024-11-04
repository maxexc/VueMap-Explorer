<script setup>
import { reactive, ref, toRaw } from 'vue'
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'

const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean
  }
})
const emit = defineEmits(['submit'])
const userData = reactive({
  email: '',
  password: ''
})
const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput
      class="mb-3 lg:mb-3 lg:text-lg"
      label="Email Address"
      placeholder="email@gmail.com"
      type="email"
      v-model="userData.email"
      autocomplete="email"
      required
    />
    <div class="relative">
      <IInput
        label="Password"
        class="lg:text-lg"
        :type="showPassword ? 'text' : 'password'"
        v-model="userData.password"
        autocomplete="current-password"
        required
      />
      <button
        @click="togglePasswordVisibility"
        type="button"
        class="absolute bottom-[7px] lg:bottom-[9px] right-0 pr-3 flex items-center transition-opacity"
        :class="showPassword ? 'opacity-100' : 'opacity-50'"
      >
        <component :is="showPassword ? EyeIcon : EyeOffIcon" />
      </button>
    </div>
    <IButton
      class="mt-8 lg:mt-9 w-full"
      variant="gradient"
      type="submit"
      :is-loading="props.isLoading"
      >Sign In</IButton
    >
  </form>
</template>
