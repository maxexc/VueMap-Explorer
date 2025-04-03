<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { mapSettings } from '@/map/settings'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  MapboxGeolocateControl,
  MapboxMap,
  MapboxMarker,
  MapboxNavigationControl
} from '@studiometa/vue-mapbox-gl'

import SwiperSlider from '@/components/SwiperSlider/SwiperSlider.vue'
import VerticalSliderCard from '@/components/SwiperSlider/VerticalSliderCard.vue'
import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import ResetZoomButton from '@/components/IButton/ResetZoomButton.vue'
import Toggle3DButton from '@/components/IButton/Toggle3DButton.vue'
import FullScreenButton from '@/components/IButton/FullScreenButton.vue'

import { useModal } from '@/composables/useModal'
import { useMutation } from '@/composables/useMutation'
import { authService } from '@/api/authService'
import { addFavoritePlaces, getFavoritePlaces } from '@/api/favorite-places'
import { getUserInfo } from '@/api/user'
import { storeToRefs } from 'pinia'
import { useRouteStore } from '@/stores/routeStore'

import {
  flyTo,
  initializeMap,
  set3DMode,
  addMyRouteLayer,
  addPointsLayer,
  removeTemporaryWaypointsLayer,
  showTemporaryWaypointsOnMap
} from '@/services/mapService'

import {
  mapInstance,
  directionsInstance,
  temporaryRoute,
  savedDirectionsConfig,
  initDirections,
  toggleDirections
} from '@/services/routeService'

import { transformDirectionsRoute } from '@/services/routeTransformService'
import RouteStatusBar from '@/components/RouteStatusBar/RouteStatusBar.vue'
import { fitToCurrentRoute, removeRoute } from '@/services/routeService'
// import { routesService } from '@/api/routesService'

// -------------------  Pinia Store
const routeStore = useRouteStore()

const router = useRouter()
const { isMobile, currentRoute, isIOS } = storeToRefs(routeStore) // destruct currentRoute for reactive tracking
console.log('isIOS in HW:', isIOS.value)
alert(`isIOS in HW: ${isIOS.value}`)

const is3DEnabled = ref(false)
const activeId = ref(null)
const mapMarkerLnglat = ref(null)
const markerClickedToRemove = ref(false)

// ------------------- Auth & Places
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

const {
  data: newData,
  mutation: getPlaces,
  isLoading: isPlacesLoading
} = useMutation({
  mutationFn: () => getFavoritePlaces()
})

const favoritePlaces = computed(() => newData.value ?? [])

// * Depends on domain policy
const { error: refreshError, mutation: testRefresh } = useMutation({
  mutationFn: () => authService.refresh(),
  onError: () => console.error('Error during token refresh:', error),
  onSuccess: () => console.log('Refresh token completed successfully.')
})

// ------------------- Modal
const { isOpen, closeModal, openModal } = useModal()

const openModalWithErrorReset = () => {
  addNewMarkerError.value = null
  openModal()
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

// ------------------- Lifecycle
onMounted(() => {
  getUser()
  if (!authService.isLoggedIn()) {
    console.warn('User is not authenticated. Redirecting to login page.')
    router.replace('/auth')
    return
  } else {
    getPlaces()
  }

  routeStore.loadSavedRoute()
})

// const isMobile = ref(window.innerWidth < 640)

// const updateIsMobile = () => {
//   isMobile.value = window.innerWidth < 640
// }

// onMounted(() => {
//   window.addEventListener('resize', updateIsMobile)
// })

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', updateIsMobile)
// })

// ------------------- Map
const handleMapLoad = (map = null) => {
  mapInstance.value = map
  initializeMap(map)

  const savedRoute = JSON.parse(localStorage.getItem('savedRoute'))
  if (savedRoute && savedRoute?.geometry) {
    map.once('style.load', () => {
      addMyRouteLayer(mapInstance.value, savedRoute.geometry)
      if (savedRoute.points) {
        addPointsLayer(mapInstance.value, savedRoute.points)
      }
      routeStore.setRoute(savedRoute)
    })
  }
}

const handleMapClick = (event) => {
  if (routeStore.isAddPointMode && directionsActive.value) {
    const destination = directionsInstance.value.getDestination() // point B

    const wps = directionsInstance.value.getWaypoints()
    const index = wps.length - 1 + 1
    directionsInstance.value.addWaypoint(index, [event.lngLat.lng, event.lngLat.lat])

    routeStore.isAddPointMode = false
    console.log('Режим добавления точки отключен')
    showTemporaryWaypointsOnMap(mapInstance.value, directionsInstance.value)

    console.log('destination B point:', destination.geometry.coordinates)
    setTimeout(() => {
      directionsInstance.value.setDestination(destination.geometry.coordinates)
    }, 400)
    return
  }

  if (markerClickedToRemove.value) {
    markerClickedToRemove.value = false
    return
  }

  mapMarkerLnglat.value = [event.lngLat.lng, event.lngLat.lat]
}

const removeMarker = () => {
  markerClickedToRemove.value = true
  mapMarkerLnglat.value = null
}

// ------------------- Markers
let changeActiveId = (id) => {
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

// ------------------- Add Markers to Route
const originalChangeActiveId = changeActiveId

const changeActiveIdWithDirections = (id) => {
  originalChangeActiveId(id)
  if (!directionsActive.value || !directionsInstance.value) return

  const place = favoritePlaces.value.find((p) => p.id === id)
  if (!place) return

  const coords = place.coordinates

  const origin = directionsInstance.value.getOrigin() // point A
  const destination = directionsInstance.value.getDestination() // point B

  if (!origin || !origin.geometry) {
    directionsInstance.value.setOrigin(coords)
  } else if (!destination || !destination.geometry) {
    directionsInstance.value.setDestination(coords)
  } else {
    const wps = directionsInstance.value.getWaypoints()
    const index = wps.length - 1 + 1
    directionsInstance.value.addWaypoint(index, coords)
  }
}

changeActiveId = changeActiveIdWithDirections

// ------------------- Directions
const directionsActive = computed(() => {
  return (
    directionsInstance.value &&
    mapInstance.value &&
    (mapInstance.value._controls || []).includes(directionsInstance.value)
  )
})

function onToggleDirections() {
  initDirections(saveRoute)
  toggleDirections()
}

// ------------------- Save route
const saveRoute = () => {
  if (temporaryRoute.value) {
    removeTemporaryWaypointsLayer(mapInstance.value)

    const userName = userInfoData.value?.data?.name || 'Guest'
    const routeObj = transformDirectionsRoute(temporaryRoute.value, userName)

    if (!routeObj) return

    routeStore.setRoute(routeObj)

    //    ***  TO DO  ***
    // (new) - "saveRouteToServer", if user online/auth
    // routesService
    //   .createRoute(routeObj)
    //   .then((created) => {
    //     console.log('Route saved to DB', created)
    //   })
    //   .catch((err) => {
    //     console.error('Failed to save route', err)
    //   })

    localStorage.setItem('savedRoute', JSON.stringify(routeObj))

    showRouteOnMap()

    if (mapInstance.value && directionsInstance.value) {
      mapInstance.value.removeControl(directionsInstance.value)
      directionsInstance.value = null
    }
    temporaryRoute.value = null
  }
}

// ------------------- 3D
const toggle3D = () => {
  is3DEnabled.value = !is3DEnabled.value
  saveDirectionsConfig()

  if (mapInstance.value) {
    set3DMode(mapInstance.value, is3DEnabled.value)
  }
  setTimeout(() => {
    restoreDirectionsConfig()
  }, 500)

  mapInstance.value.once('style.load', () => {
    if (routeStore.currentRoute && routeStore.currentRoute.geometry) {
      addMyRouteLayer(mapInstance.value, routeStore.currentRoute.geometry)
      addPointsLayer(mapInstance.value, routeStore.currentRoute.points)
    }
  })
}

/// ------------------- 3D config
function saveDirectionsConfig() {
  const map = mapInstance.value
  const style = map.getStyle()

  let directionsLayers = style.layers.filter((layer) => layer.id.startsWith('directions-'))

  const directionsSources = {}
  Object.keys(style.sources).forEach((sourceId) => {
    if (sourceId.startsWith('directions')) {
      directionsSources[sourceId] = style.sources[sourceId]
    }
  })
  savedDirectionsConfig.value = { layers: directionsLayers, sources: directionsSources }
}

function restoreDirectionsConfig() {
  const map = mapInstance.value
  if (!savedDirectionsConfig.value) {
    console.warn('[restoreDirectionsConfig] Нет сохранённой конфигурации')
    return
  }
  const currentStyle = map.getStyle()
  Object.keys(savedDirectionsConfig.value.sources).forEach((sourceId) => {
    if (!currentStyle.sources[sourceId]) {
      map.addSource(sourceId, savedDirectionsConfig.value.sources[sourceId])
    }
  })
  savedDirectionsConfig.value.layers.forEach((layerConfig) => {
    if (!map.getLayer(layerConfig.id)) {
      map.addLayer(layerConfig)
    }
  })
}

// ------------------- remove & show

function showRouteOnMap() {
  const map = mapInstance.value
  if (!mapInstance.value) return

  const route = routeStore.currentRoute // const route = JSON.parse(localStorage.getItem('savedRoute'))
  if (route && route.geometry) {
    if (map.isStyleLoaded()) {
      addMyRouteLayer(map, route.geometry)
      if (route.points) {
        addPointsLayer(map, route.points)
      }
    } else {
      map.once('style.load', () => {
        addMyRouteLayer(map, route.geometry)
        if (route.points) {
          addPointsLayer(map, route.points)
        }
      })
    }
  }
}

// ------------------- TO DO
async function saveGeojsonToFile(geojson) {
  // Check API support
  if (!window.showSaveFilePicker) {
    console.error('File System Access API не поддерживается этим браузером.')
    return
  }

  const options = {
    suggestedName: 'my_route.geojson',
    types: [
      {
        description: 'GeoJSON files',
        accept: {
          'application/geo+json': ['.geojson']
        }
      }
    ]
  }

  try {
    const fileHandle = await window.showSaveFilePicker(options)
    const writable = await fileHandle.createWritable()
    await writable.write(JSON.stringify(geojson, null, 2))
    await writable.close()
    console.log('The file was successfully saved!')
  } catch (err) {
    console.error('Error when saving the file:', err)
  }
}

// const isIOS = ref(false)

// onMounted(() => {
//   isIOS.value = /iPhone|iPad|iPod/i.test(navigator.userAgent)
//   // alert(`iOS : ${isIOS.value}`)
// })
// class="relative min-h-screen overflow-auto bg-white" class="relative h-[100vh] overflow-auto bg-white"

/* <section
    :class="['relative overflow-auto bg-white', isIOS ? 'section-ios' : 'section-android-desktop']"
  > */
</script>
<template>
  <section
    :class="['relative overflow-auto bg-white', isIOS ? 'section-ios' : 'section-android-desktop']"
  >
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
          @update:activeId="(val) => (activeId = val)"
          @route-request="onToggleDirections"
          :is-route="directionsActive"
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
        <RouteStatusBar
          v-if="currentRoute && !isMobile"
          :isMobile="false"
          :routeIcon="routeStore.routeIcon"
          :onFitRoute="fitToCurrentRoute"
          :onRemoveRoute="removeRoute"
        />
      </div>

      <div
        class="relative bg-white w-full sm:mt-0 h-[74vh] sm:h-[100vh] flex-grow flex items-center justify-center text-6xl pb-[2px]"
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
          <Toggle3DButton class="fixed" :is3DEnabled="is3DEnabled" @toggle3D="toggle3D" />
          <FullScreenButton class="absolute bottom-[151px] right-[13px]" />
          <MapboxGeolocateControl
            position="bottom-left"
            :trackUserLocation="true"
            :showUserLocation="true"
            :fitBoundsOptions="{ maxZoom: 10 }"
            :geolocationOptions="{
              enableHighAccuracy: true,
              timeout: 8000
            }"
          />
        </MapboxMap>
      </div>
    </main>
  </section>
</template>
