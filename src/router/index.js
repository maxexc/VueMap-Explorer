import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// ** Lazy Loading **
const GeeringPage = () => import('../views/GreetingView.vue')
const HomePage = () => import('../views/HomepageView.vue')
const AuthPage = () => import('../views/AuthView.vue')
const LoginPage = () => import('../views/LoginView.vue')
const RegistrationPage = () => import('../views/Registration.vue')

const routes = [
    { path: '/', component: GeeringPage },
    { path: '/map', component: HomePage },
    {
        path: '/auth', component: AuthPage, redirect: '/auth/login', children: [
            { path: 'login', component: LoginPage },
            { path: 'registration', component: RegistrationPage }
        ]
    },
]

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_URL || '/'),
    // history: createWebHashHistory(),
    routes,
})