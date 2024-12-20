import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, FC } from 'react';

import { useCartStore } from '@/entities/cart';
import { useFavoritesStore } from '@/entities/product';
import { IProduct } from '@/entities/product';
import { FavoriteOption } from '@/features/product';
import StarIcon from '@/shared/assets/icons/star.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { priceFormat } from '@/shared/lib';
import { Checkbox, InputCounter } from '@/shared/ui';

import styles from './CartProduct.module.scss';

interface ICartProductProps {
    product: IProduct;
    count: number;
    selected?: boolean;
    setSelected?: (checked: boolean) => void;
}

export const CartProduct: FC<ICartProductProps> = ({ product, count, selected, setSelected }) => {
    const { removeFromCart, addToCart, decrementFromCart, setCount } = useCartStore();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setSelected && setSelected(e.target.checked);
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.cartProduct}>
                <Checkbox className={styles.checkbox} checked={selected} onChange={handleSelect} />
                <Image
                    src={product.images[0]?.image || '/'}
                    alt={product.title}
                    width={128}
                    height={114}
                    className={styles.image}
                />
                <div className={styles.body}>
                    <div className={styles.titleWrap}>
                        <div className={styles.title}>{product.title}</div>
                        <div className={styles.price}>
                            {product.priceRequest ? 'Цена по запросу' : priceFormat(product.price * count)}
                        </div>
                    </div>
                    <div className={styles.equipment}>Артикул: {product.number}</div>
                    <div className={clsx(styles.actionsWrap, styles.desktop)}>
                        <div className={styles.actions}>
                            <button onClick={() => removeFromCart(product.id)} className={styles.action}>
                                <TrashIcon />
                            </button>
                            <FavoriteOption
                                productId={product.id}
                                variant={'button'}
                                className={clsx(styles.action, styles.star, isFavorite(product.id) && styles.active)}
                            />
                        </div>
                        <InputCounter
                            size={'sm'}
                            defaultCount={count}
                            onIncrement={() => addToCart(product.id)}
                            onDecrement={() => decrementFromCart(product.id)}
                            onChange={(count) => setCount(product.id, count)}
                            max={product.count}
                        />
                    </div>
                </div>
            </div>
            <div className={clsx(styles.actionsWrap, styles.mobile)}>
                <div className={styles.actions}>
                    <button onClick={() => removeFromCart(product.id)} className={styles.action}>
                        <TrashIcon />
                    </button>
                    <button
                        className={styles.action}
                        onClick={() => {
                            isFavorite(product.id) ? removeFromFavorites(product.id) : addToFavorites(product.id);
                        }}
                    >
                        <StarIcon className={styles.star} />
                    </button>
                </div>
                <InputCounter
                    size={'sm'}
                    defaultCount={count}
                    onIncrement={() => addToCart(product.id)}
                    onDecrement={() => decrementFromCart(product.id)}
                    onChange={(count) => setCount(product.id, count)}
                    max={product.count}
                />
            </div>
        </div>
    );
};
