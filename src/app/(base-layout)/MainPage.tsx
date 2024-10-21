'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { categoryApi } from '@/entities/category';
import { productApi } from '@/entities/product';
import { Button } from '@/shared/ui';
import {
    Advantages,
    CategoriesList,
    MainBanner,
    NewCollectionBanner,
    ProductsCarousel,
    QuestionBanner,
} from '@/widgets';

import styles from './MainPage.module.scss';

export const MainPage = () => {
    const router = useRouter();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategoriesWithChildren,
    });

    const { data: newProducts } = useQuery({
        queryKey: ['new-products'],
        queryFn: productApi.fetchNewProducts,
    });

    const { data: popularProducts } = useQuery({
        queryKey: ['popular-products'],
        queryFn: productApi.fetchPopularProducts,
    });

    return (
        <div className={clsx(styles.mainPage, 'page', 'sections')}>
            <div>
                <MainBanner className={styles.mainBanner} />
                <div className={'container'}>
                    <CategoriesList categories={categories} max={8} />
                    <Button
                        variant={'outline'}
                        fullWidth
                        onClick={() => router.push('/catalog')}
                        className={styles.button}
                    >
                        Каталог
                    </Button>
                </div>
            </div>
            <ProductsCarousel title={'Новинки'} products={newProducts} />
            <ProductsCarousel title={'Популярные'} products={popularProducts} />
            <NewCollectionBanner />
            <Advantages />
            <QuestionBanner />
        </div>
    );
};
