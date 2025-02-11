import polyline from '@mapbox/polyline'

export function transformDirectionsRoute(temporaryRoute, userName = 'Guest') {
    if (!temporaryRoute || !temporaryRoute.geometry) {
        console.warn('[transformDirectionsRoute] no geometry in temporaryRoute?')
        return null
    }

    const polylineStr = temporaryRoute.geometry
    const coords = polyline.decode(polylineStr)
    const convertedCoords = coords.map(([lat, lng]) => [lng, lat])

    const geojson = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: convertedCoords
        },
        properties: {}
    }

    const A = convertedCoords[0]
    const B = convertedCoords[convertedCoords.length - 1]

    const wps = temporaryRoute.waypoints || []
    const features = []

    features.push({
        type: 'Feature',
        properties: {
            name: 'A',
            icon: 'default',
            rating: 0,
            private: false,
            reviews: []
        },
        geometry: { type: 'Point', coordinates: A }
    })

    wps.forEach((wp, i) => {
        let name = `W${i + 1}`
        features.push({
            type: 'Feature',
            properties: {
                name,
                icon: 'default',
                rating: 0,
                private: false,
                reviews: []
            },
            geometry: {
                type: 'Point',
                coordinates: [wp.geometry.coordinates[0], wp.geometry.coordinates[1]]
            }
        })
    })

    features.push({
        type: 'Feature',
        properties: {
            name: 'B',
            icon: 'default',
            rating: 0,
            private: false,
            reviews: []
        },
        geometry: { type: 'Point', coordinates: B }
    })

    const pointsGeoJSON = {
        type: 'FeatureCollection',
        features
    }

    const routeType = () => {
        switch (temporaryRoute.weight_name) {
            case 'bicycle':
                return 'cycling'
            case 'pedestrian':
                return 'walking'
            case 'auto':
                return temporaryRoute.weight_typical ? 'traffic' : 'driving'
            default:
                return 'default'
        }
    }

    //  TO DO   (Generate a name, no modal yet)
    const routeName = `${userName}_${Date.now()}`

    // Preparing the object for Pinia/ and Server
    return {
        name: routeName,
        routeType: routeType(),
        isShared: false,
        rating: 4.5,
        geometry: geojson,
        points: pointsGeoJSON
        // the server will then return a Route with “ownerId” “_id” “createdAt” “updatedAt”
    }
}
