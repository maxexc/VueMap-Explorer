<script setup>
import { ref } from 'vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import IInput from '../IInput/IInput.vue'

const counter = ref(0) // { value: 0 }
const buttonVariant = ref('gradient')

const changeButtonVariant = () => {
  buttonVariant.value = buttonVariant.value === 'gradient' ? 'outlined' : 'gradient'
}

const increment = () => {
  counter.value += 1
  console.log(counter.value)
}
</script>

<template>
  <div class="px-6">
    <div class="text-grey mb-4">Added markers ({{ counter }}) style: ({{ buttonVariant }})</div>

    <slot name="list">
      <FavoritePlace v-for="n in 4" :key="n" />
    </slot>
    <IButton class="w-full mt-1" :variant="buttonVariant" @click="changeButtonVariant"
      >Change Btn Style</IButton
    >

    <IButton class="w-full mt-10" variant="gradient" @click="increment">Add new marker</IButton>
  </div>
</template>
