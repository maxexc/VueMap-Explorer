import { clientFetch } from "../clientFetch";

const BASE_PLACES_URL = 'points';

export const getFavoritePlaces = () => {
    return clientFetch.get(BASE_PLACES_URL).then(({ data }) =>
        data.map((place) => ({
            ...place,
            id: place._id
        }))
    )
}

export const addFavoritePlaces = (body) => {
    return clientFetch.post(BASE_PLACES_URL, body)
}

export const updateFavoritePlaces = (body) => {
    return clientFetch.put(BASE_PLACES_URL, body)
}

export const deleteFavoritePlaces = (body) => {
    return clientFetch.delete(BASE_PLACES_URL, body)
}