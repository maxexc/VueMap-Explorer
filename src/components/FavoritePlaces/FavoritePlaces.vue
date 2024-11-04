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
  <div class="px-6">
    <div class="text-grey mb-4">Added markers</div>

    <slot name="label"></slot>
    <slot name="list">
      <FavoritePlace
        v-for="place in props.items"
        :key="place.id"
        :title="place.title"
        :description="place.description"
        :img="place.img"
        :is-active="place.id === props.activeId"
        @click="emit('place-clicked', place.id)"
      />
    </slot>

    <slot></slot>
    <IButton class="w-full mt-10" variant="gradient" @click="someAsyncAction"
      >Add new marker</IButton
    >
  </div>
</template>
