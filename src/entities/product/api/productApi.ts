import { apiClient } from '@/shared/api';

import { mapProduct } from '../lib';
import { IProduct } from '../model';
import { IProductParams } from './types';

export const fetchProducts = async (
    params: IProductParams = {},
): Promise<{ products: IProduct[]; total: number } | undefined> => {
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

        return {
            products: response.data.map(mapProduct),
            total: response.headers['articles-total'],
        };
    } catch (error) {
        console.error(error);
    }
};

export const fetchProductById = async (id: number | string): Promise<IProduct | undefined> => {
    try {
        const response = await apiClient.get<IProduct>(`/articles/${id}`);
        return mapProduct(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const fetchNewProducts = async (): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/articles/new');
        return response.data.map(mapProduct);
    } catch (error) {
        console.error(error);
    }
};

export const fetchPopularProducts = async (): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/articles/popular');
        return response.data.map(mapProduct);
    } catch (error) {
        console.error(error);
    }
};

export const fetchProductsByIds = async (ids: number[]): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/articlesByIds', { params: { ids } });
        return response.data.map(mapProduct);
    } catch (error) {
        console.error(error);
    }
};
