import Image from 'next/image';
import { FC } from 'react';

import { IProduct } from '@/entities/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';
import { priceFormat } from '@/shared/lib';
import { Separator } from '@/shared/ui';

import styles from './OrderProductCard.module.scss';

interface IOrderProductCard {
    product: IProduct;
    withSeparator?: boolean;
}

export const OrderProductCard: FC<IOrderProductCard> = ({ product, withSeparator }) => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    return (
        <article className={styles.orderProductCard}>
            <div className={styles.body}>
                <Image src={product.images[0]?.image || '/'} alt={product.title} width={130} height={114} />
                <div className={styles.info}>
                    <div className={styles.titleWrap}>
                        <div className={styles.title}>{product.title}</div>
                        <div className={styles.number}>Артикул: {product.number}</div>
                    </div>
                    <div className={styles.price}>{priceFormat(product.price)}</div>
                </div>
            </div>
            {withSeparator && <Separator margin={isMatch ? '24px 0' : '10px 0'} />}
        </article>
    );
};
