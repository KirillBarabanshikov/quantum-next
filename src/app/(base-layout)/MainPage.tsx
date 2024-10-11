'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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

    const { data: newProducts, isLoading: isNewProductsLoading } = useSuspenseQuery({
        queryKey: ['new-products'],
        queryFn: productApi.fetchNewProducts,
    });
    const { data: popularProducts, isLoading: isPopularProductsLoading } = useSuspenseQuery({
        queryKey: ['popular-products'],
        queryFn: productApi.fetchNewProducts,
    });

    return (
        <div className={styles.mainPage}>
            <div>
                <MainBanner className={styles.mainBanner} />
                <CategoriesList className={styles.categoriesList} max={isMatch ? 6 : 8} />
                <div className={'container'}>
                    <Button
                        variant={'outline'}
                        onClick={() => router.push('/catalog')}
                        fullWidth={isMatch}
                        className={styles.button}
                    >
                        {isMatch ? 'Показать еще' : 'Каталог'}
                    </Button>
                </div>
            </div>
            <ProductsCarousel title={'Новинки'} products={newProducts} isLoading={isNewProductsLoading} />
            <ProductsCarousel title={'Популярное'} products={popularProducts} isLoading={isPopularProductsLoading} />
            <NewCollectionBanner />
            <Advantages />
            <QuestionBanner />
        </div>
    );
};
