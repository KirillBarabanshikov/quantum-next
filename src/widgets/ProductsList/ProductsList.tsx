import clsx from 'clsx';
import { FC } from 'react';

import { IProduct, ProductCard } from '@/entities/product';
import { Skeleton } from '@/shared/ui';

import styles from './ProductsList.module.scss';

interface IProductsListProps {
    products?: IProduct[];
    isLoading?: boolean;
    className?: string;
}

export const ProductsList: FC<IProductsListProps> = ({ products, isLoading, className }) => {
    return (
        <div className={clsx(styles.productsList, className)}>
            {isLoading
                ? Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} width={305} height={420} />)
                : products?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
    );
};