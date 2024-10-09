import axios from 'axios';

import { API_URL } from '../consts';

export const apiClient = axios.create({
    baseURL: API_URL + '/api',
});
