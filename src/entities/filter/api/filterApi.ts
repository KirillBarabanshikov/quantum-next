import { apiClient } from '@/shared/api';

import { IFilter } from '../model';

export const fetchFilters = async (categoryId: string | number): Promise<IFilter[] | undefined> => {
    try {
        const response = await apiClient.get<IFilter[]>('/filters', { params: { categoryId } });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
