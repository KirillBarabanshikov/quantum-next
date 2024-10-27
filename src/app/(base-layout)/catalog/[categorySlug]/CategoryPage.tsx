'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { categoryApi } from '@/entities/category';
import { IProduct, productApi, TProductFilters } from '@/entities/product';
import { Filters } from '@/features/filter';
import { TopFilters } from '@/features/filter/ui';
import { sortOptions } from '@/shared/consts';
import { Breadcrumbs, Button, Dropdown } from '@/shared/ui';
import { CallBanner, ProductsList } from '@/widgets';

import styles from './CategoryPage.module.scss';

const breadcrumbs = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
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
                <div className={clsx(styles.titleWrap, 'container')}>
                    <Breadcrumbs
                        breadcrumbs={[...breadcrumbs, { text: category?.title ?? '' }]}
                        className={styles.breadcrumbs}
                    />
                    <h1 className={'title'}>{category?.title}</h1>
                </div>
                {category && (
                    <TopFilters
                        categoryId={category.id}
                        currentFilters={currentFilters}
                        setCurrentFilters={setCurrentFilters}
                        sort={sort}
                        setSort={setSort}
                        className={clsx(styles.mobileTopFilters, 'scrollbar-hide')}
                    />
                )}
                <div className={clsx(styles.catalogWrap, 'container')}>
                    {category && (
                        <Filters
                            categoryId={category.id}
                            currentFilters={currentFilters}
                            setCurrentFilters={setCurrentFilters}
                            className={styles.filters}
                        />
                    )}
                    <div className={styles.catalog}>
                        <div className={styles.topFiltersWrap}>
                            {category && (
                                <TopFilters
                                    categoryId={category.id}
                                    currentFilters={currentFilters}
                                    setCurrentFilters={setCurrentFilters}
                                    className={styles.topFilters}
                                />
                            )}
                            <Dropdown
                                options={sortOptions}
                                value={sort}
                                onChange={(value) => setSort(value as string)}
                                position={'right'}
                                className={styles.sort}
                            />
                        </div>
                        <ProductsList products={productsList} isLoading={isLoading} className={styles.productsList} />
                        {(products?.totalPages || 1) > page && (
                            <Button fullWidth onClick={handleLoadMore} className={styles.more}>
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
