'use client';

import clsx from 'clsx';
import Error from 'next/error';
import { FC } from 'react';

import { useCategoryByIdQuery } from '@/entities/category';
import { useProductsQuery } from '@/entities/product';
import { Filters } from '@/feature/catalog';
import { Breadcrumbs, Button, Dropdown, Skeleton } from '@/shared/ui';
import { ProductsList } from '@/widgets';
import { CallBanner } from '@/widgets/Banners';

import styles from './CategoryPage.module.scss';

const options = [
    { label: 'Сначала популярные', value: 'Сначала популярные' },
    { label: 'Сначала дешевле', value: 'Сначала дешевле' },
    { label: 'Сначала дороже', value: 'Сначала дороже' },
    { label: 'Сначала новые', value: 'Сначала новые' },
    { label: 'Сначала старые', value: 'Сначала старые' },
];

const breadcrumbs = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
];

interface ICategoryPageProps {
    slug: string;
}

export const CategoryPage: FC<ICategoryPageProps> = ({ slug }) => {
    const { data: category, isError, isLoading: isCategoryLoading } = useCategoryByIdQuery(slug);
    const { data: products, isLoading: isProductsLoading } = useProductsQuery({ categoryId: slug });

    if (isError) {
        return <Error statusCode={404} />;
    }

    return (
        <div className={styles.categoryPage}>
            <section className={styles.categorySection}>
                <div className={clsx(styles.titleContainer, 'container')}>
                    <Breadcrumbs
                        links={[...breadcrumbs, { text: category?.title ?? '' }]}
                        className={styles.breadcrumbs}
                    />
                    <h1 className={'title'}>
                        {isCategoryLoading ? <Skeleton width={100} height={27} /> : category?.title}
                    </h1>
                </div>
                <div className={clsx(styles.categoryContainer, 'container')}>
                    <Filters className={styles.filters} />
                    <div className={styles.productsContainer}>
                        <div className={styles.topFilters}>
                            <div className={styles.topFiltersList}></div>
                            <Dropdown
                                options={options}
                                value={'Сначала популярные'}
                                onChange={(value) => console.log(value)}
                                position={'right'}
                            />
                        </div>
                        <ProductsList products={products} isLoading={isProductsLoading} />
                        <Button className={styles.more}>Загрузить еще</Button>
                    </div>
                </div>
            </section>
            <CallBanner />
        </div>
    );
};
