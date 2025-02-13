<script setup>
import fallbackImage from 'assets/img/marking_point.jpg'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  img: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="marker-card min-w-[124px]">
    <img
      class="relative min-w-full h-[100px] shrink-0 object-cover rounded-md"
      :src="props.img || fallbackImage"
      alt="Slider Image"
    />
    <div
      :class="{ 'border-b-2 border-[#9cffc5]': isActive }"
      class="absolute bottom-0 px-2 min-w-[124px] h-[18%] rounded-b-md w-[100%] text-black bg-white bg-opacity-50 backdrop-blur-lg"
    >
      <h3 class="-mt-1 truncate">{{ props.title }}</h3>
    </div>
  </div>
</template>
