'use client';

import { useQuery } from '@tanstack/react-query';

import { productApi, useRecentStore } from '@/entities/product';
import { ProductsCarousel } from '@/widgets';

export const RecentProduct = () => {
    const { productsIds } = useRecentStore();

    const { data: products } = useQuery({
        queryKey: ['recent'],
        queryFn: () => (productsIds.length > 0 ? productApi.fetchProductsByIds(productsIds) : []),
        enabled: !!productsIds?.length,
        staleTime: 0,
    });

    if (!products?.length) return <></>;

    return <ProductsCarousel title={'Вы смотрели'} products={products} />;
};
