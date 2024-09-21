import { FC } from 'react';

import { IProduct, ProductCard } from '@/entities/product';
import { Skeleton } from '@/shared/ui';

import styles from './Products.module.scss';

interface IProductsListProps {
    products?: IProduct[];
    isLoading: boolean;
}

export const ProductsList: FC<IProductsListProps> = ({ products, isLoading }) => {
    return (
        <div className={styles.productsList}>
            {isLoading
                ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} width={305} height={420} />)
                : products?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
    );
};
