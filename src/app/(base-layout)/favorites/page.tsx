import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import { productApi } from '@/entities/product';

import { FavoritesPage } from './FavoritesPage';

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['new-products'],
            queryFn: productApi.fetchNewProducts,
        }),
        queryClient.prefetchQuery({
            queryKey: ['popular-products'],
            queryFn: productApi.fetchPopularProducts,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FavoritesPage />
        </HydrationBoundary>
    );
}
