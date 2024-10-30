// import AuthView from '@/views/AuthView.vue';
// import LoginView from '@/views/LoginView.vue';
// import Registration from '@/views/Registration.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


// ** Lazy Loading **
const GreetingPage = () => import('@/views/GreetingView.vue')
const HomePage = () => import('@/views/HomepageView.vue')
const AuthPage = () => import('@/views/AuthView.vue')
const LoginPage = () => import('@/views/LoginView.vue')
const RegistrationPage = () => import('@/views/Registration.vue')

// development or production 
export const BASE = process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BASE_URL
    : '';

console.log('BASE ROUTER: ', BASE);

const routes = [
    { path: `${BASE}/`, component: GreetingPage },
    { path: `${BASE}/map`, component: HomePage },
    {
        path: `${BASE}/auth`,
        component: AuthPage,
        redirect: `${BASE}/auth/login`,
        children: [
            { path: 'login', component: LoginPage },
            { path: 'registration', component: RegistrationPage }
        ]
    },
    { path: `${BASE}/:catchAll(.*)`, component: NotFoundView }
]

export const router = createRouter({
    // history: createWebHistory(import.meta.env.VITE_BASE_URL),
    history: createWebHistory(),
    routes,
})

// const routes = [
//     { path: '/', component: GreetingPage },
//     { path: '/map', component: HomePage },
//     {
//         path: '/auth',
//         component: AuthPage,
//         redirect: '/auth/login',
//         children: [
//             { path: 'login', component: LoginPage },
//             { path: 'registration', component: RegistrationPage }
//         ]
//     },
//     { path: '/:catchAll(.*)', component: NotFoundView }
// ]




// const routes = [
//     { path: '/', component: GreetingPage },
//     { path: '/map', component: HomePage },
//     {
//         path: '/auth',
//         component: AuthView,
//         redirect: '/auth/login',
//         children: [
//             { path: 'login', component: LoginView },
//             { path: 'registration', component: Registration }
//         ]
//     },
// ]

