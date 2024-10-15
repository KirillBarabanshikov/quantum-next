import { apiClient } from '@/shared/api';

import { IUser } from '../model';

export const me = async () => {
    try {
        const response = await apiClient.get<IUser>('/me');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
