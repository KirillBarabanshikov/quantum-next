'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { IProduct } from '@/entities/product';
import ShareIcon from '@/shared/assets/icons/share.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import { priceFormat } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Badge } from '@/shared/ui/Badge/Badge';

import styles from './ProductInfo.module.scss';

interface IProductInfoProps {
    product: IProduct;
}

export const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
    return (
        <div className={styles.productInfo}>
            <h1 className={styles.name}>{product.title}</h1>
            <div className={styles.gradeContainer}>
                <GradeIcon />
                <span className={clsx(styles.grade, styles.info)}>0.0</span>
                <span className={styles.ellipse} />
                <span className={styles.info}>{product.reviews.length} отзыва</span>
            </div>
            <div className={styles.info}>Артикул: {product.title}</div>
            <div className={styles.price}>{priceFormat(product.price)}</div>
            <div className={styles.separator} />
            <div className={styles.tags}>
                <Badge text={'В наличии'} color={'#058943'} />
                <Badge text={'Отечественный производитель'} color={'#4733F4'} />
            </div>
            <div className={styles.specifications}>
                {product.characteristics.map((characteristic) => (
                    <div key={characteristic.id} className={styles.specification}>
                        <p className={styles.specificationTitle}>{characteristic.title}</p>
                        <p className={styles.specificationValue}>
                            {characteristic?.value} {characteristic.categoryCharacteristic?.measurement}
                        </p>
                    </div>
                ))}
            </div>
            <div className={styles.buttons}>
                <Button variant={'outline'} className={styles.shareButton}>
                    Поделиться
                    <ShareIcon />
                </Button>
                <Button fullWidth>В КОРЗИНУ</Button>
            </div>
        </div>
    );
};
