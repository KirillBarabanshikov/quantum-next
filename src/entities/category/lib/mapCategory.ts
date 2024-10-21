import { API_URL } from '@/shared/consts';

import { ICategoryDto, ICategoryWithChildrenDto } from '../api';
import { ICategory, ICategoryWithChildren } from '../model';

export function mapCategory(category: ICategoryDto): ICategory {
    return {
        ...category,
        image: API_URL + category.image,
    };
}

export function mapCategoryWithChildren(category: ICategoryWithChildrenDto): ICategoryWithChildren {
    return {
        ...category,
        categories: category.categories.map(mapCategoryWithChildren),
        image: API_URL + category.image,
    };
}
