'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { productApi } from '@/entities/product';
import { Radio } from '@/shared/ui';
import { FavoritesList, ProductsCarousel } from '@/widgets';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
    const { data: newProducts } = useQuery({
        queryKey: ['new-products'],
        queryFn: productApi.fetchNewProducts,
    });

    const { data: popularProducts } = useQuery({
        queryKey: ['popular-products'],
        queryFn: productApi.fetchPopularProducts,
    });

    return (
        <div className={clsx(styles.favoritesPage, 'page')}>
            <div className={'container'}>
                <div className={styles.favoritesWrap}>
                    <div className={styles.sort}>
                        <p>Наличие товара</p>
                        <Radio label={'Неважно'} variant={'filters'} name={'stock'} />
                        <Radio label={'В наличии'} variant={'filters'} name={'stock'} />
                        <Radio label={'Нет в наличии'} variant={'filters'} name={'stock'} />
                    </div>
                    <div className={clsx(styles.list, 'sections')}>
                        <FavoritesList />
                        <ProductsCarousel title={'Новинки'} products={newProducts} withContainer={false} />
                        <ProductsCarousel title={'Популярные'} products={popularProducts} withContainer={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};
