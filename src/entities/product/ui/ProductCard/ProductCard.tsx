'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { AddToCartButton } from '@/features/cart';
import GradeIcon from '@/shared/assets/icons/start_outline.svg';

import { IProduct } from '../../model';
import styles from './ProductCard.module.scss';

interface IProductCardProps {
    product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
    return (
        <article className={styles.productCard}>
            <div className={styles.productImage}>
                <Link href={`/product/${product.id}`}>
                    <Image src={product.images[0]?.image || '/'} fill sizes={'300px'} alt={product.title} />
                </Link>
                <GradeIcon onClick={() => {}} className={clsx(styles.grade)} />
            </div>
            <div className={styles.productBody}>
                <Link href={`/product/${product.id}`} className={styles.productTitle}>
                    {product.title}
                </Link>
                <p className={styles.productPrice}>{product.price}</p>
            </div>
            <div className={styles.buttonWrap}>
                <AddToCartButton productId={product.id} className={styles.button} />
            </div>
        </article>
    );
};
