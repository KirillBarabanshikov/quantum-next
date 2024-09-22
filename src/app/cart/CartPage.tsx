'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { ProductCartCard } from '@/entities/product';
import { useSessionStore } from '@/entities/session';
import CancelIcon from '@/shared/assets/icons/cancel.svg';
import CheckIcon from '@/shared/assets/icons/priority.svg';
import { Button } from '@/shared/ui';

import styles from './CartPage.module.scss';

export const CartPage = () => {
    const router = useRouter();
    const { user } = useSessionStore();

    return (
        <div className={styles.cartPage}>
            {!user || !user.cart.length ? (
                <div className={styles.placeholder}>
                    <div className={styles.placeholderTitle}>Корзина пуста</div>
                    <p className={styles.subtitle}>
                        Перейдите в каталог, чтобы добавить товары в корзину.{' '}
                        {!user && 'Или авторизуйтесь, чтобы посмотреть уже добавленные товары.'}
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
                            <span className={styles.count}>3</span>
                        </h1>
                        <div className={styles.actions}>
                            <button>
                                <CheckIcon className={styles.check} />
                                Выбрать все
                            </button>
                            <button>
                                <CancelIcon />
                                Удалить выбранное
                            </button>
                        </div>
                        <div className={styles.cart}>
                            <div className={styles.cartList}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <ProductCartCard key={index} />
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
                                    <span>Всего: 3 товара</span>
                                    <span className={styles.ellipse} />
                                    <span>2 489 г</span>
                                </div>
                                <div className={styles.cost}>
                                    <div>Общая стоимость</div>
                                    <div className={styles.price}>190 770 ₽</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {/*<ProductsCarousel title={'Вы смотрели'} />*/}
        </div>
    );
};
