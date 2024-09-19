import axios from 'axios';
import Cookies from 'js-cookie';

import { BASE_URL } from '../consts';

export const instance = axios.create({
    baseURL: BASE_URL + '/api',
    headers: Cookies.get('token') ? { Authorization: `Bearer ${Cookies.get('token')}` } : {},
});
