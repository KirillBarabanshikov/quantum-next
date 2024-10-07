import { BASE_URL } from '@/shared/consts';

import { ICategoryDto } from '../api';
import { ICategory } from '../model';

export function mapCategory(category: ICategoryDto): ICategory {
    return {
        ...category,
        image: BASE_URL + category.image,
    };
}
