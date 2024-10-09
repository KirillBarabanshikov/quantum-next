import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { categoryApi } from '@/entities/category';

import { CategoryPage } from './CategoryPage';

export default async function Page({ params }: { params: { slug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['category', params.slug],
        queryFn: () => categoryApi.fetchCategoryById(params.slug),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryPage />
        </HydrationBoundary>
    );
}
