import { clientFetch } from "../clientFetch";

export const TOKEN_KEY = 'token';

class AuthService {
    #token = null;

    isLoggedIn() {
        return Boolean(this.#token);
    }

    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
        clientFetch.defaults.headers.common = { Authorization: `Bearer ${token}` };
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

    async refresh() {
        return clientFetch.post('user/refresh');
    }
};

export const authService = new AuthService;