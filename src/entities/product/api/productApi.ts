import { apiClient } from '@/shared/api';

import { mapProduct } from '../lib';
import { IProduct } from '../model';
import { IProductParams } from './types';

export const fetchProducts = async (
    params: IProductParams = {},
): Promise<{ products: IProduct[]; total: number } | undefined> => {
    try {
        let filtersParams = '';

        if (params.filters) {
            filtersParams = Object.entries(params.filters)
                .filter(([, filter]) => filter.value.length > 0)
                .map(([key, filter]) => {
                    return filter.value
                        .map((value, index) => {
                            if (
                                filter.type === 'list-multiple' ||
                                filter.type === 'buttons' ||
                                filter.type === 'colors' ||
                                filter.type === 'checkboxes'
                            ) {
                                return `filters[${key}][]=${value}`;
                            } else if (filter.type === 'range') {
                                return `filters[${key}][${index === 0 ? 'gte' : 'lte'}]=${value}`;
                            } else {
                                return `filters[${key}]=${value}`;
                            }
                        })
                        .join('&');
                })
                .join('&');
        }

        const queryFilters = filtersParams ? `?${filtersParams}` : '';

        const response = await apiClient.get<IProduct[]>(`/articles${queryFilters}`, {
            params: {
                query: params.query,
                page: params.page,
                limit: params.limit,
                'category.id': params.categoryId,
                stock: params.stock,
                sort: params.sort,
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
