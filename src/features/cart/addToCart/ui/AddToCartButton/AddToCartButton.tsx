import { FC } from 'react';

import { useCartStore } from '@/entities/cart';
import { IProduct } from '@/entities/product';
import { useStore } from '@/shared/hooks';
import { Button } from '@/shared/ui';

interface IAddToCartButton {
    product: IProduct;
    className?: string;
}

export const AddToCartButton: FC<IAddToCartButton> = ({ product, className }) => {
    const store = useStore(useCartStore, (state) => state);
    const inCart = !!store?.inCart(product.id);

    const handleAddToCart = () => {
        inCart ? store?.removeFromCart(product.id) : store?.addToCart(product.id);
    };

    return (
        <Button variant={inCart ? 'solid' : 'outline'} fullWidth onClick={handleAddToCart} className={className}>
            {inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
        </Button>
    );
};
