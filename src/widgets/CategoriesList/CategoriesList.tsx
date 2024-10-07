'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC } from 'react';

import { categoryApi, CategoryCard } from '@/entities/category';

import styles from './CategoriesList.module.scss';

interface ICategoriesListProps {
    max?: number;
    className?: string;
}

export const CategoriesList: FC<ICategoriesListProps> = ({ max, className }) => {
    const { data: categories } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <div className={clsx(className)}>
            <div className={'container'}>
                <div className={styles.categoriesList}>
                    {categories
                        ?.slice(0, max)
                        .map((category) => <CategoryCard key={category.id} category={category} />)}
                </div>
            </div>
        </div>
    );
};
