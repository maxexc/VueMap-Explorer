<script setup>
import { computed, ref, watch } from 'vue'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import { useModal } from '@/composables/useModal'
import { useMutation } from '@/composables/useMutation'
import { deleteFavoritePlaces, updateFavoritePlaces } from '@/api/favorite-places'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue'
import UserInfo from '../UserInfo/UserInfo.vue'

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
  },
  userInfo: {
    type: Object,
    default: null
  },
  isUserLoading: {
    type: Boolean,
    default: false
  },
  userError: {
    type: String,
    default: ''
  },
  onLogout: {
    type: Function,
    required: true
  },
  logoutData: {
    type: Object,
    default: null
  },
  isLogOutLoading: {
    type: Boolean,
    default: false
  },
  logoutError: {
    type: String,
    default: ''
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

const logoutMessage = computed(() => {
  if (props.logoutData) return props.logoutData.message
  if (props.logoutError) return props.logoutError
  return null
})

// Timer for userError, temporary
let errorTimeout = null

watch(
  () => props.userError,
  (newError) => {
    if (newError) {
      if (errorTimeout) clearTimeout(errorTimeout)

      errorTimeout = setTimeout(() => {
        emit('update:userError', '')
        errorTimeout = null
      }, 5000)
    }
  }
)
</script>

<template>
  <div class="bg-white rounded-lg px-3 sm:px-1 md:px-1 lg:px-6 shadow-md flex flex-col gap-0 mb-0">
    <div class="flex items-center justify-between gap-2 sm:gap-1 lg:gap-2">
      <UserInfo
        class="flex-grow max-w-[60%] sm:min-w-[50%] lg:min-w-[20%] lg:max-w-[70%]"
        :user-info="userInfo"
        :is-user-loading="isUserLoading"
        :user-error="userError"
        :onLogout="onLogout"
        :is-log-out-loading="isLogOutLoading"
      />
      <IButton
        class="bg-gray-100 min-w-[40%] sm:min-w-min text-white px-3 sm:px-1 lg:px-4 py-[5px] sm:py-[4px] lg:py-[6px] rounded-xl"
        variant="mobile"
        @click="emit('create')"
      >
        Add marker
      </IButton>
    </div>

    <div class="flex justify-between items-center h-[14px]">
      <span class="font-bold text-xs text-gray-800 flex items-center gap-1"> Added markers:</span>
      <div
        v-if="logoutMessage"
        class="text-xs font-semibold"
        :class="props.logoutData ? 'text-green-500' : 'text-red-500'"
      >
        {{ logoutMessage }}
      </div>
      <div v-if="userError" class="text-red-500 text-xs font-semibold">
        {{ userError }}
      </div>
    </div>
  </div>
  <div class="px-3 mt-[2px] sm:px-1 lg:px-6 text-black pb-[104px] h-full overflow-auto">
    <div
      v-if="isPlacesLoading"
      class="text-[12px] sx:text-base text-primary left-3 md:left-1 sm:left-1 lg:left-6 top-[-5px] sm:top-[14px] lg:top-[14px]"
    >
      Loading...
    </div>
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
