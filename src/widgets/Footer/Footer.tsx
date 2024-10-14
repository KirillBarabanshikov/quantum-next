import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { FC } from 'react';

import { categoryApi } from '@/entities/category';
import { FooterClient } from '@/widgets/Footer/FooterClient';

interface IFooterProps {
    className?: string;
}

export const Footer: FC<IFooterProps> = async ({ className }) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategories,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FooterClient className={className} />
        </HydrationBoundary>
    );
};
