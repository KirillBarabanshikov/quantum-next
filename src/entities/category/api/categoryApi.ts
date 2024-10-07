import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/api';

import { mapCategory } from '../lib';
import { ICategory } from '../model';
import { ICategoryDto } from './types';

export const fetchCategories = async (): Promise<ICategory[] | undefined> => {
    try {
        const response = await apiClient.get<ICategoryDto[]>('/categories');
        return response.data.map(mapCategory);
    } catch (error) {
        console.error(error);
    }
};

export const fetchCategoryById = async (id: number | string): Promise<ICategory | undefined> => {
    try {
        const response = await apiClient.get<ICategoryDto>(`/categories/${id}`);
        return mapCategory(response.data);
    } catch (error) {
        console.error(error);
    }
};

const useCategoriesQuery = () => {
    return useQuery<ICategory[], Error>({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await apiClient.get<ICategory[]>('/categories');
            return response.data;
        },
    });
};

const useCategoryByIdQuery = (id: number | string) => {
    return useQuery<ICategory, Error>({
        queryKey: ['category', id],
        queryFn: async () => {
            const response = await apiClient.get<ICategory>(`/categories/${id}`);
            return response.data;
        },
    });
};

export { useCategoriesQuery, useCategoryByIdQuery };
