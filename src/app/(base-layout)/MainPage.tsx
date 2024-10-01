'use client';

import { useRouter } from 'next/navigation';

import { useNewProductsQuery, usePopularProductsQuery } from '@/entities/product';
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
    const { data: newProducts, isLoading: isNewProductsLoading } = useNewProductsQuery();
    const { data: popularProducts, isLoading: isPopularProductsLoading } = usePopularProductsQuery();

    return (
        <div className={styles.mainPage}>
            <div>
                <MainBanner className={styles.mainBanner} />
                <CategoriesList className={styles.categoriesList} max={8} />
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
            {/*<ProductsCarousel title={'Аккумуляторы'} />*/}
            <Advantages />
            <QuestionBanner />
        </div>
    );
};
