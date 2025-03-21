import axios from "axios";

const SERVER_URL = import.meta.env.VITE_API_SERVER_URL

export const clientFetch = axios.create({
    baseURL: SERVER_URL,
    // withCredentials: true // for Cookie
})
