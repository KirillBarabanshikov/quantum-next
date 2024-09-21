'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { CategoryCard, useCategoriesQuery } from '@/entities/category';
import { Skeleton } from '@/shared/ui';

import styles from './CategoriesList.module.scss';

interface ICategoriesListProps {
    max?: number;
    className?: string;
}

export const CategoriesList: FC<ICategoriesListProps> = ({ max, className }) => {
    const { data: categories, isLoading } = useCategoriesQuery();

    return (
        <div className={clsx(className)}>
            <div className={'container'}>
                <div className={styles.categoriesList}>
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} height={305} />)
                        : categories
                              ?.slice(0, max)
                              .map((category) => <CategoryCard key={category.id} category={category} />)}
                </div>
            </div>
        </div>
    );
};
