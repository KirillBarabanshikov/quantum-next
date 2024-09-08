import clsx from 'clsx';

import { ProductCartCard } from '@/entities/product';
import CancelIcon from '@/shared/assets/icons/cancel.svg';
import CheckIcon from '@/shared/assets/icons/priority.svg';
import { Button } from '@/shared/ui';
import { ProductsCarousel } from '@/widgets';

import styles from './page.module.scss';

export default function Cart() {
    return (
        <div className={styles.cartPage}>
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
                            <Button fullWidth>Оформить заказ</Button>
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
            <ProductsCarousel title={'Вы смотрели'} />
        </div>
    );
}
