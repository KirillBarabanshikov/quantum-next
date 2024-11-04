import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, Fragment, useMemo, useState } from 'react';

import { OrderProductCard } from '@/entities/order';
import ArrowIcon from '@/shared/assets/icons/arrow_down2.svg';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import FileIcon from '@/shared/assets/icons/file.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { getCountWord, priceFormat } from '@/shared/lib';
import { Button, Separator } from '@/shared/ui';

import { IOrder } from '../../model';
import styles from './OrderCard.module.scss';

interface IOrderCardProps {
    order: IOrder;
}

export const OrderCard: FC<IOrderCardProps> = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    const totalCost = useMemo(() => {
        return order.orderArticles.reduce((acc, cur) => {
            return acc + (cur.article?.price || 0) * cur.quantity;
        }, 0);
    }, [order]);

    const totalCount = useMemo(() => {
        return order.orderArticles.reduce((acc, cur) => {
            return acc + cur.quantity;
        }, 0);
    }, [order]);

    return (
        <article className={styles.orderCard}>
            <header
                className={styles.header}
                onClick={() => {
                    if (isMatch) return;
                    setIsOpen((prev) => !prev);
                }}
            >
                <div className={styles.headerTitle}>
                    <div className={styles.orderNumber}>Заказ № {order.id}</div>
                    <div className={styles.status}>Передано в доставку</div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ damping: 0 }}>
                    <ArrowIcon />
                </motion.div>
            </header>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.infoOpenWrap}
                    >
                        <div className={clsx(styles.wrap, styles.info, styles.infoOpen)}>
                            <div className={styles.count}>
                                <span>Всего: {getCountWord(totalCount, 'товар')}</span>
                                <Ellipse />
                                <span>2 489 г</span>
                            </div>
                            <div className={styles.wrap}>
                                <Button variant={'outline'} className={styles.button}>
                                    <FileIcon />
                                    Документы
                                </Button>
                                <div className={styles.price}>{priceFormat(totalCost)}</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Separator className={styles.separator} />
            <AnimatePresence initial={false}>
                {!isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.body}
                    >
                        <div className={styles.wrap}>
                            <div className={styles.info}>
                                <div className={styles.count}>
                                    <span>Всего: {getCountWord(totalCount, 'товар')}</span>
                                    <Ellipse />
                                    <span>2 489 г</span>
                                </div>
                                <div className={styles.price}>{priceFormat(totalCost)}</div>
                                <Button variant={'outline'} className={styles.button}>
                                    <FileIcon />
                                    Документы
                                </Button>
                            </div>
                            <div className={styles.productsPreview}>
                                {order.orderArticles.slice(0, 3).map((product) => {
                                    if (!product.article) return <Fragment key={product.id} />;

                                    return (
                                        <Image
                                            key={product.id}
                                            src={product.article.images[0]?.image || '/'}
                                            alt={product.article.title}
                                            width={164}
                                            height={144}
                                            className={styles.image}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className={styles.bodyOpen}>
                            <div className={styles.productsList}>
                                {order.orderArticles.map((product) => {
                                    if (!product.article) return <Fragment key={product.id} />;

                                    return (
                                        <OrderProductCard key={product.id} product={product.article} withSeparator />
                                    );
                                })}
                            </div>
                            <div className={styles.foot}>
                                <div className={styles.deliveryType}>
                                    {order.deliveryType === 'courier' ? 'Доставка курьером' : 'Самовывоз'}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={styles.mobileBody}>
                <div className={styles.productsList}>
                    {order.orderArticles.map((product) => {
                        if (!product.article) return <Fragment key={product.id} />;

                        return <OrderProductCard key={product.id} product={product.article} withSeparator />;
                    })}
                </div>
                <div className={styles.count}>
                    <span>Всего: {getCountWord(totalCount, 'товар')}</span>
                    <Ellipse />
                    <span>2 489 г</span>
                </div>
                <Separator margin={'18px 0'} />
                <div className={styles.statusWrap}>
                    <span>Состояние</span>
                    <div className={styles.status}>Передано в доставку</div>
                </div>
                <div className={styles.totalCostWrap}>
                    <div className={styles.totalCost}>Общая стоимость</div>
                    <div className={styles.price}>{priceFormat(totalCost)}</div>
                </div>
                <Button variant={'outline'} className={styles.button} fullWidth>
                    <FileIcon />
                    Документы
                </Button>
            </div>
        </article>
    );
};
