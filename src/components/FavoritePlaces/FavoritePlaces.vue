<script setup>
import { computed, ref } from 'vue'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import { useModal } from '@/composables/useModal'
import { useMutation } from '@/composables/useMutation'
import { deleteFavoritePlaces, updateFavoritePlaces } from '@/api/favorite-places'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'

const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    required: true,
    type: [String, Number, null]
  },
  isPlacesLoading: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['place-clicked', 'create', 'updated'])

const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal()
const {
  isOpen: isConfirmationModalOpen,
  openModal: openConfirmationModal,
  closeModal: closeConfirmationModal
} = useModal()

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

const {
  mutation: deletePlace,
  error: deleteError,
  isLoading: isDeleting
} = useMutation({
  mutationFn: (id) => deleteFavoritePlaces(id),
  onSuccess: () => {
    closeConfirmationModal()
    idItemToDelete.value = null
    emit('updated')
  },
  onError: () => {}
})

const selectedId = ref(null)
const selectedItem = computed(() => props.items.find((place) => place.id === selectedId.value))
const idItemToDelete = ref(null)

const handleEditPlace = (id) => {
  editPointError.value = null
  selectedId.value = id
  openEditModal()
}

const handleSubmit = (formData) => {
  updatePlace(formData)
}

const hadleOpenConfirmationModal = (id) => {
  idItemToDelete.value = id
  openConfirmationModal()
}

const handleDeletePlace = () => {
  deletePlace(idItemToDelete.value)
}
</script>

<template>
  <div class="px-3 sm:px-1 lg:px-6 text-grey flex justify-between gap-1">
    <span class="block w-[63%] md:w-[70%] lg:w-[83%] m-0 p-0">Added markers: </span>
    <IButton class="w-full mb-2 sm:mb-3 md:mb-1" variant="mobile" @click="emit('create')">
      Add new marker
    </IButton>
  </div>
  <div
    class="px-3 sm:px-1 lg:px-6 pb-[104px] text-black h-full overflow-y-auto relative"
    style="height: 100%; touch-action: auto"
  >
    <slot name="label"></slot>
    <slot name="list">
      <div v-if="items.length === 0 && !isPlacesLoading">List of markers is empty.</div>
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
        @delete="hadleOpenConfirmationModal(place.id)"
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

    <ConfirmationModal
      :is-open="isConfirmationModalOpen"
      :is-loading="isDeleting"
      :error-message="deleteError"
      @cancel="closeConfirmationModal"
      @confirm="handleDeletePlace"
      title="Are you sure you want to delete this marker?"
    />
  </div>
</template>
