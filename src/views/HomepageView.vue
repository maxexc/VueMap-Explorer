<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { MapboxMap, MapboxMarker, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl'
import { mapSettings } from '@/map/settings'
import 'mapbox-gl/dist/mapbox-gl.css'
import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import Toggle3DButton from '@/components/IButton/Toggle3DButton.vue'
import ResetZoomButton from '@/components/IButton/ResetZoomButton.vue'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import { addFavoritePlaces, getFavoritePlaces } from '@/api/favorite-places'
import { authService } from '@/api/authService'
import { useMutation } from '@/composables/useMutation'
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'
import FullScreenButton from '@/components/IButton/FullScreenButton.vue'
import { getUserInfo } from '@/api/user'
import SwiperSlider from '@/components/SwiperSlider/SwiperSlider.vue'
import VerticalSliderCard from '@/components/SwiperSlider/VerticalSliderCard.vue'
import { flyTo, initializeMap, set3DMode } from '@/services/mapService'

const router = useRouter()

const mapInstance = ref(null)
const is3DEnabled = ref(false)
const activeId = ref(null)
const mapMarkerLnglat = ref(null)
const markerClickedToRemove = ref(false)

const { isOpen, closeModal, openModal } = useModal()

const openModalWithErrorReset = () => {
  addNewMarkerError.value = null
  openModal()
}

const {
  data: newData,
  mutation: getPlaces,
  isLoading: isPlacesLoading
} = useMutation({
  mutationFn: () => getFavoritePlaces()
})

const favoritePlaces = computed(() => newData.value ?? [])

const handleMapClick = (event) => {
  const { lngLat } = event

  if (markerClickedToRemove.value) {
    markerClickedToRemove.value = false
    return
  }

  mapMarkerLnglat.value = [lngLat.lng, lngLat.lat]
}

const handleMapLoad = (map = null) => {
  mapInstance.value = map

  initializeMap(map)
}

const toggle3D = () => {
  is3DEnabled.value = !is3DEnabled.value

  if (mapInstance.value) {
    set3DMode(mapInstance.value, is3DEnabled.value)
  }
}

const changeActiveId = (id) => {
  if (activeId.value !== id) {
    activeId.value = id
    const place = favoritePlaces.value.find((place) => place.id === id)
    if (place) {
      flyTo(mapInstance.value, place.coordinates)
    }
  }
}

const changePlace = (id) => {
  changeActiveId(id)
}

const {
  mutation: addPlace,
  isLoading: isAddingPlace,
  error: addNewMarkerError
} = useMutation({
  mutationFn: (newPlaceData) => addFavoritePlaces(newPlaceData),
  onSuccess: () => {
    closeModal()
    mapMarkerLnglat.value = null
    getPlaces()
  }
})

const handleAddPlace = async (formData) => {
  if (!mapMarkerLnglat.value || mapMarkerLnglat.value.length === 0) {
    addNewMarkerError.value = 'Please add the marker on the map before adding.'
    return
  }

  const body = {
    ...formData,
    coordinates: mapMarkerLnglat.value
  }

  await addPlace(body)
}

const {
  data: userInfoData,
  isLoading: isUserLoading,
  error: userError,
  mutation: getUser
} = useMutation({
  mutationFn: () => getUserInfo()
})

const {
  data: logOutData,
  isLoading: isLogOutLoading,
  error: logOutError,
  mutation: logOut
} = useMutation({
  mutationFn: () => authService.logout(),
  onError: () => {
    favoritePlaces.value = []
    router.replace('/auth')
  },
  onSuccess: () => {
    router.replace('/auth')
  }
})

const removeMarker = () => {
  markerClickedToRemove.value = true
  mapMarkerLnglat.value = null
}

onMounted(() => {
  getUser()
  if (!authService.isLoggedIn()) {
    console.warn('User is not authenticated. Redirecting to login page.')
    router.replace('/auth')
    return
  } else {
    getPlaces()
  }
})

const isMobile = ref(window.innerWidth < 640)

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  window.addEventListener('resize', updateIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
})
</script>
<template>
  <section class="relative h-[100vh] overflow-auto">
    <SwiperSlider
      v-if="isMobile"
      :markers="favoritePlaces"
      :activeMarkerId="activeId"
      :is-mobile="isMobile"
      @marker-selected="changeActiveId"
      :card-component="VerticalSliderCard"
    />
    <main
      class="flex min-h-screen sm:mt-0 flex-col-reverse sm:flex-row"
      :class="isMobile && favoritePlaces.length > 0 ? '-mt-[104px]' : 'mt-0'"
      style="touch-action: auto"
    >
      <div
        id="favorites-container"
        class="relative h-[26.1vh] bg-white sm:h-[100.1vh] md:w-[24%] sm:w-[28%] lg:w-[400px] pt-1 lg:pt-2 shrink-0 flex flex-col"
      >
        <FavoritePlaces
          v-bind:is-mobile="isMobile"
          v-model:userError="userError"
          :items="favoritePlaces"
          :active-id="activeId"
          :is-places-loading="isPlacesLoading"
          @place-clicked="changePlace"
          @create="openModalWithErrorReset"
          @updated="getPlaces"
          :user-info="userInfoData"
          :is-user-loading="isUserLoading"
          :user-error="userError"
          :on-logout="logOut"
          :logout-data="logOutData"
          :is-log-out-loading="isLogOutLoading"
          :logout-error="logOutError"
        />
        <CreateNewPlaceModal
          :isOpen="isOpen"
          :is-loading="isAddingPlace"
          :has-error="Boolean(addNewMarkerError)"
          :error-message="addNewMarkerError"
          @close="closeModal"
          @submit="handleAddPlace"
        ></CreateNewPlaceModal>
        <div
          v-if="refreshError"
          class="text-red-500 h-[5vh] mb-5 sm:mb-0 text-center font-semibold"
        >
          {{ refreshError }}
        </div>
      </div>

      <div
        class="relative w-full sm:mt-0 h-[74vh] sm:h-[100vh] flex-grow flex items-center justify-center text-6xl pb-[2px]"
      >
        <MapboxMap
          id="map"
          class="w-full h-full relative"
          :center="[13.376481, 52.509663]"
          :zoom="10"
          :access-token="mapSettings.apiToken"
          :map-style="mapSettings.style"
          :projection="mapSettings.projection"
          @mb-click="handleMapClick"
          v-on:mb-created="handleMapLoad"
        >
          <MapboxMarker
            v-if="mapMarkerLnglat"
            :lngLat="mapMarkerLnglat"
            anchor="bottom"
            class="cursor-pointer"
          >
            <button v-button-animation class="existing-marker" @click="removeMarker">
              <MarkerIcon :isDefault="true" />
            </button>
          </MapboxMarker>
          <MapboxMarker
            v-for="place in favoritePlaces"
            :key="place.id"
            :lngLat="place.coordinates"
            anchor="bottom"
          >
            <button
              v-button-animation
              class="existing-marker"
              @click.stop="changeActiveId(place.id)"
            >
              <MarkerIcon :isActive="place.id === activeId" />
            </button>
          </MapboxMarker>
          <MapboxNavigationControl position="bottom-right" :showZoom="false" :showCompass="true" />
          <ResetZoomButton class="absolute" :mapInstance="mapInstance" :defaultZoom="10" />
          <Toggle3DButton class="absolute" :is3DEnabled="is3DEnabled" @toggle3D="toggle3D" />
          <FullScreenButton class="absolute bottom-[151px] right-[14px]" />
        </MapboxMap>
      </div>
    </main>
  </section>
</template>
