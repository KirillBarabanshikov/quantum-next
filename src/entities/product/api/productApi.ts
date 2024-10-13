import { apiClient } from '@/shared/api';

import { mapProduct } from '../lib';
import { IProduct } from '../model';
import { IProductParams } from './types';

export const fetchProducts = async (params: IProductParams = {}): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/articles', {
            params: {
                query: params.query,
                page: params.page,
                limit: params.limit,
                'category.id': params.categoryId,
                stock: params.stock,
                sort: params.sort,
                filters: params.filters,
                price: params.price,
            },
        });
        return response.data.map(mapProduct);
    } catch (error) {
        console.error(error);
    }
};
