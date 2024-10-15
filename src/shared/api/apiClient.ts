import axios from 'axios';
import Cookies from 'js-cookie';

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
