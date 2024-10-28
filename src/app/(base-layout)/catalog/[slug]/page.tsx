import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { categoryApi, ICategory } from '@/entities/category';

import { CategoryPage } from './CategoryPage';

export default async function Page({ params }: { params: { slug: string } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['category', params.slug],
        queryFn: () => categoryApi.fetchCategoryBySlug(params.slug),
    });

    const category = queryClient.getQueryData<ICategory>(['category', params.slug]);

    if (!category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryPage />
        </HydrationBoundary>
    );
}
