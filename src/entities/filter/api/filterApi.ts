import { apiClient } from '@/shared/api';

import { IFilter } from '../model';

export const fetchFilters = async (categoryId: string | number): Promise<IFilter[] | undefined> => {
    try {
        const responseFilters = await apiClient.get<IFilter[]>('/filters', { params: { categoryId } });
        const responsePrices = await apiClient.get<{ min: number; max: number }>('/prices', { params: { categoryId } });
        return [
            {
                id: -1,
                title: 'Цена',
                values: [responsePrices.data.min.toString(), responsePrices.data.max.toString()],
                filterType: 'price',
            },
            ...responseFilters.data,
        ];
    } catch (error) {
        console.error(error);
    }
};
