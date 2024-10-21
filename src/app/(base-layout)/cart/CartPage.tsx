'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';

import { Placeholder } from '@/app/(base-layout)/cart/Placeholder';
import { CartProduct, useCartStore } from '@/entities/cart';
import { productApi } from '@/entities/product';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import { priceFormat } from '@/shared/lib';
import { Button, Checkbox, Separator } from '@/shared/ui';
import { RecentProduct } from '@/widgets';

import styles from './CartPage.module.scss';

export const CartPage = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const { products, removeFromCart } = useCartStore();
    const productsIds = products.map((product) => product.id);

    const { data: cartProducts, isLoading } = useQuery({
        queryKey: ['cart', productsIds.length],
        queryFn: () => productApi.fetchProductsByIds(productsIds),
        placeholderData: keepPreviousData,
    });

    const handleSelectAll = (checked: boolean) => {
        if (!checked) {
            return setSelectedProducts([]);
        }
        const updatedProducts: number[] = [];
        cartProducts?.forEach((product) => updatedProducts.push(product.id));
        setSelectedProducts(updatedProducts);
    };

    const handleSelect = (checked: boolean, id: number) => {
        checked
            ? setSelectedProducts((prev) => [...prev, id])
            : setSelectedProducts((prev) => prev.filter((i) => i !== id));
    };

    const handleDelete = () => {
        selectedProducts.forEach((id) => removeFromCart(id));
    };

    const totalCost =
        cartProducts?.reduce((acc, cur, currentIndex) => {
            return (acc + cur.price) * products[currentIndex].count;
        }, 0) || 0;

    if (isLoading) return <></>;

    return (
        <div className={clsx(styles.cartPage, 'page', 'sections')}>
            <section>
                {!!products.length ? (
                    <div className={'container'}>
                        <h1 className={clsx(styles.title, 'title')}>
                            Корзина <span>{cartProducts?.length}</span>
                        </h1>
                        <div className={styles.actions}>
                            <Checkbox
                                label={'Выбрать все'}
                                className={styles.action}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                            />
                            <span className={styles.action} onClick={handleDelete}>
                                Удалить выбранное
                            </span>
                        </div>
                        <div className={styles.cart}>
                            <div className={styles.products}>
                                {cartProducts?.map((product) => {
                                    return (
                                        <CartProduct
                                            key={product.id}
                                            product={product}
                                            count={products.find((item) => item.id === product.id)?.count}
                                            selected={selectedProducts.includes(product.id)}
                                            setSelected={(checked) => handleSelect(checked, product.id)}
                                        />
                                    );
                                })}
                            </div>
                            <div className={styles.order}>
                                <Button fullWidth>Оформить заказ</Button>
                                <div className={styles.hint}>
                                    Доступные способы и время доставки можно выбрать при оформлении заказа
                                </div>
                                <Separator />
                                <div className={styles.total}>
                                    Всего: {cartProducts?.length} товара <Ellipse /> 2 489 г
                                </div>
                                <div className={styles.priceWrap}>
                                    Общая стоимость
                                    <span>{priceFormat(totalCost)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Placeholder />
                )}
            </section>
            <RecentProduct />
        </div>
    );
};
