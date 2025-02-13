const TOKEN = import.meta.env.VITE_TOKEN_MAPBOX;


export const mapSettings = {
    style: 'mapbox://styles/mapbox/streets-v12',  // 'mapbox://styles/mapbox/streets-v11' v12 v9
    apiToken: TOKEN,
    projection: 'globe',    // projection: 'globe', projection: 'mercator',
    pitch: 0,
    bearing: 0,
}
