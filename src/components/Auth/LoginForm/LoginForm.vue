<script setup>
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'
import FormContainer from '../FormContainer.vue'
import { reactive, toRaw } from 'vue'

const emit = defineEmits(['submit'])
const userData = reactive({
  email: '',
  password: ''
})
</script>

<template>
  <FormContainer @submit.prevent="emit('submit', toRaw(userData))">
    <IInput
      class="mb-4"
      label="Email Address"
      placeholder="email@gmail.com"
      type="email"
      v-model="userData.email"
      autocomplete="email"
      required
    />
    <IInput
      label="Password"
      type="password"
      v-model="userData.password"
      autocomplete="current-password"
      required
    />
    <IButton class="mt-10 w-full" variant="gradient" type="submit">Log In</IButton>
  </FormContainer>
</template>
