import { useMutation, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/api';

import { IProduct } from '../model';
import { ICartBody, IProductParams } from './types';

export const fetchProducts = async (params: IProductParams = {}): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/products', {
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
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchNewProducts = async (): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/products/new');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchPopularProducts = async (): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get<IProduct[]>('/products/popular');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchProductsByIds = async (ids: number[]): Promise<IProduct[] | undefined> => {
    try {
        const response = await apiClient.get('/productsByIds', {
            params: { ids },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchProductById = async (id: number | string): Promise<IProduct | undefined> => {
    try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const useProductsQuery = (params: IProductParams = {}) => {
    return useQuery<IProduct[], Error>({
        queryKey: ['products', params.query, params.page, params.limit, params.categoryId, params.sort],
        queryFn: async () => {
            const response = await apiClient.get<IProduct[]>('/products', {
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
            return response.data;
        },
    });
};

const useProductDetailsQuery = (id: string | number) => {
    return useQuery<IProduct, Error>({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await apiClient.get<IProduct>(`/products/${id}`);
            return response.data;
        },
    });
};

const useNewProductsQuery = () => {
    return useQuery<IProduct[], Error>({
        queryKey: ['new-products'],
        queryFn: async () => {
            const response = await apiClient.get<IProduct[]>(`/products/new`);
            return response.data;
        },
    });
};

const usePopularProductsQuery = () => {
    return useQuery<IProduct[], Error>({
        queryKey: ['popular-products'],
        queryFn: async () => {
            const response = await apiClient.get<IProduct[]>(`/products/popular`);
            return response.data;
        },
    });
};

const useAddToCartMutation = () => {
    return useMutation<void, Error, ICartBody>({
        mutationFn: async ({ userId, productId }) => {
            await apiClient.post(`/product_carts`, {
                user: `/api/users/${userId}`,
                product: `/api/articles/${productId}`,
            });
        },
    });
};

const useDeleteFromCartMutation = () => {
    return useMutation<void, Error, string | number>({
        mutationFn: async (id) => {
            await apiClient.delete(`/product_carts/${id}`);
        },
    });
};

const useDropCartMutation = () => {
    return useMutation<void, Error, { cartItemId: number }[]>({
        mutationFn: async (body) => {
            await apiClient.post(`/productCarts/drop`, { cartItems: body });
        },
    });
};

export {
    useAddToCartMutation,
    useDeleteFromCartMutation,
    useDropCartMutation,
    useNewProductsQuery,
    usePopularProductsQuery,
    useProductDetailsQuery,
    useProductsQuery,
};
