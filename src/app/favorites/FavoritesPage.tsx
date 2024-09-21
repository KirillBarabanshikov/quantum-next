'use client';

import clsx from 'clsx';

// import { ProductCard } from '@/entities/product';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import { Dropdown, Radio } from '@/shared/ui';
import { ProductsCarousel } from '@/widgets';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
    return (
        <div className={styles.favoritesPage}>
            <div className={clsx(styles.container, 'container')}>
                <div className={styles.filters}>
                    <div className={styles.title}>Наличие товара</div>
                    <Radio label={'Неважно'} name={'fileter'} variant={'filters'} />
                    <Radio label={'В наличии'} name={'fileter'} variant={'filters'} />
                    <Radio label={'Нет в наличии'} name={'fileter'} variant={'filters'} />
                </div>
                <div className={styles.favoritesWrap}>
                    {false ? (
                        <>
                            <Dropdown
                                options={[
                                    { label: 'Сначала популярные', value: '1' },
                                    { label: 'Сначала дешевле', value: '2' },
                                    { label: 'Сначала дороже', value: '3' },
                                    { label: 'Сначала новые', value: '4' },
                                    { label: 'Сначала старые', value: '5' },
                                ]}
                                value={'1'}
                                onChange={() => {}}
                            />
                            <div className={styles.favoritesList}>
                                {/*{Array.from({ length: 8 }).map((_, index) => {*/}
                                {/*    return <ProductCard key={index} product={}/>;*/}
                                {/*})}*/}
                            </div>
                        </>
                    ) : (
                        <div className={styles.placeholder}>
                            <GradeIcon />
                            <div className={styles.placeholderTitle}>В избранном пусто</div>
                            <p>Добавьте товары, чтобы не искать их снова</p>
                        </div>
                    )}
                    <div className={styles.productsWrap}>
                        <ProductsCarousel title={'Новинки'} />
                        <ProductsCarousel title={'Популярное'} />
                    </div>
                </div>
            </div>
        </div>
    );
};
