'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { useCartStore } from '@/entities/cart';
import { IProduct } from '@/entities/product';
import { useStore } from '@/shared/hooks';
import { Button } from '@/shared/ui';

interface IAddToCartButton {
    product: IProduct;
    variant?: 'solid';
    className?: string;
}

export const AddToCartButton: FC<IAddToCartButton> = ({ product, variant, className }) => {
    const store = useStore(useCartStore, (state) => state);
    const inCart = store?.inCart(product.id);
    const router = useRouter();

    const handleAddToCart = () => {
        inCart ? router.push('/cart') : store?.addToCart(product.id);
        // inCart ? store?.removeFromCart(product.id) : store?.addToCart(product.id);
    };

    return (
        <Button
            variant={variant === 'solid' ? 'solid' : inCart ? 'solid' : 'outline'}
            fullWidth
            onClick={handleAddToCart}
            disabled={!product.count || !product.stock}
            className={className}
        >
            {!product.count || !product.stock ? 'Нет в наличии' : inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
        </Button>
    );
};
