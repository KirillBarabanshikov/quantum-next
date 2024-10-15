'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useFavoritesStore } from '@/entities/product';
import { productApi } from '@/entities/product';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Dropdown } from '@/shared/ui';
import { ProductsList } from '@/widgets';

import styles from './FavoritesList.module.scss';

const options = [
    { label: 'Сначала популярные', value: '' },
    { label: 'Сначала дешевле', value: 'price:asc' },
    { label: 'Сначала дороже', value: 'price:desc' },
    { label: 'Сначала новые', value: 'created:desc' },
    { label: 'Сначала старые', value: 'created:asc' },
];

export const FavoritesList = () => {
    const { productsIds } = useFavoritesStore();

    const { data: products, isLoading } = useQuery({
        queryKey: ['favorites', productsIds],
        queryFn: () => productApi.fetchProductsByIds(productsIds),
        placeholderData: keepPreviousData,
    });

    if (!isLoading && !products) {
        return (
            <div className={styles.placeholder}>
                <StarIcon />
                <div className={styles.title}>В избранном пусто</div>
                <div className={styles.subtitle}>Добавьте товары, чтобы не искать их снова</div>
            </div>
        );
    }

    return (
        <div className={styles.favoritesWrap}>
            {!isLoading && <Dropdown options={options} value={''} onChange={() => {}} />}
            <ProductsList products={products} isLoading={isLoading} />
        </div>
    );
};
