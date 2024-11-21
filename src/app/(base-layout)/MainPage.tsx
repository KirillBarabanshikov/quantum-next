'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { categoryApi } from '@/entities/category';
import { productApi } from '@/entities/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
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
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

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
        <div className={clsx('page', 'sections', styles.mainPage)}>
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
                        {isMatch ? 'Показать ещё' : 'Каталог'}
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
