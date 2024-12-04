import { FC } from 'react';

import { IProduct } from '@/entities/product';
import EllipseIcon from '@/shared/assets/icons/ellipse.svg';
import StarIcon from '@/shared/assets/icons/star.svg';
import { getCountWord, priceFormat } from '@/shared/lib';
import { Badge, Separator } from '@/shared/ui';

import styles from './ProductPreview.module.scss';

interface IProductPreviewProps {
    product: IProduct;
}

export const ProductPreview: FC<IProductPreviewProps> = ({ product }) => {
    return (
        <div className={styles.productPreview}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.ratingReviews}>
                <StarIcon className={styles.star} />
                <span className={styles.rating}>{product.average.toFixed(1)}</span>
                <EllipseIcon className={styles.ellipse} />
                <span className={styles.rating}>{getCountWord(product.reviews.length, 'отзыв')}</span>
            </div>
            <div className={styles.article}>Артикул: {product.number}</div>
            <div className={styles.number}>Количество на складе: {product.count} шт.</div>
            <div className={styles.price}>{product.priceRequest ? 'Цена по запросу' : priceFormat(product.price)}</div>
            <Separator margin={'24px 0'} className={styles.separator} />
            <div className={styles.tags}>
                {product.stock && <Badge text={'В наличии'} color={'#058943'} />}
                {product.domestic && <Badge text={'Отечественный производитель'} color={'#4733F4'} />}
                {product.new && <Badge text={'Новинка'} color={'#EE4723'} />}
                {product.popular && <Badge text={'Популярное'} color={'#FF3538'} />}
            </div>
            <div className={styles.specifications}>
                {product.characteristics.map((characteristic) => {
                    return (
                        <div key={characteristic.id} className={styles.specification}>
                            <div className={styles.specificationTitle}>{characteristic.title}</div>
                            <div className={styles.specificationValue}>
                                {characteristic.value} {characteristic?.categoryCharacteristic?.measurement}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Separator margin={'24px 0'} className={styles.separator} />
        </div>
    );
};
