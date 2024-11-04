import { clientFetch } from "../clientFetch";

export const login = (body) => {
    return clientFetch.post('user/login', body);
};

export const registerUser = (body) => {
    return clientFetch.post('user/register', body);
};

export const logout = () => {
    return clientFetch.get('user/logout');
};

export const refresh = () => {
    return clientFetch.post('user/refresh');
};

export const getUserInfo = () => {
    return clientFetch.get('user/me');
};
