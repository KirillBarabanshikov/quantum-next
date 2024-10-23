'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';

import { Placeholder } from '@/app/(base-layout)/cart/Placeholder';
import { CartProduct, useCartStore } from '@/entities/cart';
import { productApi } from '@/entities/product';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import { getProductCountWord, priceFormat } from '@/shared/lib';
import { Button, Checkbox, Separator } from '@/shared/ui';
import { RecentProduct } from '@/widgets';

import styles from './CartPage.module.scss';

export const CartPage = () => {
    const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
    const { products, getCount, removeFromCart } = useCartStore();
    const productsIds = useMemo(() => products.map((product) => product.id), [products]);

    const { data: cartProducts, isLoading } = useQuery({
        queryKey: ['cart', productsIds],
        queryFn: () => productApi.fetchProductsByIds(productsIds),
        placeholderData: keepPreviousData,
    });

    const handleSelectAll = useCallback(
        (checked: boolean) => {
            setSelectedProducts(checked ? new Set(productsIds) : new Set());
        },
        [productsIds],
    );

    const handleSelect = useCallback((checked: boolean, id: number) => {
        setSelectedProducts((prev) => {
            const updated = new Set(prev);
            checked ? updated.add(id) : updated.delete(id);
            return updated;
        });
    }, []);

    const handleDelete = useCallback(() => {
        selectedProducts.forEach((id) => removeFromCart(id));
        setSelectedProducts(new Set());
    }, [selectedProducts, removeFromCart]);

    const totalCost = useMemo(() => {
        return products.reduce((acc, cur, index) => {
            if (!cartProducts) {
                return acc;
            }
            return acc + cartProducts[index]?.price * cur.count;
        }, 0);
    }, [cartProducts]);

    if (isLoading) return <></>;

    return (
        <div className={clsx(styles.cartPage, 'page', 'sections')}>
            <section>
                {!!products.length ? (
                    <div className={'container'}>
                        <h1 className={clsx(styles.title, 'title')}>
                            Корзина <span>{getCount()}</span>
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
                                    const count = products.find((item) => item.id === product.id)?.count || 1;

                                    return (
                                        <CartProduct
                                            key={product.id}
                                            product={product}
                                            count={count}
                                            selected={selectedProducts.has(product.id)}
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
                                    Всего: {getProductCountWord(getCount())} <Ellipse /> 2 489 г
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
