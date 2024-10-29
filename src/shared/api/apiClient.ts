import axios from 'axios';
import Cookies from 'js-cookie';

import { sessionApi } from '@/entities/session';

import { API_URL } from '../consts';

export const apiClient = axios.create({
    baseURL: API_URL + '/api',
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
        if (error.response?.status === 401) {
            sessionApi.logout();
            window.location.reload();
        }

        return Promise.reject(error);
    },
);
