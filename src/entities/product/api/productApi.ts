import { useMutation, useQuery } from '@tanstack/react-query';

import { instance } from '@/shared/api';

import { IProduct } from '../model';
import { ICartBody } from './types';

const useProductsQuery = ({ page, categoryId }: { page?: string | number; categoryId?: string } = {}) => {
    return useQuery<IProduct[], Error>({
        queryKey: ['products', page, categoryId],
        queryFn: async () => {
            const response = await instance.get<IProduct[]>('/products', {
                params: { page, 'category.id': categoryId },
            });
            return response.data;
        },
    });
};

const useProductDetailsQuery = (id: string | number) => {
    return useQuery<IProduct, Error>({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await instance.get<IProduct>(`/products/${id}`);
            return response.data;
        },
    });
};

const useNewProductsQuery = () => {
    return useQuery<IProduct[], Error>({
        queryKey: ['new-products'],
        queryFn: async () => {
            const response = await instance.get<IProduct[]>(`/products/new`);
            return response.data;
        },
    });
};

const usePopularProductsQuery = () => {
    return useQuery<IProduct[], Error>({
        queryKey: ['popular-products'],
        queryFn: async () => {
            const response = await instance.get<IProduct[]>(`/products/popular`);
            return response.data;
        },
    });
};

const useAddToCartMutation = () => {
    return useMutation<void, Error, ICartBody>({
        mutationFn: async ({ userId, productId }) => {
            await instance.post(`/product_carts`, {
                user: `/api/users/${userId}`,
                product: `/api/articles/${productId}`,
            });
        },
    });
};

const useDeleteFromCartMutation = () => {
    return useMutation<void, Error, string | number>({
        mutationFn: async (id) => {
            await instance.delete(`/product_carts/${id}`);
        },
    });
};

const useDropCartMutation = () => {
    return useMutation<void, Error, { cartItemId: number }[]>({
        mutationFn: async (body) => {
            await instance.post(`/productCarts/drop`, { cartItems: body });
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
