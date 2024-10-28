import { FC, useState } from 'react';

import { useCartStore } from '@/entities/cart';
import { IProduct, useFavoritesStore } from '@/entities/product';
import { AddToCartButton } from '@/features/cart';
import ShareIcon from '@/shared/assets/icons/share.svg';
import StarIcon from '@/shared/assets/icons/star.svg';
import { useStore } from '@/shared/hooks';
import { Button, InputCounter } from '@/shared/ui';

import styles from './ProductActions.module.scss';

interface IProductActions {
    product: IProduct;
}

export const ProductActions: FC<IProductActions> = ({ product }) => {
    const [copied, setCopied] = useState(false);
    const favoritesStore = useStore(useFavoritesStore, (state) => state);
    const cartStore = useStore(useCartStore, (state) => state);
    const isFavorite = favoritesStore?.isFavorite(product.id);
    const count = cartStore?.products.find((item) => item.id === product.id)?.count || 0;

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                setCopied(true);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleAddToFavorite = () => {
        isFavorite ? favoritesStore?.removeFromFavorites(product.id) : favoritesStore?.addToFavorites(product.id);
    };

    return (
        <div className={styles.productActions}>
            <Button variant={copied ? 'solid' : 'outline'} onClick={copyUrl} className={styles.share}>
                Поделиться <ShareIcon />
            </Button>
            <Button
                variant={isFavorite ? 'solid' : 'outline'}
                onClick={handleAddToFavorite}
                className={styles.favorite}
            >
                <StarIcon />
            </Button>
            <InputCounter
                defaultCount={count}
                onIncrement={() => cartStore?.addToCart(product.id)}
                onDecrement={() => cartStore?.decrementFromCart(product.id)}
                onChange={(count) => cartStore?.setCount(product.id, count)}
                max={product.count}
            />
            <AddToCartButton product={product} variant={'solid'} />
        </div>
    );
};
