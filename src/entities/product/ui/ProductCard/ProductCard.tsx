'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { AddToCartButton } from '@/features/cart';
import { FavoriteOption } from '@/features/product';
import { priceFormat } from '@/shared/lib';

import { IProduct } from '../../model';
import styles from './ProductCard.module.scss';

interface IProductCardProps {
    product: IProduct;
    className?: string;
}

export const ProductCard: FC<IProductCardProps> = ({ product, className }) => {
    return (
        <article className={clsx(styles.productCard, className)}>
            <div className={styles.productImage}>
                <Link href={`/product/${product.slug}`}>
                    <Image src={product.images[0]?.image || '/'} fill sizes={'300px'} alt={product.title} />
                </Link>
                <FavoriteOption productId={product.id} variant={'icon'} className={styles.grade} />
            </div>
            <div className={styles.productBody}>
                <Link href={`/product/${product.slug}`} className={styles.productTitle}>
                    {product.title}
                </Link>
                <p className={styles.productPrice}>{priceFormat(product.price)}</p>
            </div>
            <div className={styles.buttonWrap}>
                <AddToCartButton product={product} className={styles.button} />
            </div>
        </article>
    );
};
