import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
//      *** TO DO ***
// import { createRoute } from '@/api/routesService'  // <- New route function from the server 
// ... or import { createRoute, getUserRoutes, ... }

export const useRouteStore = defineStore('route', {
    state: () => ({
        currentRoute: shallowRef(null),
        isAddPointMode: false,
        isMobile: false,

        //      *** TO DO ***
        // userRoutes: [],    routes list, shared routes, shared points, etc.
    }),
    getters: {
        hasRoute: (state) => !!state.currentRoute,
        routeIcon(state) {
            if (!state.currentRoute) return '';
            const type = state.currentRoute.routeType;
            const icons = {
                driving: '🚗',
                walking: '🚶‍♂️',
                cycling: '🚴',
                traffic: '🚛',
            };
            return icons[type] || '📍'; // if undefined, default '🚴‍♀️' '📍' '🏁'
        },
    },
    actions: {
        setMobile(flag) {
            this.isMobile = flag
        },

        setRoute(route) {
            this.currentRoute = route
            localStorage.setItem('savedRoute', JSON.stringify(route))
        },
        clearRoute() {
            this.currentRoute = null
            localStorage.removeItem('savedRoute')
        },
        loadSavedRoute() {
            const saved = localStorage.getItem('savedRoute')
            if (saved) {
                this.currentRoute = JSON.parse(saved)
            }
        },


        //      *** TO DO ***

        // New logic for saving a route on the server
        // async saveRouteToServer(routeObj) {
        //     try {
        //         // Send to the server
        //         const created = await createRoute(routeObj)
        //         //  The server will return _id, etc.     Write it to userRoutes
        //         this.userRoutes.push(created)
        //         // clear localStorage after a successful send
        //         // localStorage.removeItem('savedRoute')
        //     } catch (err) {
        //         console.error('Error while saving route to server:', err)
        //     }
        // },

        // // Example: fetch all user routes (called after login)
        // async fetchUserRoutes() {
        //     try {
        //         // const routes = await getUserRoutes()
        //         // this.userRoutes = routes
        //     } catch (err) {
        //         console.error('Error loading user routes:', err)
        //     }
        // }
    }
})
