import axios from 'axios';
import Cookies from 'js-cookie';

import { useSessionStore } from '@/entities/session/model';

import { BASE_URL } from '../consts';

export const apiClient = axios.create({
    baseURL: BASE_URL + '/api',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const { logout } = useSessionStore.getState();

        if (error.response?.status === 401) {
            logout();
        }

        return Promise.reject(error);
    },
);
