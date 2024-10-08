import { useQuery } from '@tanstack/react-query';

import { productApi, useRecentStore } from '@/entities/product';
import { ProductsCarousel } from '@/widgets';

export const RecentProduct = () => {
    const { productsIds } = useRecentStore();

    const { data: products, isLoading } = useQuery({
        queryKey: ['recent', ...productsIds],
        queryFn: () => productApi.fetchProductsByIds(productsIds),
        enabled: !!productsIds?.length,
    });

    if (!productsIds.length) return <></>;

    return <ProductsCarousel title={'Вы смотрели'} products={products} isLoading={isLoading} />;
};
