'use client';

import Error from 'next/error';
import { FC, useEffect } from 'react';

import { useProductDetailsQuery, useRecentStore } from '@/entities/product';
import { ProductDetails } from '@/entities/product/ui/ProductDetails';
// import { ProductsCarousel } from '@/widgets';
import { CallBanner } from '@/widgets/Banners';

import styles from './ProductPage.module.scss';

interface IProductPageProps {
    slug: string;
}

export const ProductPage: FC<IProductPageProps> = ({ slug }) => {
    const { data: product, isError } = useProductDetailsQuery(slug);
    const { addToRecent } = useRecentStore();

    useEffect(() => {
        if (!product) return;
        addToRecent(product.id);
    }, [addToRecent, product]);

    if (isError) {
        return <Error statusCode={404} />;
    }

    if (!product) return <></>;

    return (
        <div className={styles.productPage}>
            <ProductDetails product={product} />
            {/*<ProductsCarousel title={'Вы смотрели'} className={styles.carousel} />*/}
            <CallBanner />
        </div>
    );
};
