let zoomListener = null

function checkZoomLevel(map) {    // комментарий: Вспомогательная функция, была внутри apply3DSettings
    const zoomLevel = map.getZoom()
    if (zoomLevel >= 15) {
        map.setConfigProperty('basemap', 'lightPreset', 'dawn')
    } else {
        map.setConfigProperty('basemap', 'lightPreset', 'day')
    }
}

export function initializeMap(map) {    // комментарий: заменяет handleMapLoad частично Раньше было в HomepageView.vue
    map.on('style.load', () => {
        map.setFog({
            range: [1, 10],
            color: 'white',
            'horizon-blend': 0.1
        })
    })
    map.getCanvas().style.touchAction = 'manipulation' // allow vertical swipe
}

export function enable3D(map) {    // комментарий: заменяет apply3DSettings
    map.setMaxPitch(85)
    map.setMinPitch(0)

    map.setFog({
        range: [1, 10],
        color: 'white',
        'horizon-blend': 0.03
    })

    checkZoomLevel(map)

    zoomListener = () => checkZoomLevel(map)
    map.on('zoom', zoomListener)
}

export function disable3D(map) {    // комментарий: заменяет reset3DSettings
    map.setMaxPitch(60)
    map.setMinPitch(0)

    if (zoomListener) {
        map.off('zoom', zoomListener)
        zoomListener = null
    }
}

export function set3DMode(map, is3DEnabled) {    // комментарий: логика из toggle3D
    const newStyle = is3DEnabled
        ? 'mapbox://styles/mapbox/standard'
        : 'mapbox://styles/mapbox/streets-v11'

    map.setStyle(newStyle)

    map.once('style.load', () => {
        if (is3DEnabled) {
            enable3D(map)
        } else {
            disable3D(map)
        }
    })
}

export function flyTo(map, coordinates) {
    // комментарий: заменяет прямой вызов map.flyTo() в changeActiveId
    map.flyTo({ center: coordinates })
}
