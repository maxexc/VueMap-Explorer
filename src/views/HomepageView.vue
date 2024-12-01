<script setup>
import { computed, onMounted, ref } from 'vue'
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

const router = useRouter()

const mapInstance = ref(null)
const is3DEnabled = ref(false)
let zoomListener = null
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

// const favoritePlaces = computed(() => newData.value?.data ?? favoritePlacesDefault) //  [])
const favoritePlaces = computed(() => newData.value ?? []) // []) переделал запрос

const handleMapClick = (event) => {
  const { lngLat, originalEvent } = event

  if (markerClickedToRemove.value) {
    markerClickedToRemove.value = false
    return
  }

  mapMarkerLnglat.value = [lngLat.lng, lngLat.lat]
}

const apply3DSettings = (map) => {
  map.setMaxPitch(85)
  map.setMinPitch(0)

  map.setFog({
    range: [1, 10],
    color: 'white',
    'horizon-blend': 0.03
  })

  const checkZoomLevel = () => {
    const zoomLevel = map.getZoom()
    if (zoomLevel >= 15) {
      map.setConfigProperty('basemap', 'lightPreset', 'dawn')
    } else {
      map.setConfigProperty('basemap', 'lightPreset', 'day')
    }
  }

  checkZoomLevel()

  zoomListener = () => checkZoomLevel()
  map.on('zoom', zoomListener)
}

const reset3DSettings = (map) => {
  map.setMaxPitch(60)
  map.setMinPitch(0)

  if (zoomListener) {
    map.off('zoom', zoomListener)
    zoomListener = null
  }
}

const handleMapLoad = (map = null) => {
  mapInstance.value = map

  map.on('style.load', () => {
    map.setFog({
      range: [1, 10],
      color: 'white',
      'horizon-blend': 0.1
    })
  })

  if (is3DEnabled.value) {
    apply3DSettings(map)
  }

  map.getCanvas().style.touchAction = 'manipulation' // allow vertical swipe
}

// const favoritePlacesDefault = [
//   {
//     id: 1,
//     title: 'Berlin',
//     description:
//       'Currently known as the largest and the most populated city of the European Union, Berlin is the capital city of Germany',
//     img: new URL('@/assets/img/Berlin.jpg', import.meta.url).href,
//     coordinates: [13.404954, 52.520008]
//   },
//   {
//     id: 2,
//     title: 'Rome',
//     description:
//       'Rome, or the Metropolitan City of Rome, is the capital, the largest and the most important city of Italy',
//     img: new URL('@/assets/img/Rome.jpg', import.meta.url).href,
//     coordinates: [12.496366, 41.902782]
//   },
//   {
//     id: 3,
//     title: 'Venice',
//     description:
//       'Venice (Venezia) is an amazingly beautiful old city and the center of the Metropolitan City of Venice',
//     img: new URL('@/assets/img/marking_point.jpg', import.meta.url).href,
//     coordinates: [12.327145, 45.438759]
//   }
// ]

const toggle3D = () => {
  is3DEnabled.value = !is3DEnabled.value

  if (mapInstance.value) {
    const newStyle = is3DEnabled.value
      ? 'mapbox://styles/mapbox/standard'
      : 'mapbox://styles/mapbox/streets-v11'

    mapInstance.value.setStyle(newStyle)

    mapInstance.value.once('style.load', () => {
      if (is3DEnabled.value) {
        apply3DSettings(mapInstance.value)
      } else {
        reset3DSettings(mapInstance.value)
      }
    })
  }
}

const changeActiveId = (id) => {
  activeId.value = id
  const place = favoritePlaces.value.find((place) => place.id === id)
  if (place) {
    mapInstance.value.flyTo({ center: place.coordinates })
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

  console.log('Modal body: ', body)

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
    // favoritePlaces.value = [...favoritePlacesDefault]
    router.replace('/auth')
  }
})

const { error: refreshError, mutation: testRefresh } = useMutation({
  mutationFn: () => authService.refresh(),
  onError: () => console.error('Error during token refresh:', error),
  onSuccess: () => console.log('Refresh token completed successfully.')
})

const removeMarker = () => {
  markerClickedToRemove.value = true
  console.log('removeMarker', markerClickedToRemove.value)
  mapMarkerLnglat.value = null
}

onMounted(() => {
  getUser()
  if (!authService.isLoggedIn()) {
    console.warn('User is not authenticated. Redirecting to login page.')
    // favoritePlaces.value = favoritePlacesDefault
    router.replace('/auth')
    return
  } else {
    getPlaces()
  }
})
//  sm:pt-7
</script>
<template>
  <section class="h-[100vh] overflow-auto">
    <main class="flex min-h-screen flex-col-reverse sm:flex-row" style="touch-action: auto">
      <div
        id="favorites-container"
        class="relative h-[33.1vh] bg-white sm:h-[100.1vh] md:w-[24%] sm:w-[28%] lg:w-[400px] pt-1 shrink-0 flex flex-col"
      >
        <!-- <div
          class="absolute flex justify-between -mt-2 md:-mt-3 sm:-mt-3 lg:-mt-3 gap-3 sm:gap-1 lg:gap-3 px-3 sm:px-1 lg:px-6 text-xs sm:text-[10px] lg:text-xs"
        >
          <button v-button-animation class="text-accent hover:text-primary" @click="testRefresh">
            RfToken
          </button>
        </div> -->

        <FavoritePlaces
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
        class="relative w-full h-[67vh] sm:h-[100vh] flex-grow flex items-center justify-center text-6xl pb-[2px]"
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
