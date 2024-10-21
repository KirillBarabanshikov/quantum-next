'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { categoryApi } from '@/entities/category';
import { CategoriesList } from '@/widgets';

import styles from './CatalogPage.module.scss';

export const CatalogPage = () => {
    const { data: categories } = useQuery({
        queryKey: ['categories-enters'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <div className={clsx(styles.catalogPage, 'page')}>
            <section className={'container'}>
                <h1 className={clsx(styles.title, 'title')}>Каталог</h1>
                <CategoriesList categories={categories} />
            </section>
        </div>
    );
};
