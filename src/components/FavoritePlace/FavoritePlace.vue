<script setup>
import FavoritePlaceIconButton from './FavoritePlaceIconButton.vue'
import DeleteIcon from './DeleteIcon.vue'
import EditIcon from './EditIcon.vue'
import fallbackImage from 'assets/img/marking_point.jpg'
import { ref } from 'vue'

const props = defineProps({
  id: {
    required: true,
    type: [String, Number]
  },
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  img: {
    default: null,
    type: String
  },
  coordinates: {
    required: true,
    type: Array
  },
  isActive: {
    required: true,
    type: Boolean
  },
  layout: {
    type: String, // 'default'/'slider'/'vertical'
    default: 'default'
  }
})

const showCoordinates = ref(false)

const toggleCoordinates = () => {
  showCoordinates.value = !showCoordinates.value
}

const emit = defineEmits(['place-clicked', 'edit', 'delete'])
</script>

<template>
  <section
    :class="[
      { 'border-b-[3px] border-[#9cffc5]': isActive },
      layout === 'vertical' ? 'default-card' : 'marker-card'
    ]"
    class="relative text-grey cursor-pointer pb-[17px] last:mb-0 z-1"
  >
    <div
      :class="[
        'flex w-full gap-2 lg:gap-2 sm:gap-[2px]',
        layout === 'vertical' ? '' : 'pl-[2px] pt-[2px]'
      ]"
    >
      <img
        class="w-[76px] h-[76px] shrink-0 object-cover rounded-md"
        :src="img || fallbackImage"
        alt=""
      />
      <div class="flex flex-col w-full overflow-hidden">
        <div class="flex justify-between items-center mb-1">
          <div class="flex-1 min-w-0 overflow-hidden">
            <h2
              class="font-bold text-border whitespace-nowrap overflow-hidden text-ellipsis truncate sm:text-[12px] md:text-[14px] lg:text-[15px]"
            >
              {{ title }}
            </h2>
          </div>
          <div
            class="flex lg:mt-1 gap-3 lg:gap-3 md:gap-0 sm:gap-0 scale-100 sm:scale-[85%] md:scale-100 lg:scale-110 pr-[6px] sm:pr-0 md:pr-[2px] lg:pr-[6px]"
          >
            <FavoritePlaceIconButton @click.stop="toggleCoordinates">
              <span class="text-base font-serif pl-1 lg:px-2 sm:pl-1">i</span>
            </FavoritePlaceIconButton>
            <FavoritePlaceIconButton @click="$emit('edit', { id })">
              <EditIcon />
            </FavoritePlaceIconButton>
            <FavoritePlaceIconButton @click.stop="$emit('delete', { id })">
              <DeleteIcon />
            </FavoritePlaceIconButton>
          </div>
        </div>
        <p class="text-xs line-clamp-3">{{ description }}</p>
      </div>
    </div>
    <transition-group class="absolute left-2 bottom-[2px] lg:bottom-0" name="fade-slide" tag="div">
      <p
        v-if="showCoordinates"
        class="text-[10px] sm:text-[9px] md:text-[10px] lg:text-xs text-accent transition-opacity duration-300"
        key="coordinates"
      >
        lat: {{ coordinates[1].toFixed(6) }}, lng: {{ coordinates[0].toFixed(6) }}
      </p>
    </transition-group>
  </section>
</template>

<style scoped>
.default-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

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
