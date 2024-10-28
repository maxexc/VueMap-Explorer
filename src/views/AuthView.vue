<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <section class="max-w-[500px] w-full bg-white p-10 rounded-2xl">
      <h2 class=" text-center text-green-600">It`s AUTH PAGE</h2>
      <!-- <nav class="flex gap-11 justify-center mb-10 font-bold text-base">
        <RouterLink class="text-grey" exact-active-class="text-primary" to="registration">
          Create an account
        </RouterLink>
        <RouterLink class="text-grey" to="login" exact-active-class="text-primary">
          Sign In
        </RouterLink>
      </nav>
      <RouterView></RouterView> -->
    </section>
  </BaseLayout>
</template>
