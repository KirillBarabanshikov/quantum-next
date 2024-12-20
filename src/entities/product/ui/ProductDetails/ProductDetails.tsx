'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { IProduct } from '@/entities/product';

import { ProductMobile } from '../ProductMobile';
import styles from './ProductDetails.module.scss';
import { ProductInfo, ProductSlider, ProductTabs } from './ui';

interface IProductDetailsProps {
    product: IProduct;
}

export const ProductDetails: FC<IProductDetailsProps> = ({ product }) => {
    return (
        <>
            <div className={styles.productDetails}>
                <div className={clsx(styles.productInfoContainer)}>
                    <ProductSlider product={product} />
                    <ProductInfo product={product} />
                </div>
                <ProductTabs product={product} />
            </div>
            <ProductMobile product={product} />
        </>
    );
};
