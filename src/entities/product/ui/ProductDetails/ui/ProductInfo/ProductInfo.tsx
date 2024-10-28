'use client';

import { FC } from 'react';

import { IProduct } from '@/entities/product';

import { ProductActions } from '../../ui/ProductActions';
import { ProductModifications } from '../../ui/ProductModifications';
import { ProductPreview } from '../../ui/ProductPreview';
import styles from './ProductInfo.module.scss';

interface IProductInfoProps {
    product: IProduct;
}

export const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
    return (
        <div className={styles.productInfo}>
            <ProductPreview product={product} />
            <ProductModifications product={product} />
            <ProductActions product={product} />
        </div>
    );
};
