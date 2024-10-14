import { API_URL } from '@/shared/consts';

import { ICategoryDto } from '../api';
import { ICategory } from '../model';

export function mapCategory(category: ICategoryDto): ICategory {
    return {
        ...category,
        image: API_URL + category.image,
    };
}
