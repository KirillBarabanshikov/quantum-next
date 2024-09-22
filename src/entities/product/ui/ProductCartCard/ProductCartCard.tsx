import Image from 'next/image';
import { FC } from 'react';

import { useAddToCartMutation, useDeleteFromCartMutation } from '@/entities/product';
import { Article } from '@/entities/product/model/types';
import { useSessionStore } from '@/entities/session';
import { useMeQuery } from '@/entities/user';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import { BASE_URL } from '@/shared/consts';
import { priceFormat } from '@/shared/lib';
import { Checkbox, IconButton, InputCounter } from '@/shared/ui';

import styles from './ProductCartCard.module.scss';

interface IProductCartCard {
    product: { id: number; product: Article };
    countProducts: number;
    selected: boolean;
    handleSelectProduct: (id: number) => void;
}

export const ProductCartCard: FC<IProductCartCard> = ({ product, countProducts, selected, handleSelectProduct }) => {
    const { mutateAsync: deleteFromCart } = useDeleteFromCartMutation();
    const { mutateAsync: addToCart } = useAddToCartMutation();
    const { refetch } = useMeQuery();
    const { user } = useSessionStore();

    const handleDeleteProduct = async (id: number) => {
        await deleteFromCart(id);
        await refetch();
    };

    const handleAddProduct = async (productId: number) => {
        if (!user) return;
        await addToCart({ userId: user.id, productId });
        await refetch();
    };

    return (
        <article className={styles.productCard}>
            <Checkbox checked={selected} onClick={() => handleSelectProduct(product.id)} />
            <Image
                src={`${BASE_URL}/${product.product.images && product.product.images[0].image}`}
                width={129}
                height={114}
                alt={product.product.title}
                className={styles.image}
            />
            <div className={styles.body}>
                <div className={styles.wrap}>
                    <p className={styles.name}>{product.product.title}</p>
                    <p className={styles.price}>{product.product.price && priceFormat(+product.product.price)}</p>
                </div>
                <p className={styles.info}>Комплект</p>
                <p className={styles.info}>Артикул: {product.product.number}</p>
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
                        onIncrement={() => handleAddProduct(+product.product.id)}
                        onDecrement={() => handleDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </article>
    );
};
