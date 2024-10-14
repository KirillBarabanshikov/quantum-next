import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { notFound } from 'next/navigation';
import { IProduct, productApi } from '@/entities/product';
import { ProductPage } from './ProductPage';

export default async function Page({ params }: { params: { productSlug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['product', params.productSlug],
        queryFn: () => productApi.fetchProductById(params.productSlug),
    });

    const product = queryClient.getQueryData<IProduct>(['product', params.productSlug]);

    if (!product) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductPage />
        </HydrationBoundary>
    );
}
