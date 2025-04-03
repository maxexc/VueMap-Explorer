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

// bug-fix iOS overscaling
store.detectPlatform()
const metaViewport = document.querySelector("meta[name='viewport']")

if (metaViewport) {
    if (store.isIOS) {

        const userAgent = navigator.userAgent
        const iPadDetect = /iPad/i.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

        if (iPadDetect) {
            // iPad
            metaViewport.setAttribute(
                'content',
                'width=device-width, initial-scale=0.999, viewport-fit=cover, user-scalable=no, maximum-scale=1.0'
            )
        } else {
            // iPhone
            metaViewport.setAttribute(
                'content',
                'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, maximum-scale=1.0'
            )
        }
        // // iOS: Turn off zoom
        // metaViewport.setAttribute(
        //     'content',
        //     'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, maximum-scale=1.0'
        // )
    } else {
        // not iOS: allow user-scalable
        metaViewport.setAttribute(
            'content',
            'width=device-width, initial-scale=1.0, viewport-fit=cover'
        )
        // additionally:  ,initial-scale=1.0, user-scalable=yes, maximum-scale=5.0
    }
}

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
