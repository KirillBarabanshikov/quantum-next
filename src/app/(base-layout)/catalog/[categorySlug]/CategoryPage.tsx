'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { categoryApi } from '@/entities/category';
import { IProduct, productApi } from '@/entities/product';
import { Breadcrumbs, Button, Dropdown } from '@/shared/ui';
import { CallBanner, ProductsList } from '@/widgets';

import styles from './CategoryPage.module.scss';

const breadcrumbs = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
];

const options = [
    { label: 'Сначала популярные', value: '' },
    { label: 'Сначала дешевле', value: 'price:asc' },
    { label: 'Сначала дороже', value: 'price:desc' },
    { label: 'Сначала новые', value: 'created:desc' },
    { label: 'Сначала старые', value: 'created:asc' },
];

export const CategoryPage = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('');
    const [productsList, setProductsList] = useState<IProduct[]>([]);
    const { categorySlug } = useParams<{ categorySlug: string }>();

    const { data: category } = useQuery({
        queryKey: ['category', categorySlug],
        queryFn: () => categoryApi.fetchCategoryById(categorySlug),
    });

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', category?.id, sort],
        queryFn: () => productApi.fetchProducts({ page: 1, categoryId: category?.id, sort: sort }),
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (!products) return;
        setProductsList(products);
        setPage(1);
    }, [products]);

    const handleLoadMore = async () => {
        const currentPage = page + 1;
        setPage(currentPage);
        const products = await productApi.fetchProducts({ page: currentPage, categoryId: categorySlug, sort });
        setProductsList((prev) => [...prev, ...(products || [])]);
    };

    return (
        <div className={clsx(styles.categoryPage, 'page', 'sections')}>
            <section>
                <div className={'container'}>
                    <div className={styles.titleWrap}>
                        <Breadcrumbs
                            breadcrumbs={[...breadcrumbs, { text: category?.title ?? '' }]}
                            className={styles.breadcrumbs}
                        />
                        <h1 className={'title'}>{category?.title}</h1>
                    </div>
                    <div className={styles.catalog}>
                        <div className={styles.sort}>
                            <Dropdown
                                options={options}
                                value={sort}
                                onChange={(value) => setSort(value as string)}
                                position={'right'}
                            />
                        </div>
                        <ProductsList products={productsList} isLoading={isLoading} className={styles.productsList} />
                        <Button fullWidth onClick={handleLoadMore} className={styles.more}>
                            Загрузить еще
                        </Button>
                    </div>
                </div>
            </section>
            <CallBanner />
        </div>
    );
};
