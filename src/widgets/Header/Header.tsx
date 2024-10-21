import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import { FC } from 'react';

import { categoryApi } from '@/entities/category';

import { HeaderClient } from './HeaderClient';

interface IHeaderProps {
    className?: string;
}

export const Header: FC<IHeaderProps> = async ({ className }) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategoriesWithChildren,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HeaderClient className={className} />
        </HydrationBoundary>
    );
};
