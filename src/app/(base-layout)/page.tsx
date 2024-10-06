import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { productApi } from '@/entities/product';

import { MainPage } from './MainPage';

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
            <MainPage />
        </HydrationBoundary>
    );
}
