<script setup>
import IButton from '@/components/IButton/IButton.vue'
import IInput from '@/components/IInput/IInput.vue'
import { reactive, toRaw } from 'vue'
import FormContainer from '../FormContainer.vue'

const emit = defineEmits(['submit'])
const userData = reactive({
  name: '',
  email: '',
  password: ''
})
</script>

<template>
  <FormContainer @submit.prevent="emit('submit', toRaw(userData))">
    <IInput class="mb-4" label="Full Name" v-model="userData.name" required />
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
    <IButton class="mt-10 w-full" variant="gradient" type="submit">Create Account</IButton>
  </FormContainer>
</template>
