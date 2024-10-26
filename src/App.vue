<script setup>
import { ref } from 'vue'
import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapSettings } from './map/settings'
import MarkerIcon from './components/icons/MarkerIcon.vue'
import Toggle3DButton from './components/IButton/Toggle3DButton.vue'

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
    img: '/VueMap-Explorer/img/Berlin.jpg',
    lngLat: [13.404954, 52.520008]
  },
  {
    id: 2,
    title: 'Rome',
    description:
      'Rome, or the Metropolitan City of Rome, is the capital, the largest and the most important city of Italy',
    img: '/VueMap-Explorer/img/Rome.jpg',
    lngLat: [12.496366, 41.902782]
  },
  {
    id: 3,
    title: 'Venice',
    description:
      'Venice (Venezia) is an amazingly beautiful old city and the center of the Metropolitan City of Venice',
    img: '/VueMap-Explorer/img/marking_point.jpg',
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
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces :items="favoritePlaces" :active-id="activeId" @place-clicked="changePlace" />
    </div>
    <div
      class="w-full h-full flex items-center justify-center text-6xl outline outline-2 outline-red-500"
    >
      <MapboxMap
        id="map"
        class="w-full h-full"
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
    </div>

    <footer
      class="fixed bottom-1 left-0 right-0 text-gray-600 text-center mt-12 pointer-events-none"
    >
      <p class="text-sm">&copy; Created by maxexc</p>
    </footer>
  </main>
</template>
