<script setup>
import { computed, ref } from 'vue'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import { useModal } from '@/composables/useModal'
import { useMutation } from '@/composables/useMutation'
import { updateFavoritePlaces } from '@/api/favorite-places'

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

const emit = defineEmits(['place-clicked', 'create', 'updated'])

const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal()

const {
  mutation: updatePlace,
  error: editPointError,
  isLoading
} = useMutation({
  mutationFn: (formData) => updateFavoritePlaces(formData),
  onSuccess: () => {
    closeEditModal()
    emit('updated')
  }
})

const selectedId = ref(null)
const selectedItem = computed(() => props.items.find((place) => place.id === selectedId.value))

const handleEditPlace = (id) => {
  editPointError.value = null
  selectedId.value = id
  openEditModal()
}

const handleSubmit = (formData) => {
  updatePlace(formData)
}
</script>

<template>
  <div class="px-3 sm:px-1 lg:px-6 text-black">
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
        :key="place.id"
        :title="place.title"
        :description="place.description"
        :coordinates="place.coordinates"
        :img="place.img"
        :is-active="place.id === props.activeId"
        @click="emit('place-clicked', place.id)"
        @edit="handleEditPlace(place.id)"
      />
    </slot>

    <slot></slot>
    <EditPlaceModal
      :is-open="isEditOpen"
      :place="selectedItem"
      :is-loading="isLoading"
      :error-message="editPointError"
      @close="closeEditModal"
      @submit="handleSubmit"
    />
  </div>
</template>
