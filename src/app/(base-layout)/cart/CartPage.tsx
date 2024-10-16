'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useCartStore } from '@/entities/cart';
import { productApi, ProductCartCard, useDropCartMutation } from '@/entities/product';
import { useSessionStore } from '@/entities/session';
import { useMeQuery } from '@/entities/user';
import { priceFormat } from '@/shared/lib';
import { Button, Checkbox } from '@/shared/ui';
import { RecentProduct } from '@/widgets';

import styles from './CartPage.module.scss';

export const CartPage = () => {
    const [uniqueCount, setUniqueCount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const { mutateAsync } = useDropCartMutation();
    const { refetch } = useMeQuery({ enabled: false });
    const router = useRouter();
    const { user } = useSessionStore();
    const { products } = useCartStore();

    const { data } = useQuery({
        queryKey: ['cart', products.length],
        queryFn: () => productApi.fetchProductsByIds(products),
        enabled: !!products.length,
    });

    useEffect(() => {
        if (!user) return;

        const uniqueIds: (number | string)[] = [];

        for (const item of user.cart) {
            if (!uniqueIds.includes(item.product.id)) {
                uniqueIds.push(item.product.id);
            }
        }
        setUniqueCount(uniqueIds.length);
    }, [user]);

    const handleSelectAll = (checked: boolean) => {
        if (!user) return;

        if (!checked) {
            return setSelectedProducts([]);
        }
        setSelectedProducts([...user?.cart.map((product) => product.id)]);
    };

    const handleSelectProduct = (cartItemId: number, productId: number) => {
        if (!user) return;
        const groupProductsIds = user.cart
            .filter((product) => +product.product.id === productId)
            .map((product) => product.id);
        if (selectedProducts.includes(cartItemId)) {
            setSelectedProducts((prev) => {
                const newIds: number[] = [];
                prev.forEach((id) => {
                    if (!groupProductsIds.includes(id)) {
                        newIds.push(id);
                    }
                });
                return newIds;
            });
        } else {
            setSelectedProducts((prev) => [...prev, ...groupProductsIds]);
        }
    };

    const handleDropProducts = async () => {
        if (!selectedProducts.length || !user) return;

        await mutateAsync(selectedProducts.map((cartItemId) => ({ cartItemId })));
        await refetch();
        setSelectedProducts([]);
    };

    const groupedCartProducts = useMemo(() => {
        if (!user) return [];
        return [...user.cart]
            .sort((a, b) => +a.product.id - +b.product.id)
            .reduce((acc: { id: number; product: any; count: number }[], product) => {
                const foundProduct = acc.find((item) => item.product.id === product.product.id);

                if (foundProduct) {
                    foundProduct.count += 1;
                } else {
                    acc.push({ ...product, count: 1 });
                }

                return acc;
            }, []);
    }, [user]);

    const totalCost = useMemo(() => {
        return groupedCartProducts.reduce((total, { product, count }) => {
            return total + +product.price * count;
        }, 0);
    }, [groupedCartProducts]);

    return (
        <div className={styles.cartPage}>
            {data ? (
                !data?.length ? (
                    <div className={styles.placeholder}>
                        <div className={styles.placeholderTitle}>Корзина пуста</div>
                        <p className={styles.subtitle}>
                            Перейдите в каталог, чтобы добавить товары в корзину.Или авторизуйтесь, чтобы посмотреть уже
                            добавленные товары.
                        </p>
                        <div className={styles.buttons}>
                            <Button onClick={() => router.push('/catalog')} className={styles.button}>
                                Продолжить покупки
                            </Button>
                            {!user && (
                                <Button
                                    variant={'outline'}
                                    onClick={() => router.push('?authentication=signin')}
                                    className={styles.button}
                                >
                                    Войти
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <section>
                        <div className={'container'}>
                            <h1 className={clsx(styles.title, 'title')}>
                                Корзина
                                <span className={styles.count}>{data?.length}</span>
                            </h1>
                            <div className={styles.actions}>
                                <Checkbox
                                    label={'Выбрать все'}
                                    className={clsx(styles.button, styles.check)}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                                <button
                                    onClick={handleDropProducts}
                                    className={clsx(
                                        styles.button,
                                        styles.delete,
                                        selectedProducts.length && styles.active,
                                    )}
                                >
                                    Удалить выбранное
                                </button>
                            </div>
                            <div className={styles.cart}>
                                <div className={styles.cartList}>
                                    {data?.map((product) => (
                                        <ProductCartCard
                                            key={product.id}
                                            product={product}
                                            countProducts={product.count}
                                            selected={selectedProducts.includes(product.id)}
                                            handleSelectProduct={handleSelectProduct}
                                        />
                                    ))}
                                </div>
                                <div className={styles.cartOrder}>
                                    <Button fullWidth disabled onClick={() => router.push('/order')}>
                                        Оформить заказ
                                    </Button>
                                    <p className={styles.hint}>
                                        Доступные способы и время доставки можно выбрать при оформлении заказа
                                    </p>
                                    <div className={styles.separator} />
                                    <div className={styles.counts}>
                                        <span>Всего: {uniqueCount} товара</span>
                                        <span className={styles.ellipse} />
                                        <span>2 489 г</span>
                                    </div>
                                    <div className={styles.cost}>
                                        <div>Общая стоимость</div>
                                        <div className={styles.price}>{priceFormat(totalCost)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            ) : (
                <></>
            )}

            <RecentProduct />
        </div>
    );
};
