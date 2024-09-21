'use client';

import { useRouter } from 'next/navigation';

import { useProductsQuery } from '@/entities/product';
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
    const { data: products } = useProductsQuery();

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
            <ProductsCarousel
                title={'Новинки'}
                products={products ? products.filter((product) => product.articles[0]?.new) : []}
            />
            <ProductsCarousel
                title={'Популярное'}
                products={products ? products.filter((product) => product.articles[0]?.popular) : []}
            />
            <NewCollectionBanner />
            <ProductsCarousel title={'Аккумуляторы'} />
            <Advantages />
            <QuestionBanner />
        </div>
    );
};
