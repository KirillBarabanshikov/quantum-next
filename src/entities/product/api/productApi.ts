import { useQuery } from '@tanstack/react-query';

import { instance } from '@/shared/api';

import { IProduct } from '../model';

const useProductsQuery = () => {
    return useQuery<IProduct[], Error>({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await instance.get<IProduct[]>('/products');
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

export { useProductDetailsQuery, useProductsQuery };
