'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { productApi, useRecentStore } from '@/entities/product';
import { ProductDetails } from '@/entities/product/ui/ProductDetails';
import { CallBanner } from '@/widgets/Banners';

import styles from './ProductPage.module.scss';

export const ProductPage = () => {
    const { addToRecent } = useRecentStore();
    const { slug } = useParams<{ slug: string }>();

    const { data: product } = useSuspenseQuery({
        queryKey: ['product', slug],
        queryFn: () => productApi.fetchProductById(slug),
    });

    useEffect(() => {
        if (product) addToRecent(product.id);
    }, [addToRecent, product]);

    if (!product) return <></>;

    return (
        <div className={styles.productPage}>
            <ProductDetails product={product} />
            <CallBanner />
        </div>
    );
};
