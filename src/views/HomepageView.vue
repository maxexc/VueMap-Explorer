<script setup>
import { ref } from 'vue'
import { MapboxMap, MapboxMarker, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl'
import { mapSettings } from '@/map/settings'
import 'mapbox-gl/dist/mapbox-gl.css'
import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue' 
import MarkerIcon from '@/components/icons/MarkerIcon.vue' 
import Toggle3DButton from '@/components/IButton/Toggle3DButton.vue' 
import ResetZoomButton from '@/components/IButton/ResetZoomButton.vue'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'

const mapInstance = ref(null)
const is3DEnabled = ref(false)
let zoomListener = null
const activeId = ref(null)

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

const favoritePlaces = [
  {
    id: 1,
    title: 'Berlin',
    description:
      'Currently known as the largest and the most populated city of the European Union, Berlin is the capital city of Germany',
    img: new URL('@/assets/img/Berlin.jpg', import.meta.url).href,
    lngLat: [13.404954, 52.520008]
  },
  {
    id: 2,
    title: 'Rome',
    description:
      'Rome, or the Metropolitan City of Rome, is the capital, the largest and the most important city of Italy',
    img: new URL('@/assets/img/Rome.jpg', import.meta.url).href,
    lngLat: [12.496366, 41.902782]
  },
  {
    id: 3,
    title: 'Venice',
    description:
      'Venice (Venezia) is an amazingly beautiful old city and the center of the Metropolitan City of Venice',
    img: new URL('@/assets/img/marking_point.jpg', import.meta.url).href,
    lngLat: [12.327145, 45.438759]
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
  const { lngLat } = favoritePlaces.find((place) => place.id === id)
  mapInstance.value.flyTo({ center: lngLat })
}

const changePlace = (id) => {
  const { lngLat } = favoritePlaces.find((place) => place.id === id)
  changeActiveId(id)
  mapInstance.value.flyTo({ center: lngLat })
}

const isOpen = ref(false)
const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}
</script>
<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10 pt-5">
      <FavoritePlaces :items="favoritePlaces" :active-id="activeId" @place-clicked="changePlace" />
      <button class="p-3" @click="openModal">Click modal</button>
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
        <MapboxMarker v-for="place in favoritePlaces" :key="place.id" :lngLat="place.lngLat">
          <button @click="changeActiveId(place.id)">
            <MarkerIcon :isActive="place.id === activeId" />
          </button>
        </MapboxMarker>
        <MapboxNavigationControl position="bottom-right" :showZoom="false" :showCompass="true" />
      </MapboxMap>
      <Toggle3DButton :is3DEnabled="is3DEnabled" @toggle3D="toggle3D" />
      <ResetZoomButton :mapInstance="mapInstance" :defaultZoom="10" />
    </div>
  </main>
</template>
