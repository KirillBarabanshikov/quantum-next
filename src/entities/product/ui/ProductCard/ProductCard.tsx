'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { useAddToCartMutation, useDeleteFromCartMutation, useFavoritesStore } from '@/entities/product';
import { useSessionStore } from '@/entities/session';
import { useMeQuery } from '@/entities/user';
import GradeIcon from '@/shared/assets/icons/grade-outline.svg';
import { BASE_URL } from '@/shared/consts';
import { useStore } from '@/shared/hooks';
import { priceFormat } from '@/shared/lib';
import { Button } from '@/shared/ui';

import { IProduct } from '../../model';
import styles from './ProductCard.module.scss';

interface IProductCardProps {
    product: IProduct;
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {
    const router = useRouter();
    const { isAuthenticated } = useSessionStore();
    const { mutateAsync: addToCart } = useAddToCartMutation();
    const { mutateAsync: deleteFromCart } = useDeleteFromCartMutation();
    const { user } = useSessionStore();
    const { refetch } = useMeQuery({ enabled: false });
    const store = useStore(useFavoritesStore, (state) => state);

    const productCart = user?.cart.find((item) => item.product.id === product.articles[0].id);
    const inCart = !!productCart;
    const isFavorite = !!store?.isFavorite(product.id);

    const handleAddToCart = async (productId: number) => {
        if (!isAuthenticated || !user) {
            return router.push('?authentication=signin', { scroll: false });
        }
        if (inCart) {
            await deleteFromCart(productCart.id);
        } else {
            await addToCart({ userId: user.id, productId });
        }
        await refetch();
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            store?.removeFromFavorites(product.id);
        } else {
            store?.addToFavorites(product.id);
        }
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
                <Button
                    variant={inCart ? 'solid' : 'outline'}
                    fullWidth
                    onClick={() => handleAddToCart(+product.articles[0].id)}
                >
                    {inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                </Button>
            </div>
        </article>
    );
};
