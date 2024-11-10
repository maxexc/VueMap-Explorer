<script setup>
import FavoritePlaceIconButton from './FavoritePlaceIconButton.vue'
import DeleteIcon from './DeleteIcon.vue'
import EditIcon from './EditIcon.vue'
import { ref } from 'vue'
import fallbackImage from 'assets/img/marking_point.jpg'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  img: String,
  coordinates: {
    required: true,
    type: Array
  },
  isActive: {
    required: true,
    type: Boolean
  }
})

const showCoordinates = ref(false)

const toggleCoordinates = () => {
  showCoordinates.value = !showCoordinates.value
}
</script>

<template>
  <section class="text-grey cursor-pointer mb-4 last:mb-0">
    <div class="flex gap-2 lg:gap-4 sm:gap-1">
      <img class="w-[76px] h-[76px] shrink-0" :src="props.img || fallbackImage" alt="" />
      <div class="w-full">
        <div class="flex justify-between items-center mb-2">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-border lg:max-w-none sm:max-w-[50px] sm:h-6 overflow-hidden">
              {{ props.title }}
            </h2>
            <FavoritePlaceIconButton @click="toggleCoordinates">
              <span class="text-base font-serif px-2 lg:px-2 sm:px-1">i</span>
            </FavoritePlaceIconButton>
          </div>
          <div class="flex gap-4 sm:gap-2">
            <FavoritePlaceIconButton><EditIcon /></FavoritePlaceIconButton>
            <FavoritePlaceIconButton><DeleteIcon /></FavoritePlaceIconButton>
          </div>
        </div>
        <p class="text-xs line-clamp-3">
          {{ props.description }}
        </p>
      </div>
    </div>
    <p v-if="showCoordinates" class="text-[10px] text-accent line-clamp-3">
      lng: {{ props.coordinates[0] }} lat: {{ props.coordinates[1] }}
    </p>

    <div
      class="h-[1px] w-full mt-2"
      :class="{ 'bg-primary': props.isActive, 'bg-borderDivider': !props.isActive }"
    ></div>
  </section>
</template>
