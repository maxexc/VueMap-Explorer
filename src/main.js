import './assets/main.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import App from './App.vue'
import { authService, TOKEN_KEY } from './api/authService';


const token = localStorage.getItem(TOKEN_KEY)
if (token) {
    authService.setToken(token);
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// ---------------  Important!: We can only get a store after!  app.use(pinia) ---------------
import { useRouteStore } from '@/stores/routeStore'
import { initRouteService } from './services/routeService';
const store = useRouteStore()
initRouteService(store)


// JS for iOS
app.directive('button-animation', {
    mounted(el) {
        const scaleDown = () => {
            el.style.transform = 'scale(0.75)';
            el.style.transition = 'transform 0.1s ease';
        };

        const scaleUp = () => {
            el.style.transform = 'scale(1)';
            el.style.transition = 'transform 0.1s ease';
        };

        el.addEventListener('mousedown', scaleDown);
        el.addEventListener('mouseup', scaleUp);
        el.addEventListener('mouseleave', scaleUp);

        el.addEventListener('touchstart', scaleDown, { passive: true });
        el.addEventListener('touchend', scaleUp, { passive: true });
        el.addEventListener('touchcancel', scaleUp, { passive: true });
    },
});


app.mount('#app')
