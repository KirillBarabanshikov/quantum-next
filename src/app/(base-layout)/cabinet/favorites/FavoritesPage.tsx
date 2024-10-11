'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { productApi, ProductCard, useFavoritesStore } from '@/entities/product';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import { Dropdown } from '@/shared/ui';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
    const { favorites } = useFavoritesStore();

    const { data: products } = useQuery({
        queryKey: ['favorites', favorites.length],
        queryFn: () => productApi.fetchProductsByIds(favorites),
        enabled: !!favorites.length,
        placeholderData: keepPreviousData,
    });

    return (
        <div className={styles.favorites}>
            {products && !products.length ? (
                <>
                    <Dropdown options={[{ label: 'Сначала новые', value: '1' }]} value={'1'} onChange={() => {}} />
                    <div className={styles.favoritesList}>
                        {products.map((product) => {
                            return <ProductCard key={product.id} product={product} />;
                        })}
                    </div>
                </>
            ) : (
                <div className={styles.placeholder}>
                    <GradeIcon />
                    <div className={styles.placeholderTitle}>В избранном пусто</div>
                    <p>Добавьте товары, чтобы не искать их снова</p>
                </div>
            )}
        </div>
    );
};
