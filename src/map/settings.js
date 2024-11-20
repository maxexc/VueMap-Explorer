const TOKEN = import.meta.env.VITE_TOKEN_MAPBOX;


export const mapSettings = {
    style: 'mapbox://styles/mapbox/streets-v11',
    apiToken: TOKEN,
    projection: 'globe',
    pitch: 0,
    bearing: 0,
}
