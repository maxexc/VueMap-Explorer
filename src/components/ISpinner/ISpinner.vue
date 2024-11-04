<script setup>
import { visible } from '@/utils/spinnerControl'
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 bg-[rgba(0,0,0,0.1)] flex items-center justify-center z-50"
    >
      <div class="spinner"></div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.spinner {
  width: 60px;
  height: 60px;
  position: relative;
  display: inline-block;
  border-top: 4px solid #f3743d;
  border-right: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-sizing: border-box;
}

.spinner::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-left: 4px solid #ffa279;
  border-bottom: 4px solid transparent;
  animation: spin 0.5s linear infinite reverse;
  box-sizing: border-box;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
