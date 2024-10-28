'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';

import { productApi } from '@/entities/product';
import { Radio } from '@/shared/ui';
import { FavoritesList, ProductsCarousel } from '@/widgets';

import styles from './FavoritesPage.module.scss';

const options = [
    { label: 'Неважно', value: '' },
    { label: 'В наличии', value: 'true' },
    { label: 'Нет в наличии', value: 'false' },
];

export const FavoritesPage = () => {
    const [stock, setStock] = useState<string>('');

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
                        {options.map((option, index) => (
                            <Radio
                                key={index}
                                label={option.label}
                                value={option.value}
                                variant={'filters'}
                                name={'stock'}
                                checked={stock === option.value}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        ))}
                    </div>
                    <div className={clsx(styles.list, 'sections')}>
                        <FavoritesList stock={stock} />
                        <ProductsCarousel title={'Новинки'} products={newProducts} withContainer={false} />
                        <ProductsCarousel title={'Популярные'} products={popularProducts} withContainer={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};
