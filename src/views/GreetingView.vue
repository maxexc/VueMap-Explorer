<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import IButton from '@/components/IButton/IButton.vue'
import { ref, onMounted } from 'vue'

const isPageVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isPageVisible.value = true
  }, 50)
})
</script>

<template>
  <BaseLayout>
    <transition name="fade-slide" appear>
      <div
        v-if="isPageVisible"
        class="text-center bg-backgroundMain bg-opacity-70 backdrop-blur-md rounded-3xl p-5"
      >
        <transition name="fade" appear>
          <img class="inline mb-4 h-440:mb-6" src="assets/img/map-pin.svg" alt="" />
        </transition>
        <transition name="fade-slide" appear>
          <h1 class="font-bold m-auto w-fit text-2xl h-440:text-4xl mb-4 h-440:mb-7 text-accent">
            VueMap platform
          </h1>
        </transition>
        <transition name="fade" appear>
          <p class="leading-6 mb-6 h-440:mb-11 h-440:text-lg text-textSecondary">
            An advanced yet intuitive 3D mapping platform designed for everything from small
            personal trips to large-scale route management.
            <br />
            Easily mark, share, and manage your routes and points with a user-friendly interface.
          </p>
        </transition>
        <transition name="fade-slide" appear>
          <IButton :to="'/auth/registration'">Get Started</IButton>
        </transition>
      </div>
    </transition>
  </BaseLayout>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease-out;
}
.fade-slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.fade-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
