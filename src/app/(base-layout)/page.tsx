import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import { categoryApi } from '@/entities/category';
import { productApi } from '@/entities/product';

import { MainPage } from './MainPage';

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ['categories'],
            queryFn: categoryApi.fetchCategoriesWithChildren,
        }),
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
