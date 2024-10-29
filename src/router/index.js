import AuthView from '@/views/AuthView.vue';
import LoginView from '@/views/LoginView.vue';
import Registration from '@/views/Registration.vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// ** Lazy Loading **
const GreetingPage = () => import('@/views/GreetingView.vue')
const HomePage = () => import('@/views/HomepageView.vue')
// const AuthPage = () => import('@/views/AuthView.vue')
// const LoginPage = () => import('@/views/LoginView.vue')
// const RegistrationPage = () => import('@/views/Registration.vue')

const BASE = import.meta.env.VITE_BASE_URL
console.log('BASE: ', BASE);

const routes = [
    { path: '/', component: GreetingPage },
    { path: '/map', component: HomePage },
    {
        path: '/auth',
        component: AuthView,
        redirect: '/auth/login',
        children: [
            { path: 'login', component: LoginView },
            { path: 'registration', component: Registration }
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
})

