import Image from 'next/image';
import { FC } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow_down2.svg';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import FileIcon from '@/shared/assets/icons/file.svg';
import { API_URL } from '@/shared/consts';
import { Button, Separator } from '@/shared/ui';

import { IOrder } from '../../model';
import styles from './OrderCard.module.scss';

interface IOrderCardProps {
    order: IOrder;
}

export const OrderCard: FC<IOrderCardProps> = ({ order }) => {
    return (
        <article className={styles.orderCard}>
            <header className={styles.header}>
                <div className={styles.headerTitle}>
                    <div className={styles.orderNumber}>Заказ № {order.id}</div>
                    <div className={styles.status}>Передано в доставку</div>
                </div>
                <div>
                    <ArrowIcon />
                </div>
            </header>
            <Separator />
            <div className={styles.body}>
                <div className={styles.wrap}>
                    <div className={styles.info}>
                        <div className={styles.count}>
                            <span>Всего: 3 товара</span>
                            <Ellipse />
                            <span>2 489 г</span>
                        </div>
                        <div className={styles.price}>190 770 ₽</div>
                        <Button variant={'outline'} className={styles.button}>
                            <FileIcon />
                            Документы
                        </Button>
                    </div>
                    <div className={styles.productsPreview}>
                        {order.orderArticles.map((product) => {
                            return (
                                <Image
                                    key={product.article.id}
                                    src={`${API_URL}${product.article.images[0]?.image || ''}`}
                                    alt={product.article.title}
                                    width={164}
                                    height={144}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </article>
    );
};
