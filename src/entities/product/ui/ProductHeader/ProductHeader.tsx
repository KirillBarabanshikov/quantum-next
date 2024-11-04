'use client';

import { FC } from 'react';

import { IProduct } from '@/entities/product';
import ArrowIcon from '@/shared/assets/icons/arrow_left.svg';

import styles from './ProductHeader.module.scss';

interface IProductHeaderProps {
    product: IProduct;
}

export const ProductHeader: FC<IProductHeaderProps> = () => {
    return (
        <header className={styles.productHeader}>
            <ArrowIcon />
        </header>
    );
};
