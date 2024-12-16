import React, { FC } from 'react';

import { useCartStore } from '@/entities/cart';
import { IProduct } from '@/entities/product';
import { useStore } from '@/shared/hooks';
import { Button, InputCounter } from '@/shared/ui';

import styles from './CartButton.module.scss';

interface ICartButtonProps {
    product: IProduct;
}

export const CartButton: FC<ICartButtonProps> = ({ product }) => {
    const store = useStore(useCartStore, (state) => state);
    const inCart = store?.inCart(product.id);
    const count = store?.products.find((item) => item.id === product.id)?.count || 0;

    return (
        <div className={styles.cartButton}>
            {inCart ? (
                <div className={styles.counterWrap}>
                    <InputCounter
                        defaultCount={count}
                        onIncrement={() => store?.addToCart(product.id)}
                        onDecrement={(count) => {
                            if (count === 0) {
                                store?.removeFromCart(product.id);
                            } else {
                                store?.decrementFromCart(product.id);
                            }
                        }}
                        onChange={(count) => {
                            if (count === 0) {
                                store?.removeFromCart(product.id);
                            } else {
                                store?.setCount(product.id, count);
                            }
                        }}
                        max={product.count}
                        min={0}
                        className={styles.counter}
                    />
                </div>
            ) : (
                <Button
                    fullWidth
                    disabled={!product.count || !product.stock}
                    onClick={() => store?.addToCart(product.id)}
                >
                    {!product.count || !product.stock ? 'Нет в наличии' : inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                </Button>
            )}
        </div>
    );
};
