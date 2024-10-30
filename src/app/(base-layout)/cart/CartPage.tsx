'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { useAuth } from '@/app/_providers/AuthProvider';
import { Placeholder } from '@/app/(base-layout)/cart/Placeholder';
import { CartProduct, useCartStore } from '@/entities/cart';
import { productApi } from '@/entities/product';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import { getCountWord, priceFormat } from '@/shared/lib';
import { Button, Checkbox, Separator } from '@/shared/ui';
import { RecentProduct } from '@/widgets';

import styles from './CartPage.module.scss';

export const CartPage = () => {
    const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
    const { products, getCount, removeFromCart } = useCartStore();
    const productsIds = useMemo(() => products.map((product) => product.id), [products]);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const { data: cartProducts, isLoading } = useQuery({
        queryKey: ['cart', productsIds],
        queryFn: () => (productsIds.length > 0 ? productApi.fetchProductsByIds(productsIds) : []),
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
        return cartProducts?.reduce((acc, cur) => {
            return acc + cur.price * (products.find((product) => product.id === cur.id)?.count || 1);
        }, 0);
    }, [cartProducts, products]);

    if (isLoading) return <></>;

    if (!products || products.length === 0) {
        return (
            <div className={'page sections'}>
                <Placeholder />
                <RecentProduct />
            </div>
        );
    }

    return (
        <div className={clsx(styles.cartPage, 'page', 'sections')}>
            <section>
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
                        <span
                            className={clsx(styles.action, styles.delete, selectedProducts.size && styles.active)}
                            onClick={handleDelete}
                        >
                            Удалить выбранное
                        </span>
                    </div>
                    <div className={styles.cart}>
                        <div className={styles.products}>
                            <div className={styles.productsTitle}>Ваш заказ</div>

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
                            <Button
                                fullWidth
                                onClick={() => (isAuthenticated ? router.push('/order') : router.push('?auth=signin'))}
                            >
                                Оформить заказ
                            </Button>
                            <div className={styles.hint}>
                                Доступные способы и время доставки можно выбрать при оформлении заказа
                            </div>
                            <Separator />
                            <div className={styles.total}>
                                Всего: {getCountWord(getCount(), 'товар')} <Ellipse /> 2 489 г
                            </div>
                            <div className={styles.priceWrap}>
                                Общая стоимость
                                <span>{priceFormat(totalCost)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RecentProduct />
        </div>
    );
};
