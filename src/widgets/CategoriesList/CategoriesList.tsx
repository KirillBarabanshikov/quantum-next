import clsx from 'clsx';
import { FC } from 'react';

import { CategoryCard } from '@/entities/category';

import styles from './CategoriesList.module.scss';
import { Button } from '@/shared/ui';

interface ICategoriesListProps {
    className?: string;
}

export const CategoriesList: FC<ICategoriesListProps> = ({ className }) => {
    return (
        <div className={clsx(className)}>
            <div className={'container'}>
                <div className={styles.categoriesList}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <CategoryCard key={index} />
                    ))}
                </div>
                <Button variant={'outline'} className={styles.button}>
                    Каталог
                </Button>
            </div>
        </div>
    );
};
