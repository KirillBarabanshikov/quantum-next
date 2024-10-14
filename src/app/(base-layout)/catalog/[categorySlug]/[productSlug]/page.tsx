import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { categoryApi, ICategory } from '@/entities/category';
import { IProduct, productApi } from '@/entities/product';

import { ProductPage } from './ProductPage';

export default async function Page({ params }: { params: { productSlug: string; categorySlug: string } }) {
    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery({
            queryKey: ['product', params.productSlug],
            queryFn: () => productApi.fetchProductById(params.productSlug),
        }),
        await queryClient.prefetchQuery({
            queryKey: ['category', params.categorySlug],
            queryFn: () => categoryApi.fetchCategoryById(params.categorySlug),
        }),
    ]);

    const product = queryClient.getQueryData<IProduct>(['product', params.productSlug]);
    const category = queryClient.getQueryData<ICategory>(['category', params.categorySlug]);

    if (!product || !category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductPage />
        </HydrationBoundary>
    );
}
