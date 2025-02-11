import { ref, shallowRef, watch } from 'vue'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { applyDirectionsStyle, removeTemporaryWaypointsLayer } from '@/services/mapService';
import { useRouteStore } from '@/stores/routeStore';

// -------------------  Main mapbox API layers
export const mapInstance = shallowRef(null)  // ref(null)
export const directionsInstance = shallowRef(null)  // ref(null)
export const temporaryRoute = shallowRef(null)  // ref(null)
export const savedDirectionsConfig = shallowRef(null)  // ref(null)

// -------------------  Pinia Store
const routeStore = useRouteStore()

const isRouteBuilding = ref(false)
let checkInterval = null


watch(() => isRouteBuilding.value, (newVal, oldVal) => {
    if (newVal && !oldVal) {
        console.log('Route building started => Start checking for directions panel...')
        startDirectionsPanelChecker()
    } else if (!newVal && oldVal) {
        stopDirectionsPanelChecker()
        console.log('Route building ended => Stop checking...')
        removeTemporaryWaypointsLayer(mapInstance.value)
    }
})

export function initDirections(saveRoute) {
    if (!mapInstance.value || directionsInstance.value) return
    directionsInstance.value = new MapboxDirections({
        accessToken: import.meta.env.VITE_TOKEN_MAPBOX_NEXT,
        unit: 'metric',
        profile: 'mapbox/driving',
        geometries: 'geojson',
        controls: {
            instructions: true,
            profileSwitcher: true,
            inputs: true
        }
    })

    directionsInstance.value.on('route', (e) => {
        const route = e?.route?.[0]
        if (route) {
            temporaryRoute.value = {
                ...route,
                waypoints: directionsInstance.value.getWaypoints()
            }
            injectRouteButtons(saveRoute)

            setTimeout(() => applyDirectionsStyle(mapInstance.value), 200)
        } else {
            removeRouteButtons()
        }
    })
}

export function toggleDirections() {
    if (!mapInstance.value || !directionsInstance.value) return

    const map = mapInstance.value
    const controls = map._controls || []
    const isAdded = controls.includes(directionsInstance.value)

    if (isAdded) {
        map.removeControl(directionsInstance.value)
        savedDirectionsConfig.value = null
    } else {
        map.addControl(directionsInstance.value, 'left')
    }
}

export function enableAddPointMode() {
    routeStore.isAddPointMode = true
    console.log('Режим добавления точки активирован (enableAddPointMode)')
}

export function injectRouteButtons(saveRoute) {

    const summaryEl = document.querySelector('.mapbox-directions-route-summary')
    const directionsEl = document.querySelector('.directions-control-directions')

    if (!summaryEl || !directionsEl) return

    // button "Save route"
    if (!document.getElementById('my-save-route-btn')) {
        const saveBtn = document.createElement('button')
        saveBtn.id = 'my-save-route-btn'
        saveBtn.innerText = 'Save route'
        saveBtn.className = 'my-save-route-btn-class'
        saveBtn.onclick = () => {
            saveRoute()
        }
        summaryEl.appendChild(saveBtn)
    }

    // button "Add point"
    if (!document.getElementById('my-addpoint-btn3')) {
        const addPointBtn = document.createElement('button')
        addPointBtn.id = 'my-addpoint-btn3'
        addPointBtn.className = 'my-addpoint-btn-class'
        addPointBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
            <path
                d="M23 12c0-3.037-1.232-5.789-3.222-7.778s-4.741-3.222-7.778-3.222-5.789 1.232-7.778 3.222-3.222 4.741-3.222 7.778 1.232 5.789 3.222 7.778 4.741 3.222 7.778 3.222 5.789-1.232 7.778-3.222 3.222-4.741 3.222-7.778zM21 12c0 2.486-1.006 4.734-2.636 6.364s-3.878 2.636-6.364 2.636-4.734-1.006-6.364-2.636-2.636-3.878-2.636-6.364 1.006-4.734 2.636-6.364 3.878-2.636 6.364-2.636 4.734 1.006 6.364 2.636 2.636 3.878 2.636 6.364zM8 13h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1h-3v-3c0-0.552-0.448-1-1-1s-1 0.448-1 1v3h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1z"
            />
        </svg>`

        addPointBtn.onclick = () => {
            enableAddPointMode()
        }

        directionsEl.appendChild(addPointBtn)
    }
    isRouteBuilding.value = true
}

export function removeRouteButtons() {
    const addBtn = document.getElementById('my-addpoint-btn3')
    if (addBtn) addBtn.remove()

    const saveBtn = document.getElementById('my-save-route-btn')
    if (saveBtn) saveBtn.remove()
}

export function startDirectionsPanelChecker() {
    if (checkInterval) return
    checkInterval = setInterval(() => {
        const el = document.querySelector('.directions-control-directions')
        if (!el) {
            console.log('Directions panel disappeared => cleaning up...')
            removeTemporaryWaypointsLayer(mapInstance.value)
            isRouteBuilding.value = false
        }
    }, 1000)
}

export function stopDirectionsPanelChecker() {
    if (checkInterval) {
        clearInterval(checkInterval)
        checkInterval = null
    }
}
