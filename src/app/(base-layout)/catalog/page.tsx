import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { categoryApi } from '@/entities/category';

import { CatalogPage } from './CatalogPage';

export default async function Page() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CatalogPage />
        </HydrationBoundary>
    );
}
