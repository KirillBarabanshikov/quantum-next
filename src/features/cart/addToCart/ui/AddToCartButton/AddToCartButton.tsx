import { FC } from 'react';

import { Button } from '@/shared/ui';

interface IAddToCartButton {
    productId: number;
    className?: string;
}

export const AddToCartButton: FC<IAddToCartButton> = ({ productId, className }) => {
    const handleAddToCart = () => {
        console.log(productId);
    };

    return (
        <Button variant={'outline'} fullWidth onClick={handleAddToCart} className={className}>
            В КОРЗИНУ
        </Button>
    );
};
