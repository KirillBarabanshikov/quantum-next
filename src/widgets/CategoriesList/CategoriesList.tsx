'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { CategoryCard } from '@/entities/category';
import { Button } from '@/shared/ui';

import styles from './CategoriesList.module.scss';

interface ICategoriesListProps {
    className?: string;
}

export const CategoriesList: FC<ICategoriesListProps> = ({ className }) => {
    const router = useRouter();

    return (
        <div className={clsx(className)}>
            <div className={'container'}>
                <div className={styles.categoriesList}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <CategoryCard key={index} />
                    ))}
                </div>
                <Button variant={'outline'} onClick={() => router.push('/catalog')} className={styles.button}>
                    Каталог
                </Button>
            </div>
        </div>
    );
};
