import { apiClient } from '@/shared/api';

import { IOrderBody } from './types';

export async function createOrder(body: IOrderBody) {
    try {
        await apiClient.post('/orders/create', body);
    } catch (e) {
        console.error(e);
        throw new Error(`${e}`);
    }
}
