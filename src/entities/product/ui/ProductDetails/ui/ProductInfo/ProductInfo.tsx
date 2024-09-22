'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IProduct, useAddToCartMutation, useDeleteFromCartMutation } from '@/entities/product';
import { useSessionStore } from '@/entities/session';
import { useMeQuery } from '@/entities/user';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';
import { priceFormat } from '@/shared/lib';
import { Badge, Button, IconButton, InputCounter } from '@/shared/ui';

import styles from './ProductInfo.module.scss';

interface IProductInfoProps {
    product: IProduct;
}

export const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
    const { mutateAsync: addToCart } = useAddToCartMutation();
    const { mutateAsync: deleteFromCart } = useDeleteFromCartMutation();
    const { isAuthenticated, user } = useSessionStore();
    const router = useRouter();
    const { refetch } = useMeQuery({ enabled: false });

    const productCart = user?.cart.find((item) => item.product.id === product.articles[0].id);
    const inCart = !!productCart;

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

    return (
        <div className={styles.productInfo}>
            <h1 className={styles.name}>{product.articles[0].title}</h1>
            <div className={styles.gradeContainer}>
                <GradeIcon />
                <span className={clsx(styles.grade, styles.info)}>0.0</span>
                <span className={styles.ellipse} />
                <span className={styles.info}>0 отзыва</span>
            </div>
            <div className={styles.info}>Артикул: {product.articles[0].number}</div>
            <div className={styles.price}>{priceFormat(+product.articles[0].price)}</div>
            <div className={styles.separator} />
            <div className={styles.tags}>
                <Badge text={'В наличии'} color={'#058943'} />
                <Badge text={'Отечественный производитель'} color={'#4733F4'} />
            </div>
            <div className={styles.specifications}>
                {product.articles[0].characteristics.map((characteristic) => (
                    <div key={characteristic.id} className={styles.specification}>
                        <p className={styles.specificationTitle}>{characteristic.title}</p>
                        <p className={styles.specificationValue}>
                            {characteristic.value} {characteristic.categoryCharacteristic.measurement}
                        </p>
                    </div>
                ))}
            </div>
            <div className={styles.separator} />
            <div className={styles.equipments}>
                <p>Комплектация</p>
                <div className={styles.equipmentsList}>
                    <button className={clsx(styles.equipment, styles.selected)}>Комплект</button>
                    <button className={styles.equipment}>Только дрон</button>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button fullWidth onClick={() => handleAddToCart(+product.articles[0].id)}>
                    {inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                </Button>
                <InputCounter />
                <IconButton radius={'full'}>
                    <GradeIcon />
                </IconButton>
                <Button variant={'outline'} className={styles.shareButton}>
                    Поделиться
                    <ShareIcon />
                </Button>
            </div>
        </div>
    );
};
