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
        // console.log('logOut token after: ', this.#token);
    }

    async login(body) {
        const { data } = await clientFetch.post('user/login', body);
        const { accessToken } = data;
        // console.log('authService_data: ', data);

        this.setToken(accessToken);
        // return data
    }

    async register(body) {
        const { data } = await clientFetch.post('user/register', body);
        const { accessToken } = data;
        // console.log('Success Registration!: ', data);

        this.setToken(accessToken);
        // return data
    }

    async logout() {
        // console.log('logOut token before: ', this.#token)

        const { data } = await clientFetch.get('user/logout');
        // console.log('authService_data: ', data);

        this.clearToken();
        return data
    }

    async refresh() {
        return clientFetch.post('user/refresh');
    }
};

export const authService = new AuthService;