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

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <section class="relative text-grey cursor-pointer mb-4 last:mb-0">
    <div class="flex gap-2 lg:gap-4 sm:gap-1">
      <img
        class="w-[76px] h-[76px] shrink-0 object-cover rounded-md"
        :src="props.img || fallbackImage"
        alt=""
      />
      <div class="w-full">
        <div class="flex justify-between items-center mb-1">
          <div class="flex justify-between items-center truncate">
            <h2
              class="truncate max-w-[156px] lg:min-w-[186px] lg:max-w-[186px] sm:max-w-[54px] md:max-w-[50px] gr:max-w-[68px] sm:text-[12px] md:text-[14px] lg:text-[15px] font-bold text-border sm:h-6"
            >
              {{ props.title }}
            </h2>
            <FavoritePlaceIconButton @click.stop="toggleCoordinates">
              <span class="text-base font-serif px-2 lg:px-2 sm:px-[2px] mt-[-2px]">i</span>
            </FavoritePlaceIconButton>
          </div>
          <div class="flex gap-4 lg:gap-4 md:gap-0 sm:gap-0">
            <FavoritePlaceIconButton @click="emit('edit')">
              <EditIcon />
            </FavoritePlaceIconButton>
            <FavoritePlaceIconButton @click.stop="emit('delete')">
              <DeleteIcon />
            </FavoritePlaceIconButton>
          </div>
        </div>
        <p class="text-xs line-clamp-3">
          {{ props.description }}
        </p>
      </div>
    </div>
    <transition-group class="absolute" name="fade-slide" tag="div">
      <p
        v-if="showCoordinates"
        class="text-[9px] md:text-[10px] lg:text-xs text-accent transition-opacity duration-300"
        key="coordinates"
      >
        lat: {{ props.coordinates[1].toFixed(6) }} lng: {{ props.coordinates[0].toFixed(6) }}
      </p>
    </transition-group>

    <div
      class="h-[1px] w-full mt-4"
      :class="{ 'bg-primary': props.isActive, 'bg-borderDivider': !props.isActive }"
    ></div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
