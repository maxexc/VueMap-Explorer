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
    { path: '/VueMap-Explorer/', component: GreetingPage },
    { path: '/VueMap-Explorer/map', component: HomePage },
    // { path: '/VueMap-Explorer/auth', component: AuthPage },
    // {
    //     path: '/VueMap-Explorer/auth',
    //     component: AuthPage,
    //     redirect: '/VueMap-Explorer/auth/login',
    //     children: [
    //         { path: '/VueMap-Explorer/auth/login', component: LoginPage },
    //         { path: '/VueMap-Explorer/auth/registration', component: RegistrationPage }
    //     ]
    // }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
