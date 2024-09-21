'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { CategoryCard, useCategoriesQuery } from '@/entities/category';

import styles from './CategoriesList.module.scss';

interface ICategoriesListProps {
    max?: number;
    className?: string;
}

export const CategoriesList: FC<ICategoriesListProps> = ({ max, className }) => {
    const { data: categories } = useCategoriesQuery();

    return (
        <div className={clsx(className)}>
            <div className={'container'}>
                <div className={styles.categoriesList}>
                    {categories &&
                        categories
                            .slice(0, max)
                            .map((category) => <CategoryCard key={category.id} category={category} />)}
                </div>
            </div>
        </div>
    );
};
