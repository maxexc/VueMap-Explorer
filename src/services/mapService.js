let zoomListener = null

function checkZoomLevel(map) {
    const zoomLevel = map.getZoom()
    if (zoomLevel >= 15) {
        map.setConfigProperty('basemap', 'lightPreset', 'dawn')
    } else {
        map.setConfigProperty('basemap', 'lightPreset', 'day')
    }
}

export function initializeMap(map) {
    map.on('style.load', () => {
        map.setFog({
            range: [1, 10],
            color: 'white',
            'horizon-blend': 0.1
        })
    })
    map.getCanvas().style.touchAction = 'manipulation'
}

export function enable3D(map) {
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

export function disable3D(map) {
    map.setMaxPitch(60)
    map.setMinPitch(0)

    if (zoomListener) {
        map.off('zoom', zoomListener)
        zoomListener = null
    }
}

export function set3DMode(map, is3DEnabled) {
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
    map.flyTo({ center: coordinates })
}


// -------------------------      *** NEW ****  -------------------------------------------------


export function applyDirectionsStyle(map) {
    if (!map) return
    const layerLine = map.getLayer('directions-route-line')
    const layerCasing = map.getLayer('directions-route-line-casing')
    const layerDest = map.getLayer('directions-destination-point')
    const layerOrig = map.getLayer('directions-origin-point')

    if (layerLine) {
        map.setPaintProperty('directions-route-line', 'line-width', 3)
        map.setPaintProperty('directions-route-line', 'line-color', '#2bffcd')
    }
    if (layerCasing) {
        map.setPaintProperty('directions-route-line-casing', 'line-width', 9)
    }
    if (layerDest) {
        map.setPaintProperty('directions-destination-point', 'circle-color', '#6A5ACD')
        map.setPaintProperty('directions-destination-point', 'circle-radius', 12)
    }
    if (layerOrig) {
        map.setPaintProperty('directions-origin-point', 'circle-radius', 12)
    }
}

export function addMyRouteLayer(map, geojson) {
    if (!map) return
    if (!map.getSource('my-route')) {
        map.addSource('my-route', {
            type: 'geojson',
            data: geojson
        });
        map.addLayer({
            id: 'my-route-line-casing',
            type: 'line',
            source: 'my-route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#007aff',
                'line-width': 7,
                'line-opacity': 1 // 0.8
            }
        });

        map.addLayer({
            id: 'my-route-line',
            type: 'line',
            source: 'my-route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#91ffc8', // '#91ffc8' #70ffb8 '#a7fcd1' '#5ed499'  '#73ffb9' '#72e3aa' #69ecab
                'line-width': 4,
                'line-opacity': 1 // 0.9
            }
        });
    } else {
        map.getSource('my-route').setData(geojson);
    }
}

export function addPointsLayer(map, pointsGeoJSON) {
    if (!map) return
    if (!map.getSource('route-points')) {
        map.addSource('route-points', {
            type: 'geojson',
            data: pointsGeoJSON
        });
        map.addLayer({
            id: 'route-points-layer',
            type: 'circle',
            source: 'route-points',
            paint: {
                'circle-radius': [
                    'match',
                    ['slice', ['get', 'name'], 0, 1],
                    'A', 11,
                    'W', 9.1,
                    'B', 11,
                    8
                ],
                'circle-color': [
                    'match',
                    ['slice', ['get', 'name'], 0, 1],
                    'A', '#1abc9c',  // '#20B4B4' #1abc9c
                    'W', '#ffca60',  // W* #FFC107  #ffa800 #FF9800 #ffef95 #ffc042 #ffca60
                    'B', '#9b59b6',  // #6A5ACD #9b59b6 #8B7FC9
                    '#0000ff'
                ],
                'circle-stroke-width': 1.5,
                'circle-stroke-color': '#333'
            }
        });
        map.addLayer({
            id: 'route-points-symbol',
            type: 'symbol',
            source: 'route-points',
            layout: {
                'text-field': ['get', 'name'],
                'text-size': [
                    'match',
                    ['slice', ['get', 'name'], 0, 1],
                    'A', 14, // 10, 12 14
                    'W', 8,
                    'B', 14,
                    8
                ],
                'text-font': ['Open Sans Bold'],
                'text-anchor': 'center',
                'text-offset': [0, 0.0]  // shifting up
            },
            paint: {
                'text-color': [
                    'match',
                    ['slice', ['get', 'name'], 0, 1],
                    'A', '#fff',
                    'W', '#1e1e1e', //  '#333' '#000' '#1e1e1e'
                    'B', '#fff',
                    '#fff'
                ],
                'text-halo-color': [
                    'match',
                    ['slice', ['get', 'name'], 0, 1],
                    'A', '#333',
                    'W', '#ffef95',  // '#fff' '#ffbf36' #ff3636
                    'B', '#333',
                    '#333'
                ],
                'text-halo-width': [
                    'match',
                    ['slice', ['get', 'name'], 0, 1],
                    'A', 0.6,
                    'W', 0.7,
                    'B', 0.6,
                    0.2
                ]
            }
        });
    } else {
        map.getSource('route-points').setData(pointsGeoJSON);
    }
}

export function removeTemporaryWaypointsLayer(map) {
    if (!map) return
    if (map.getSource('directions-waypoint-markers')) {
        if (map.getLayer('directions-waypoint-markers-layer')) {
            map.removeLayer('directions-waypoint-markers-layer');
        }
        map.removeSource('directions-waypoint-markers');
    }
}

export function showTemporaryWaypointsOnMap(map, directionsInstance) {
    if (!map || !directionsInstance) return;
    if (!map.getSource('directions-waypoint-markers')) {
        map.addSource('directions-waypoint-markers', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] }
        });
        map.addLayer({
            id: 'directions-waypoint-markers-layer',
            type: 'circle',
            source: 'directions-waypoint-markers',
            paint: {
                'circle-radius': 6,
                'circle-color': '#20b4b4',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#333'  // #333 #FFC107 #20b4b4 #FF9800
            }
        });
    }
    const waypoints = directionsInstance.getWaypoints().map((wp) => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [wp.geometry.coordinates[0], wp.geometry.coordinates[1]]
        }
    }));
    map.getSource('directions-waypoint-markers').setData({
        type: 'FeatureCollection',
        features: waypoints
    });

    undefined[0] // Blocking 'B' from shifting!
}