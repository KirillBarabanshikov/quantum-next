'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useAuth } from '@/app/_providers/AuthProvider';
import { useCartStore } from '@/entities/cart';
import { orderApi, OrderProductCard } from '@/entities/order';
import { productApi } from '@/entities/product';
import { IndividualForm } from '@/features/profile';
import ArrowIcon from '@/shared/assets/icons/arrow_right_alt.svg';
import EllipseIcon from '@/shared/assets/icons/ellipse.svg';
import { getCountWord, priceFormat } from '@/shared/lib';
import { Accordion, Button, Checkbox, Input, Separator } from '@/shared/ui';
import { AlertModal } from '@/shared/ui/AlertModal';

import styles from './OrderPage.module.scss';

const deliveries = [
    { title: 'Самовывоз', value: 'pickup' },
    { title: 'Курьером', value: 'courier' },
];

export const OrderPage = () => {
    const [selectedProfile, setSelectedProfile] = useState<number | undefined>(undefined);
    const [selectedDelivery, setSelectedDelivery] = useState('pickup');
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();
    const { products, getCount, clearCart } = useCartStore();
    const productsIds = useMemo(() => products.map((product) => product.id), [products]);
    const queryClient = useQueryClient();

    const { data: cartProducts } = useQuery({
        queryKey: ['cart', productsIds],
        queryFn: () => (productsIds.length > 0 ? productApi.fetchProductsByIds(productsIds) : []),
    });

    const { mutateAsync: createOrder, isError } = useMutation({ mutationFn: orderApi.createOrder });

    const handleCreateOrder = async () => {
        if (!selectedProfile || !productsIds.length) return;

        try {
            await createOrder({
                payerProfileId: selectedProfile,
                deliveryType: selectedDelivery,
                articles: products.map((product) => ({ id: product.id, quantity: product.count })),
            });
            await queryClient.invalidateQueries({ queryKey: ['user'] });
            clearCart();
        } catch (e) {
            console.error(e);
        } finally {
            setIsOpen(true);
        }
    };

    const handleClose = () => {
        router.push('/cabinet/orders');
        setIsOpen(false);
    };

    const totalCost = useMemo(() => {
        return cartProducts?.reduce((acc, cur) => {
            return acc + cur.price * (products.find((product) => product.id === cur.id)?.count || 1);
        }, 0);
    }, [cartProducts, products]);

    if (!user) return <></>;

    return (
        <div className={clsx(styles.orderPage, 'page')}>
            <section className={'container'}>
                <div className={styles.back} onClick={() => router.push('/cart')}>
                    <ArrowIcon />
                    Назад в корзину
                </div>
                <h1 className={clsx(styles.title, 'title')}>Оформление заказа</h1>
                <div className={styles.wrap}>
                    <div className={styles.sections}>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Выберите профиль плательщика</h2>
                            <div className={styles.profilesList}>
                                {user.payerProfiles.map((profile) => {
                                    return (
                                        <Accordion
                                            key={profile.id}
                                            title={`${profile.firstName} ${profile.lastName}`}
                                            onClick={() => setSelectedProfile(profile.id)}
                                            isOpen={selectedProfile === profile.id}
                                        >
                                            <IndividualForm profile={profile} variant={'order'} />
                                        </Accordion>
                                    );
                                })}
                            </div>
                        </section>
                        <section className={styles.section}>
                            <div className={styles.sectionTitleWrap}>
                                <h2 className={styles.sectionTitle}>Доставка</h2>
                                <div className={styles.buttons}>
                                    {deliveries.map((delivery) => (
                                        <Button
                                            key={delivery.value}
                                            variant={selectedDelivery === delivery.value ? 'solid' : 'outline'}
                                            onClick={() => setSelectedDelivery(delivery.value)}
                                        >
                                            {delivery.title}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Состав заказа</h2>
                            <div className={styles.productsList}>
                                {cartProducts?.map((product, index) => (
                                    <OrderProductCard
                                        key={product.id}
                                        product={product}
                                        withSeparator={cartProducts!.length - 1 > index}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                    <div className={styles.orderInfo}>
                        <div>
                            <div className={styles.row}>
                                <div className={styles.count}>
                                    Всего: {getCountWord(getCount(), 'товар')} <EllipseIcon /> 2 489 г
                                </div>
                                <div>{priceFormat(totalCost)}</div>
                            </div>
                            <Separator margin={'18px 0'} />
                            <div className={styles.row}>
                                <div className={styles.count}>Доставка</div>
                                <div className={styles.delivery}>Бесплатно</div>
                            </div>
                        </div>
                        <Input placeholder={'Промокод'} variant={'white'} />
                        <div className={styles.totalWrap}>
                            <div className={styles.row}>
                                <div className={styles.totalTitle}>Общая стоимость</div>
                                <div className={styles.totalPrice}>{priceFormat(totalCost)}</div>
                            </div>
                            <Checkbox label={'использовать электронный документооборот'} />
                        </div>
                        <Button disabled={!selectedProfile || !productsIds.length} onClick={handleCreateOrder}>
                            Выставить счет
                        </Button>
                        <div className={styles.hint}>
                            Нажимая на кнопку, вы соглашаетесь с Условиями обработки персональных данных, а также с
                            Условиями продажи
                        </div>
                    </div>
                </div>
            </section>
            <AlertModal isOpen={isOpen} onClose={handleClose} isError={isError} onEnter={handleClose} />
        </div>
    );
};
