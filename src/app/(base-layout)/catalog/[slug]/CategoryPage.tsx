'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { categoryApi } from '@/entities/category';
import { IProduct, productApi } from '@/entities/product';
import { Breadcrumbs, Button, Dropdown } from '@/shared/ui';
import { ProductsList } from '@/widgets';
import { CallBanner } from '@/widgets/Banners';

import styles from './CategoryPage.module.scss';

const options = [
    { label: 'Сначала популярные', value: '' },
    { label: 'Сначала дешевле', value: 'price:asc' },
    { label: 'Сначала дороже', value: 'price:desc' },
    { label: 'Сначала новые', value: 'created:desc' },
    { label: 'Сначала старые', value: 'created:asc' },
];

const breadcrumbs = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
];

export const CategoryPage = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('');
    const [productsList, setProductsList] = useState<IProduct[]>([]);
    const { slug } = useParams<{ slug: string }>();

    const { data: category } = useSuspenseQuery({
        queryKey: ['category', slug],
        queryFn: () => categoryApi.fetchCategoryById(slug),
    });

    const { data: products } = useQuery({
        queryKey: ['products', slug, sort],
        queryFn: () => productApi.fetchProducts({ page: 1, categoryId: slug, sort: sort }),
        staleTime: 0,
    });

    useEffect(() => {
        if (!products) return;
        setProductsList(products);
        setPage(1);
    }, [products]);

    const handleLoadMore = async () => {
        const currentPage = page + 1;
        setPage(currentPage);
        const products = await productApi.fetchProducts({ page: currentPage, categoryId: slug, sort });
        setProductsList((prev) => [...prev, ...(products || [])]);
    };

    return (
        <div className={styles.categoryPage}>
            <section className={styles.categorySection}>
                <div className={clsx(styles.titleContainer, 'container')}>
                    <Breadcrumbs
                        links={[...breadcrumbs, { text: category?.title ?? '' }]}
                        className={styles.breadcrumbs}
                    />
                    <h1 className={'title'}>{category?.title}</h1>
                </div>
                <div className={clsx(styles.categoryContainer, 'container')}>
                    {/*<Filters className={styles.filters} />*/}
                    <div className={styles.productsContainer}>
                        <div className={styles.topFilters}>
                            <div className={styles.topFiltersList}></div>
                            <Dropdown
                                options={options}
                                value={sort}
                                onChange={(value) => setSort(value as string)}
                                position={'right'}
                            />
                        </div>
                        <ProductsList products={productsList} isLoading={!productsList.length} />
                        {category && category.total > productsList.length && (
                            <Button onClick={handleLoadMore} className={styles.more}>
                                Загрузить еще
                            </Button>
                        )}
                    </div>
                </div>
            </section>
            <CallBanner />
        </div>
    );
};
