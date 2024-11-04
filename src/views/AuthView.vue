<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <section
      class="max-w-[500px] w-full bg-white bg-opacity-90 sm:bg-opacity-80 backdrop-blur-md p-5 lg:p-8 rounded-lg sm:rounded-2xl shadow-lg"
    >
      <nav class="flex gap-11 justify-center mb-6 lg:mb-8 font-bold text-base">
        <RouterLink
          class="text-grey md:text-lg"
          exact-active-class="text-primary"
          to="registration"
        >
          Create an account
        </RouterLink>
        <RouterLink class="text-grey md:text-lg" exact-active-class="text-primary" to="login">
          Sign In
        </RouterLink>
      </nav>
      <RouterView></RouterView>
    </section>
  </BaseLayout>
</template>
