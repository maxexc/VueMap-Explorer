import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// ** Lazy Loading **
const GeeringPage = () => import('@/views/GreetingView.vue')
const HomePage = () => import('@/views/HomepageView.vue')
// const AuthPage = () => import('src/views/AuthView.vue')
// const LoginPage = () => import('src/views/LoginView.vue')
// const RegistrationPage = () => import('src/views/Registration.vue')

const BASE = import.meta.env.VITE_BASE_URL
console.log('BASE: ', BASE);


const routes = [
    { path: '/VueMap-Explorer/', component: GeeringPage },
    { path: '/VueMap-Explorer/map', component: HomePage },
    // {
    //     path: '/VueMap-Explorer/auth', component: AuthPage, redirect: '/VueMap-Explorer/auth/login', children: [
    //         { path: 'login', component: LoginPage },
    //         { path: 'registration', component: RegistrationPage }
    //     ]
    // },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
