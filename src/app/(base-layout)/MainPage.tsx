'use client';

import { useQuery } from '@tanstack/react-query';

import { categoryApi } from '@/entities/category';
import { CategoriesList } from '@/widgets';

export const MainPage = () => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <div className={'container'}>
            <CategoriesList categories={categories} max={8} />
        </div>
    );
};
