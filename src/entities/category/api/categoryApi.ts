import { apiClient } from '@/shared/api';

import { mapCategory } from '../lib';
import { ICategory } from '../model';
import { ICategoryDto } from './types';

export const fetchCategories = async (): Promise<ICategory[] | undefined> => {
    try {
        const response = await apiClient.get<ICategoryDto[]>('/categories/with-children');
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
