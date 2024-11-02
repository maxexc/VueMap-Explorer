<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import IButton from '@/components/IButton/IButton.vue'
</script>

<template>
  <BaseLayout>
    <div class="text-center bg-backgroundMain bg-opacity-70 backdrop-blur-md rounded-3xl p-5">
      <img class="inline mb-4 h-440:mb-6" src="assets/img/map-pin.svg" alt="" />
      <h1 class="font-bold m-auto w-fit text-2xl h-440:text-4xl mb-4 h-440:mb-7 text-accent">
        IT traveler
      </h1>
      <p class="leading-6 mb-6 h-440:mb-11 h-440:text-lg text-textSecondary">
        A simple and easy-to-use web application that lets you mark your favorite places, as well as
        those you'd love to visit. So don't wait — give it a try!
      </p>
      <IButton :to="'/auth/registration'">Get Started</IButton>
    </div>
  </BaseLayout>
</template>
