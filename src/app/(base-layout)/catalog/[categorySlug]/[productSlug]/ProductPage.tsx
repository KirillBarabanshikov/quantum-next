'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { categoryApi } from '@/entities/category';
import { productApi, ProductDetails, useRecentStore } from '@/entities/product';
import { CallBanner } from '@/widgets';

export const ProductPage = () => {
    const { productSlug, categorySlug } = useParams<{ productSlug: string; categorySlug: string }>();
    const { addToRecent } = useRecentStore();

    const { data: product } = useQuery({
        queryKey: ['product', productSlug],
        queryFn: () => productApi.fetchProductById(productSlug),
    });

    const { data: category } = useQuery({
        queryKey: ['category', categorySlug],
        queryFn: () => categoryApi.fetchCategoryById(categorySlug),
    });

    useEffect(() => {
        if (!product) return;
        addToRecent(product.id);
    }, [addToRecent, product]);

    return (
        <div className={'page sections'}>
            <ProductDetails product={product!} category={category!} />
            <CallBanner />
        </div>
    );
};
