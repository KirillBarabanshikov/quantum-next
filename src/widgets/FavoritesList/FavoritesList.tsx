'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

import { useFavoritesStore } from '@/entities/product';
import { productApi } from '@/entities/product';
import { PickedFilter } from '@/features/filter';
import SortIcon from '@/shared/assets/icons/sort.svg';
import StarIcon from '@/shared/assets/icons/star.svg';
import { BottomSheet, Button, Dropdown, Radio } from '@/shared/ui';
import { ProductsList } from '@/widgets';

import styles from './FavoritesList.module.scss';

const options = [
    { label: 'Сначала новые', value: 'created:desc' },
    { label: 'Сначала старые', value: 'created:asc' },
    { label: 'Сначала дешевые', value: 'price:asc' },
    { label: 'Сначала дорогие', value: 'price:desc' },
];

interface IFavoritesListProps {
    stock?: string;
}

export const FavoritesList: FC<IFavoritesListProps> = ({ stock }) => {
    const [selectedSort, setSelectedSort] = useState('created:desc');
    const [sort, setSort] = useState('created:desc');
    const [isOpen, setIsOpen] = useState(false);
    const { productsIds } = useFavoritesStore();

    const { data: products, isLoading } = useQuery({
        queryKey: ['favorites', productsIds.length > 0, selectedSort, stock],
        queryFn: () =>
            productsIds.length > 0
                ? productApi.fetchProductsByIds(productsIds, selectedSort, stock ? stock : undefined)
                : [],
        staleTime: 0,
        placeholderData: keepPreviousData,
    });

    if ((!products || products.length === 0) && !isLoading) {
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
            {!isLoading && (
                <>
                    <Dropdown
                        options={options}
                        value={selectedSort}
                        onChange={(value) => setSelectedSort(value as string)}
                        className={styles.dropdown}
                    />
                    <div className={styles.selectedSort}>
                        <span>{options.find((option) => option.value === selectedSort)?.label}</span>
                        <PickedFilter onClick={() => setIsOpen(true)} withIcon={false}>
                            <SortIcon />
                        </PickedFilter>
                    </div>
                </>
            )}
            <ProductsList products={products} isLoading={isLoading} />
            <BottomSheet
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setSort(selectedSort);
                }}
                title={'Фильтры'}
            >
                <div className={styles.list}>
                    {options.map((option) => (
                        <Radio
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            name={'sort'}
                            variant={'filters'}
                            checked={option.value === sort}
                            onChange={(e) => setSort(e.target.value)}
                        />
                    ))}
                </div>
                <Button
                    fullWidth
                    className={styles.button}
                    onClick={() => {
                        setSelectedSort(sort);
                        setIsOpen(false);
                    }}
                >
                    Применить
                </Button>
            </BottomSheet>
        </div>
    );
};
