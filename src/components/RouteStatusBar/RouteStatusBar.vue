<script setup>
import CrossIcon from '@/components/icons/CrossIcon.vue'

const props = defineProps({
  isMobile: { type: Boolean, default: false },
  onFitRoute: { type: Function, required: true },
  onRemoveRoute: { type: Function, required: true },
  routeIcon: { type: String, default: '📍' } // откуда берём иконку маршрута
})
</script>

<template>
  <!-- Обёртка для “Route is loaded” -->
  <div
    class="safe-bottom flex items-center space-x-1 px-[2px] lg:px-6 my-[3px] sm:mb-1 lg:mb-2"
    :style="isMobile ? 'height:20px' : 'height:35px'"
  >
    <div class="w-[10px] sm:w-3 h-[10px] sm:h-3 rounded-full bg-[#91ffc8] text-xs shadow-md"></div>
    <button
      v-button-animation
      class="group inline-flex items-center ring-1 ring-white rounded-md shadow-md text-xs sm:text-sm lg:text-base text-black font-medium transition-all duration-300 ease-in-out"
      @click="onFitRoute"
      title="Click to zoom map to the entire route"
    >
      <span
        class="bg-[#cdffe6] flex content-center items-center gap-[2px] group-hover:bg-[#a7fcd1] transition-all duration-300 ease-in-out py-[1px] sm:py-[2px] px-[3px] lg:px-2 rounded-md"
      >
        Route
        <span class="pb-[2px] flex content-center items-center">{{ routeIcon }}</span>
        is loaded
      </span>
    </button>
    <CrossIcon
      v-button-animation
      class="w-4 h-4 text-textSecondary hover:text-red-600 font-bold lg:w-5 lg:h-5 cursor-pointer stroke-[3px]"
      @click="onRemoveRoute"
    />
  </div>
</template>

<style>
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
