import { useQuery } from '@tanstack/react-query';

import { instance } from '@/shared/api';

import { IProduct } from '../model';

const useProductsQuery = ({ page, categoryId }: { page?: string; categoryId?: string } = {}) => {
    return useQuery<IProduct[], Error>({
        queryKey: ['products'],
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

export { useNewProductsQuery, usePopularProductsQuery,useProductDetailsQuery, useProductsQuery };
