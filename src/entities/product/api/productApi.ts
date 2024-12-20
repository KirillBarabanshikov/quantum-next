import { apiClient } from '@/shared/api';

import { mapProduct } from '../lib';
import { IProduct } from '../model';
import { IProductParams } from './types';

export const fetchProducts = async (
    params: IProductParams = {},
): Promise<{ products: IProduct[]; totalPages: number } | undefined> => {
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
                            } else if (filter.type === 'price') {
                                return `price[${index === 0 ? 'gte' : 'lte'}]=${value}`;
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
            totalPages: response.headers['articles-total-pages'],
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

export const fetchProductsByIds = async (
    ids: number[],
    sort?: string,
    stock?: string,
): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/articlesByIds', { params: { ids, sort, stock } });
        return response.data.map(mapProduct);
    } catch (error) {
        console.error(error);
    }
};

export const fetchProductBySlug = async (slug: string): Promise<IProduct | undefined> => {
    try {
        const response = await apiClient.get<IProduct>(`/article/slug`, { params: { slug } });
        return mapProduct(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const fetchFavoritesProducts = async (): Promise<number[] | undefined> => {
    try {
        const response = await apiClient.get<number[]>(`/product/favorite`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addProductsToFavorite = async (productId: number[]) => {
    try {
        await apiClient.post('/product/favorite/add', { articlesIds: productId });
    } catch (error) {
        console.error(error);
    }
};

export const deleteProductsFromFavorite = async (productId: number[]) => {
    try {
        await apiClient.post('/product/favorite/delete', { articlesIds: productId });
    } catch (error) {
        console.error(error);
    }
};
