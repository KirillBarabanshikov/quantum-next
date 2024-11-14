import clsx from 'clsx';
import { FC } from 'react';

import { IProduct } from '@/entities/product';
import { ProductModifications } from '@/entities/product/ui/ProductDetails/ui/ProductModifications';
import WalletIcon from '@/shared/assets/icons/wallet.svg';
import { priceFormat } from '@/shared/lib';
import { Badge } from '@/shared/ui';

import { ProductSlider } from '../ProductDetails/ui';
import { ProductHeader } from '../ProductHeader';
import styles from './ProductMobile.module.scss';
import { AboutProduct, CartButton, Reviews } from './ui';

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
                <Reviews product={product} />
                <AboutProduct product={product} />
                <CartButton product={product} />
            </div>
        </div>
    );
};
