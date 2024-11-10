<script setup>
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    required: true,
    type: [String, Number, null]
  }
})

const emit = defineEmits(['place-clicked', 'create'])
</script>

<template>
  <div class="px-3 sm:px-2 lg:px-6 text-black">
    <div class="text-grey lg:mb-5 flex justify-between gap-1">
      <span class="block w-[63%] md:w-[70%] lg:w-[83%] m-0 p-0">Added markers: </span>
      <IButton class="w-full mb-3" variant="mobile" @click="emit('create')">
        Add new marker
      </IButton>
    </div>
    <slot name="label"></slot>
    <slot name="list">
      <div v-if="items.length === 0">List of markers is empty.</div>
      <FavoritePlace
        v-for="place in props.items"
        :key="place._id"
        :title="place.title"
        :description="place.description"
        :coordinates="place.coordinates"
        :img="place.img"
        :is-active="place._id === props.activeId"
        @click="emit('place-clicked', place._id)"
      />
    </slot>

    <slot></slot>
  </div>
</template>
