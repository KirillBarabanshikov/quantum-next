import Image from 'next/image';
import { FC } from 'react';

import { IProduct, useAddToCartMutation, useDropCartMutation } from '@/entities/product';
import { useSessionStore } from '@/entities/session';
import { useMeQuery } from '@/entities/user';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import { BASE_URL } from '@/shared/consts';
import { priceFormat } from '@/shared/lib';
import { Checkbox, IconButton, InputCounter } from '@/shared/ui';

import styles from './ProductCartCard.module.scss';

interface IProductCartCard {
    product: IProduct;
    countProducts: number;
    selected: boolean;
    handleSelectProduct: (cartItemId: number, productId: number) => void;
}

export const ProductCartCard: FC<IProductCartCard> = ({ product, countProducts, selected, handleSelectProduct }) => {
    // const { mutateAsync: deleteFromCart } = useDeleteFromCartMutation();
    const { mutateAsync: addToCart } = useAddToCartMutation();
    const { mutateAsync: dropCartItem } = useDropCartMutation();
    const { refetch } = useMeQuery();
    const { user } = useSessionStore();

    const handleDeleteProduct = async (id: number) => {
        // await deleteFromCart(id);
        await dropCartItem([{ cartItemId: id }]);
        await refetch();
    };

    const handleAddProduct = async (productId: number) => {
        if (!user) return;
        await addToCart({ userId: user.id, productId });
        await refetch();
    };

    return (
        <article className={styles.productCard}>
            <Checkbox checked={selected} onChange={() => handleSelectProduct(product.id, +product.id)} />
            <Image
                src={`${BASE_URL}/${product.images[0]?.image}`}
                width={129}
                height={114}
                alt={product.title}
                className={styles.image}
            />
            <div className={styles.body}>
                <div className={styles.wrap}>
                    <p className={styles.name}>{product.title}</p>
                    <p className={styles.price}>{product.price && priceFormat(+product.price)}</p>
                </div>
                <p className={styles.info}>Комплект</p>
                <p className={styles.info}>Артикул: {product.number}</p>
                <div className={styles.buttons}>
                    <IconButton size={'sm'} onClick={() => handleDeleteProduct(product.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton size={'sm'}>
                        <GradeIcon className={styles.gradeIcon} />
                    </IconButton>
                    <InputCounter
                        size={'sm'}
                        defaultCount={countProducts}
                        onIncrement={() => handleAddProduct(+product.id)}
                        onDecrement={() => handleDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </article>
    );
};
