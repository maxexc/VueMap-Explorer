<script setup>
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import { hideSpinner, showSpinner } from '@/utils/spinnerControl'
function someAsyncAction() {
  console.log('It is a spinner!')

  showSpinner()
  setTimeout(() => {
    hideSpinner()
  }, 3000)
}

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    required: true,
    type: [Number, null]
  }
})

const emit = defineEmits(['place-clicked'])
</script>

<template>
  <div class="px-3 sm:px-2 lg:px-6 text-black">
    <div class="text-grey mb-3 flex justify-between gap-2">
      <span class="block w-[83%] m-0 p-0">Added markers: </span>
      <IButton class="w-full" variant="gradient" @click="someAsyncAction"> Add new marker </IButton>
    </div>
    <slot name="label"></slot>
    <slot name="list">
      <div v-if="items.length === 0">List of markers is empty.</div>
      <FavoritePlace
        v-for="place in props.items"
        :key="place._id"
        :title="place.title"
        :description="place.description"
        :img="place.img"
        :is-active="place._id === props.activeId"
        @click="emit('place-clicked', place._id)"
      />
    </slot>

    <slot></slot>
  </div>
</template>
