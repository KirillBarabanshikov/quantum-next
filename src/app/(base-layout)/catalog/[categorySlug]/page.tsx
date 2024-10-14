import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { categoryApi, ICategory } from '@/entities/category';

import { CategoryPage } from './CategoryPage';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { categorySlug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['category', params.categorySlug],
        queryFn: () => categoryApi.fetchCategoryById(params.categorySlug),
    });

    const category = queryClient.getQueryData<ICategory>(['category', params.categorySlug]);

    if (!category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryPage />
        </HydrationBoundary>
    );
}
