import clsx from 'clsx';
import Image from 'next/image';
import { FC, Fragment } from 'react';

import { IProduct } from '@/entities/product';
import { ProductModifications } from '@/entities/product/ui/ProductDetails/ui/ProductModifications';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import WalletIcon from '@/shared/assets/icons/wallet.svg';
import { priceFormat } from '@/shared/lib';
import { Badge, Button } from '@/shared/ui';
import { RecentProduct } from '@/widgets';

import { ProductSlider } from '../ProductDetails/ui';
import { ProductHeader } from '../ProductHeader';
import styles from './ProductMobile.module.scss';

interface IProductMobileProps {
    product: IProduct;
}

export const ProductMobile: FC<IProductMobileProps> = ({ product }) => {
    return (
        <div className={styles.productWrap}>
            <ProductHeader product={product} />
            <div className={styles.productBody}>
                <ProductSlider product={product} />
                <div className={styles.tags}>
                    {product.stock && <Badge text={'В наличии'} color={'#058943'} />}
                    {product.domestic && <Badge text={'Отечественный производитель'} color={'#4733F4'} />}
                </div>
                <div className={clsx(styles.wrap)}>
                    <div className={styles.price}>
                        <WalletIcon />
                        <span>{priceFormat(product.price)}</span>
                    </div>
                </div>
                <ProductModifications product={product} />
                <div className={styles.wrap}>
                    <div className={styles.title}>{product.title}</div>
                    <div className={styles.characteristics}>
                        {product.characteristics.map((characteristic, index) => {
                            return (
                                <Fragment key={characteristic.id}>
                                    <span key={characteristic.id}>{characteristic.value}</span>
                                    {index < product.characteristics.length - 1 && <Ellipse />}
                                </Fragment>
                            );
                        })}
                    </div>
                    <Image
                        src={product.images[0]?.image || '/'}
                        alt={product.title}
                        width={341}
                        height={217}
                        className={styles.image}
                    />
                    <Button fullWidth theme={'white'} className={styles.button}>
                        о товаре
                    </Button>
                </div>
                <RecentProduct />
            </div>
        </div>
    );
};
