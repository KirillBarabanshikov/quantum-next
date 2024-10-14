import { FC } from 'react';

import { Button } from '@/shared/ui';
import { IProduct } from '@/entities/product';
import { useCartStore } from '@/entities/cart';
import { useStore } from '@/shared/hooks';

interface IAddToCartButton {
    product: IProduct;
    className?: string;
}

export const AddToCartButton: FC<IAddToCartButton> = ({ product, className }) => {
    const store = useStore(useCartStore, (state) => state);
    const inCart = store?.inCart(product.id);

    const handleAddToCart = () => {
        inCart ? store?.removeFromCart(product.id) : store?.addToCart(product.id);
    };

    return (
        <Button
            variant={inCart ? 'solid' : 'outline'}
            fullWidth
            onClick={handleAddToCart}
            disabled={!product.count}
            className={className}
        >
            {!product.count ? 'Нет в наличии' : inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
        </Button>
    );
};
