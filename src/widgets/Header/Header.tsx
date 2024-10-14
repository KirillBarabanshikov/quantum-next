import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import { categoryApi } from '@/entities/category';

import { HeaderClient } from './HeaderClient';

export const Header = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeaderClient />
        </HydrationBoundary>
    );
};
