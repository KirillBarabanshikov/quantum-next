import clsx from 'clsx';
import { FC } from 'react';

import { CategoryCard, ICategory } from '@/entities/category';

import styles from './CategoriesList.module.scss';

interface ICategoriesListProps {
    categories?: ICategory[];
    max?: number;
    className?: string;
}

export const CategoriesList: FC<ICategoriesListProps> = ({ categories, max, className }) => {
    return (
        <div className={clsx(styles.categoriesList, className)}>
            {categories?.slice(0, max).map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
    );
};
