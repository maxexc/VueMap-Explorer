<script setup>
import IButton from '../components/IButton/IButton.vue'
</script>

<template>
  <main class="flex h-screen">
    <section class="flex-1 flex bg-primary justify-center items-center">
      <div class="text-white text-center px-5 max-w-[508px]">
        <img class="inline mb-6" src="../assets/img/map-pin.svg" alt="" />
        <h1 class="font-bold text-4xl mb-7">IT traveler</h1>
        <p class="leading-6 mb-11 text-lg">
          A simple and easy-to-use web application that lets you mark your favorite places, as well
          as those you'd love to visit. So don't wait — give it a try!
        </p>
        <IButton>Get Started</IButton>
      </div>
    </section>
    <section class="flex-1">
      <img class="h-full w-full object-cover" src="../assets/img/static-map.png" alt="" />
    </section>
  </main>
</template>
