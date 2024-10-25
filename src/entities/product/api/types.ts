import { TFilterType } from '@/entities/filter';

export interface IProductParams {
    query?: string;
    page?: string | number;
    limit?: string | number;
    categoryId?: string | number;
    stock?: boolean;
    sort?: string;
    filters?: TProductFilters;
    price?: any[];
}

export type TProductFilters = Record<number, { value: string[]; type: TFilterType }>;
