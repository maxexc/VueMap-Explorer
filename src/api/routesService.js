
//                                      *** TO DO ***

import axios from 'axios';
// import { useRouteStore } from '@/stores/routeStore';
// import { TOKEN_KEY } from './authService';

const BASE_URL = import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3001';

export const routesService = {
    async createRoute(routeData) {
        // routeData — the object with {name, routeType, geometry, points}
        // need POST /routes, c headers: Authorization: Bearer ...
        try {
            const token = localStorage.getItem('token')

            const response = await axios.post(
                `${BASE_URL}routes`,
                routeData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    // withCredentials: true // if required
                }
            );
            console.log("SAVE ROTE", response.data);
            return response.data;
        } catch (error) {
            console.error('createRoute error', error);
            throw error;
        }
    },

    // Next getAllRoutes(), deleteRoute() и т.д.
    // ...
};










// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_SERVER_URL;
// // или process.env.VUE_APP_API_SERVER_URL, если у тебя Vue CLI.

// export async function addRoute(routeData, token) {
//     const res = await axios.post(`${API_URL}/routes`, routeData, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return res.data;
// }




// import { api } from './apiBase'
// // (if apiBase.js is already configured axios with baseURL and intersectors)

// export async function createRoute(routeData) {
//     // Example POST request to the backend /api/routes
//     // routeData - is an object with fields: name, routeType, geometry, points, isShared...
//     const { data } = await api.post('/routes', routeData)
//     return data
// }

// export async function getUserRoutes() {
//     // Example GET request to the backend /api/routes
//     const { data } = await api.get('/routes')
//     return data
// }

// export async function getRouteById(routeId) {
//     const { data } = await api.get(`/routes/${routeId}`)
//     return data
// }

// и т.д. — updateRoute, deleteRoute, if required