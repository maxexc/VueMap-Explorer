import './assets/main.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import { authService, TOKEN_KEY } from './api/authService';

import App from './App.vue'

const token = localStorage.getItem(TOKEN_KEY)
if (token) {
    authService.setToken(token);
}

const app = createApp(App)

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

app.use(createPinia())
app.use(router)

app.mount('#app')
