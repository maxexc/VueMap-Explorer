import { router } from "@/router";
import { clientFetch } from "../clientFetch";

export const TOKEN_KEY = 'token';

class AuthService {
    #token = null;

    constructor() {
        this.#token = localStorage.getItem(TOKEN_KEY) || null;
    }

    isLoggedIn() {
        return Boolean(this.#token);
    }

    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
        this.#token = token;
    }

    getToken() {
        return this.#token
    }

    clearToken() {
        this.#token = null;
        localStorage.removeItem(TOKEN_KEY);
        clientFetch.defaults.headers.common = {}
    }

    async login(body) {
        const { data } = await clientFetch.post('user/login', body);
        const { accessToken } = data;

        this.setToken(accessToken);
    }

    async register(body) {
        const { data } = await clientFetch.post('user/register', body);
        const { accessToken } = data;

        this.setToken(accessToken);
    }

    async logout() {
        const { data } = await clientFetch.get('user/logout');

        this.clearToken();
        return data
    }

    async refresh() {                                            // TODO
        const { data } = await clientFetch.post('user/refresh');
        const { accessToken } = data;

        this.setToken(accessToken);
    }
};

export const authService = new AuthService;

clientFetch.interceptors.request.use((request) => {
    const token = authService.getToken();
    if (token) {
        request.headers = {
            ...request.headers,
            Authorization: `Bearer ${token}`,
        }
    };

    return request;
});

clientFetch.interceptors.response.use(
    (response) => response,
    async (error) => {
        const errorCode = error.response?.status

        if (errorCode === 401) {
            try {
                return await authService.refresh();
            } catch (e) {
                // router.push('/auth/login')
                return Promise.reject(error);
            }
        } else if (errorCode === 500) {
            // router.push('/auth/login')
            return Promise.reject(error)
        }

        return Promise.reject(error);
    }
);