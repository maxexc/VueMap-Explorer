<script setup>
import { onMounted, ref } from 'vue'
import { MapboxMap, MapboxMarker, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl'
import { mapSettings } from '@/map/settings'
import 'mapbox-gl/dist/mapbox-gl.css'
import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import Toggle3DButton from '@/components/IButton/Toggle3DButton.vue'
import ResetZoomButton from '@/components/IButton/ResetZoomButton.vue'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import { getFavoritePlaces } from '@/api/favorite-places'
import { authService } from '@/api/authService'
import { useMutation } from '@/composables/useMutation'
import { useRouter } from 'vue-router'

const router = useRouter()

const mapInstance = ref(null)
const is3DEnabled = ref(false)
let zoomListener = null
const activeId = ref(null)
const favoritePlaces = ref([])

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
}

const favoritePlacesDefault = [
  {
    _id: 1,
    title: 'Berlin',
    description:
      'Currently known as the largest and the most populated city of the European Union, Berlin is the capital city of Germany',
    img: new URL('@/assets/img/Berlin.jpg', import.meta.url).href,
    coordinates: [13.404954, 52.520008]
  },
  {
    _id: 2,
    title: 'Rome',
    description:
      'Rome, or the Metropolitan City of Rome, is the capital, the largest and the most important city of Italy',
    img: new URL('@/assets/img/Rome.jpg', import.meta.url).href,
    coordinates: [12.496366, 41.902782]
  },
  {
    _id: 3,
    title: 'Venice',
    description:
      'Venice (Venezia) is an amazingly beautiful old city and the center of the Metropolitan City of Venice',
    img: new URL('@/assets/img/marking_point.jpg', import.meta.url).href,
    coordinates: [12.327145, 45.438759]
  }
]

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
  const place = favoritePlaces.value.find((place) => place._id === id)
  if (place) {
    mapInstance.value.flyTo({ center: place.coordinates })
  }
}

const changePlace = (id) => {
  changeActiveId(id)
}

const isOpen = ref(false)
const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}

onMounted(async () => {
  if (!authService.isLoggedIn()) {
    console.warn('User is not authenticated. Redirecting to login page.')
    favoritePlaces.value = favoritePlacesDefault
    return
  }
  try {
    const { data } = await getFavoritePlaces()
    favoritePlaces.value = data
    console.log('getFavoritePlaces: ', data)
  } catch (error) {
    console.error('Error loading favorite places:', error)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized. Redirecting to login page.')
      router.replace('/login')
    }
  }
})

const {
  data,
  error,
  mutation: logOut
} = useMutation({
  mutationFn: () => authService.logout(),
  onError: () => {
    favoritePlaces.value = []
    // router.replace('/auth')
  }
  // onSuccess: () => router.replace('/auth'),
})
</script>
<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10 pt-5">
      <FavoritePlaces :items="favoritePlaces" :active-id="activeId" @place-clicked="changePlace" />
      <button class="p-3 text-accent" @click="openModal">Click modal</button>
      <button class="p-3 text-accent" @click="logOut">Log out</button>
      <br />
      <div v-if="data" class="text-green-500 mt-4 text-center font-semibold">
        {{ data.message }}
      </div>
      <div v-if="error" class="text-red-500 mt-4 text-center font-semibold">
        {{ error }}
      </div>
      <CreateNewPlaceModal
        :is-open="isOpen"
        @close="closeModal"
        @submit="console.log"
      ></CreateNewPlaceModal>
    </div>
    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapboxMap
        id="map"
        class="w-full h-full overflow-auto"
        :center="[13.376481, 52.509663]"
        :zoom="10"
        :access-token="mapSettings.apiToken"
        :map-style="mapSettings.style"
        :projection="mapSettings.projection"
        v-on:mb-created="handleMapLoad"
      >
        <MapboxMarker v-for="place in favoritePlaces" :key="place._id" :lngLat="place.coordinates">
          <button @click="changeActiveId(place._id)">
            <MarkerIcon :isActive="place._id === activeId" />
          </button>
        </MapboxMarker>
        <MapboxNavigationControl position="bottom-right" :showZoom="false" :showCompass="true" />
      </MapboxMap>
      <Toggle3DButton :is3DEnabled="is3DEnabled" @toggle3D="toggle3D" />
      <ResetZoomButton :mapInstance="mapInstance" :defaultZoom="10" />
    </div>
  </main>
</template>
