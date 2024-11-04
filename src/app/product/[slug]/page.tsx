import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { categoryApi, ICategory } from '@/entities/category';
import { IProduct, productApi } from '@/entities/product';

import { ProductPage } from './ProductPage';

export default async function Page({ params }: { params: { slug: string } }) {
    const queryClient = new QueryClient();

    const productKey = ['product', params.slug];
    const categoryKey = (id: number) => ['category', id];

    await queryClient.prefetchQuery({
        queryKey: productKey,
        queryFn: () => productApi.fetchProductBySlug(params.slug),
    });

    const product = queryClient.getQueryData<IProduct>(productKey);

    if (product?.categoryId) {
        await queryClient.prefetchQuery({
            queryKey: categoryKey(product.categoryId),
            queryFn: () => categoryApi.fetchCategoryById(product.categoryId),
        });
    }

    const category = product?.categoryId ? queryClient.getQueryData<ICategory>(categoryKey(product.categoryId)) : null;

    if (!product || !category) return notFound();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductPage />
        </HydrationBoundary>
    );
}
