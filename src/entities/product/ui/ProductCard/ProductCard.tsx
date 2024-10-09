'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { useFavoritesStore } from '@/entities/product';
import { AddToCartButton } from '@/features/cart';
import GradeIcon from '@/shared/assets/icons/grade-outline.svg';
import { BASE_URL } from '@/shared/consts';
import { useStore } from '@/shared/hooks';
import { priceFormat } from '@/shared/lib';

import { IProduct } from '../../model';
import styles from './ProductCard.module.scss';

interface IProductCardProps {
    product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
    const store = useStore(useFavoritesStore, (state) => state);

    const isFavorite = !!store?.isFavorite(product.id);

    const toggleFavorite = () => {
        isFavorite ? store?.removeFromFavorites(product.id) : store?.addToFavorites(product.id);
    };

    return (
        <article className={styles.productCard}>
            <div className={styles.productImage}>
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={
                            BASE_URL +
                            `/${product.articles[0]?.images?.length ? product.articles[0].images[0].image : ''}`
                        }
                        fill
                        sizes={'100%'}
                        alt={product.articles[0]?.title || 'product'}
                    />
                </Link>
                <GradeIcon onClick={toggleFavorite} className={clsx(styles.grade, isFavorite && styles.active)} />
            </div>
            <div className={styles.productBody}>
                <Link href={`/product/${product.id}`} className={styles.productTitle}>
                    {product.articles[0]?.title}
                </Link>
                <p className={styles.productPrice}>{priceFormat(+product.articles[0]?.price)}</p>
                <AddToCartButton product={product} />
            </div>
        </article>
    );
};
