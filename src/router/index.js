import AuthView from '@/views/AuthView.vue';
import LoginView from '@/views/LoginView.vue';
import Registration from '@/views/Registration.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomepageView from '@/views/HomepageView.vue';
import GreetingView from '@/views/GreetingView.vue';


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

// Определите, где вы развертываете приложение
const isGitHub = window.location.hostname === 'maxexc.github.io';
console.log("Hostname: ", window.location.hostname);

// Выбор истории в зависимости от среды развертывания
const history = isGitHub ? createWebHashHistory(BASE_DEV) : createWebHistory(BASE_DEV);


export const BASE = ''


console.log('BASE ROUTER: ', BASE,);

const routes = [
    { path: `${BASE}/`, component: GreetingView },
    { path: `${BASE}/map`, component: HomepageView },
    {
        path: `${BASE}/auth`,
        component: AuthView,
        redirect: `${BASE}/auth/login`,
        children: [
            { path: 'login', component: LoginView },
            { path: 'registration', component: Registration }
        ]
    },
    { path: `${BASE}/:catchAll(.*)`, component: NotFoundView }
]

export const router = createRouter({
    // history: createWebHistory(import.meta.env.VITE_BASE_URL),
    // history: createWebHashHistory(),
    // history: createWebHistory(BASE_DEV),
    // history: createWebHistory(),
    history: history,
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

