'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { categoryApi } from '@/entities/category';
import { productApi, ProductDetails, useRecentStore } from '@/entities/product';
import { Breadcrumbs } from '@/shared/ui';
import { CallBanner, RecentProduct } from '@/widgets';

const breadcrumbs = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
];

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
            <section>
                <div className={'container'}>
                    {category && product && (
                        <Breadcrumbs
                            breadcrumbs={[
                                ...breadcrumbs,
                                ...[
                                    { text: category.title, href: `/catalog/${category.slug}` },
                                    { text: product.title },
                                ],
                            ]}
                        />
                    )}
                    {product && <ProductDetails product={product} />}
                </div>
            </section>
            <RecentProduct />
            <CallBanner />
        </div>
    );
};
