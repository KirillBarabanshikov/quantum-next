import { apiClient } from '@/shared/api';

import { mapCategory, mapCategoryWithChildren } from '../lib';
import { ICategory, ICategoryWithChildren } from '../model';
import { ICategoryDto, ICategoryWithChildrenDto } from './types';

export const fetchCategories = async (): Promise<ICategory[] | undefined> => {
    try {
        const response = await apiClient.get<ICategoryDto[]>('/categories/enters');
        return response.data.map(mapCategory);
    } catch (error) {
        console.error(error);
    }
};

export const fetchCategoriesWithChildren = async (): Promise<ICategoryWithChildren[] | undefined> => {
    try {
        const response = await apiClient.get<ICategoryWithChildrenDto[]>('/categories/with-children');
        return response.data.map(mapCategoryWithChildren);
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

export const fetchCategoryBySlug = async (slug: string): Promise<ICategory | undefined> => {
    try {
        const response = await apiClient.get<ICategoryDto>(`/categories/slug`, { params: { slug } });
        return mapCategory(response.data);
    } catch (error) {
        console.error(error);
    }
};
