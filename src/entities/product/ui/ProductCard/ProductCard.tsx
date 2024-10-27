'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { useFavoritesStore } from '@/entities/product';
import { AddToCartButton } from '@/features/cart';
import GradeIcon from '@/shared/assets/icons/start_outline.svg';
import { useStore } from '@/shared/hooks';
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
                <Link href={`/catalog/${product.categoryId}/${product.id}`}>
                    <Image src={product.images[0]?.image || '/'} fill sizes={'300px'} alt={product.title} />
                </Link>
                <FavoriteOption productId={product.id} />
            </div>
            <div className={styles.productBody}>
                <Link href={`/catalog/${product.categoryId}/${product.id}`} className={styles.productTitle}>
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

const FavoriteOption = ({ productId }: { productId: number }) => {
    const store = useStore(useFavoritesStore, (state) => state);
    const isFavorite = store?.isFavorite(productId);

    const handleAddFavorite = () => {
        isFavorite ? store?.removeFromFavorites(productId) : store?.addToFavorites(productId);
    };

    return <GradeIcon onClick={handleAddFavorite} className={clsx(styles.grade, isFavorite && styles.active)} />;
};
