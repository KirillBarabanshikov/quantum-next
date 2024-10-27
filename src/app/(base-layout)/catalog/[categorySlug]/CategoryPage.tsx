'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { categoryApi } from '@/entities/category';
import { IProduct, productApi, TProductFilters } from '@/entities/product';
import { Filters } from '@/features/filter';
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
    const [productsList, setProductsList] = useState<IProduct[]>([]);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('');
    const [currentFilters, setCurrentFilters] = useState<TProductFilters | undefined>(undefined);
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const searchParams = useSearchParams();

    const { data: category } = useQuery({
        queryKey: ['category', categorySlug],
        queryFn: () => categoryApi.fetchCategoryById(categorySlug),
    });

    const { data: products, isLoading } = useQuery({
        queryKey: ['products', category?.id, sort, searchParams.toString()],
        queryFn: () =>
            productApi.fetchProducts({
                page: 1,
                categoryId: categorySlug,
                sort,
                filters: currentFilters,
            }),
        placeholderData: keepPreviousData,
        enabled: !!currentFilters,
        refetchOnWindowFocus: false,
    });

    const handleLoadMore = async () => {
        const currentPage = page + 1;
        setPage(currentPage);
        const products = await productApi.fetchProducts({
            page: currentPage,
            categoryId: categorySlug,
            sort,
            filters: currentFilters,
        });
        setProductsList((prev) => [...prev, ...(products?.products || [])]);
    };

    useEffect(() => {
        if (!products) return;
        setProductsList(products.products);
        setPage(1);
    }, [products]);

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
                    <div className={styles.catalogWrap}>
                        {category && (
                            <Filters
                                categoryId={category.id}
                                currentFilters={currentFilters}
                                setCurrentFilters={setCurrentFilters}
                            />
                        )}
                        <div className={styles.catalog}>
                            <div className={styles.sort}>
                                <Dropdown
                                    options={options}
                                    value={sort}
                                    onChange={(value) => setSort(value as string)}
                                    position={'right'}
                                />
                            </div>
                            <ProductsList
                                products={productsList}
                                isLoading={isLoading}
                                className={styles.productsList}
                            />
                            {(products?.totalPages || 1) > page && (
                                <Button fullWidth onClick={handleLoadMore} className={styles.more}>
                                    Загрузить еще
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <CallBanner />
        </div>
    );
};
