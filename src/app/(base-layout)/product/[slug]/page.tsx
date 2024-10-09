import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

import { productApi } from '@/entities/product';

import { ProductPage } from './ProductPage';

export default async function Page({ params }: { params: { slug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['product', params.slug],
        queryFn: () => productApi.fetchProductById(params.slug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductPage />
        </HydrationBoundary>
    );
}
