'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/app/_providers/AuthProvider';
import { CartProduct, useCartStore } from '@/entities/cart';
import { productApi } from '@/entities/product';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import { Button, Checkbox, Separator } from '@/shared/ui';
import { RecentProduct } from '@/widgets';

import styles from './CartPage.module.scss';

export const CartPage = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const { products, removeFromCart } = useCartStore();
    const router = useRouter();
    const productsIds = products.map((product) => product.id);
    const { isAuthenticated } = useAuth();

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
                                    <span>190 770 ₽</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <div className={styles.placeholderTitle}>Корзина пуста</div>
                        <p>
                            Перейдите в каталог, чтобы добавить товары в корзину.
                            {!isAuthenticated && 'Или авторизуйтесь, чтобы посмотреть уже добавленные товары.'}
                        </p>
                        <div className={styles.buttons}>
                            <Button variant={'solid'} fullWidth onClick={() => router.push('/catalog')}>
                                Продолжить покупки
                            </Button>
                            {!isAuthenticated && (
                                <Button
                                    variant={'outline'}
                                    fullWidth
                                    onClick={() => router.push('?auth=signin', { scroll: false })}
                                >
                                    Войти
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </section>
            <RecentProduct />
        </div>
    );
};
