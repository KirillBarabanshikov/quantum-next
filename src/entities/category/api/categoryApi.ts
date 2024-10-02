import { useQuery } from '@tanstack/react-query';

import { instance } from '@/shared/api';

import { ICategory } from '../model';

const useCategoriesQuery = () => {
    return useQuery<ICategory[], Error>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await instance.get<ICategory[]>('/categories');
            return response.data;
        },
    });
};

const useCategoryByIdQuery = (id: number | string) => {
    return useQuery<ICategory, Error>({
        queryKey: ['category', id],
        queryFn: async () => {
            const response = await instance.get<ICategory>(`/categories/${id}`);
            return response.data;
        },
    });
};

export { useCategoriesQuery, useCategoryByIdQuery };
