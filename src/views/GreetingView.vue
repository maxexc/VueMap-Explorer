<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import IButton from '@/components/IButton/IButton.vue'
import { BASE } from '@/router/index.js'
console.log('GreetingView BASE', BASE)
</script>

<template>
  <BaseLayout>
    <div class="text-center">
      <img class="inline mb-6" src="assets/img/map-pin.svg" alt="" />
      <h1 class="font-bold text-4xl mb-7">IT traveler</h1>
      <p class="leading-6 mb-11 text-lg">
        A simple and easy-to-use web application that lets you mark your favorite places, as well as
        those you'd love to visit. So don't wait — give it a try!
      </p>
      <IButton :to="`${BASE}/auth/registration`">Get Started</IButton>
    </div>
  </BaseLayout>
</template>
