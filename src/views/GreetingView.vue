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
            IT traveler
          </h1>
        </transition>
        <transition name="fade" appear>
          <p class="leading-6 mb-6 h-440:mb-11 h-440:text-lg text-textSecondary">
            A simple and easy-to-use web application that lets you mark your favorite places, as
            well as those you'd love to visit. So don't wait — give it a try!
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

/* Анимация плавного появления */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
