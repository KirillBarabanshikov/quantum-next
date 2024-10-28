'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { categoryApi } from '@/entities/category';
import { productApi, ProductDetails, useRecentStore } from '@/entities/product';
import { CallBanner, RecentProduct } from '@/widgets';

export const ProductPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { addToRecent } = useRecentStore();

    const { data: product } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => productApi.fetchProductBySlug(slug),
    });

    const { data: category } = useQuery({
        queryKey: ['category', product!.categoryId],
        queryFn: () => categoryApi.fetchCategoryById(product!.categoryId),
    });

    useEffect(() => {
        if (!product) return;
        addToRecent(product.id);
    }, [addToRecent, product]);

    return (
        <div className={'page sections'}>
            <ProductDetails product={product!} category={category!} />
            <RecentProduct />
            <CallBanner />
        </div>
    );
};
