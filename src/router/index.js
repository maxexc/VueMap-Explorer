import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue';


// ** Lazy Loading **
const GreetingPage = () => import('@/views/GreetingView.vue')
const HomePage = () => import('@/views/HomepageView.vue')
const AuthPage = () => import('@/views/AuthView.vue')
const LoginPage = () => import('@/views/LoginView.vue')
const RegistrationPage = () => import('@/views/Registration.vue')

// development or production
export const BASE_DEV = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BASE_URL
    : '';

console.log('BASE ROUTER: ', BASE_DEV,);
console.log('SERVER_URL: ', import.meta.env.VITE_API_SERVER_URL);


// Hosting determination
const isGitHub = window.location.hostname === 'maxexc.github.io';
console.log("Hostname: ", window.location.hostname);

// Deployment environment
const history = isGitHub ? createWebHashHistory(BASE_DEV) : createWebHistory(BASE_DEV);

const routes = [
    { path: '/', component: GreetingPage },
    { path: '/map', component: HomePage },
    {
        path: '/auth',
        component: AuthPage,
        redirect: '/auth/login',
        children: [
            { path: 'login', component: LoginPage },
            { path: 'registration', component: RegistrationPage }
        ]
    },
    { path: '/:catchAll(.*)', component: NotFoundView, name: 'NotFoundView' }
]

export const router = createRouter({
    history: history,
    routes,
})
