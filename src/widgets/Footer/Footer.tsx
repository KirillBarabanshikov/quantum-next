import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';

import { categoryApi } from '@/entities/category';
import { FooterClient } from '@/widgets/Footer/FooterClient';

export const Footer = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FooterClient />
        </HydrationBoundary>
    );
};
