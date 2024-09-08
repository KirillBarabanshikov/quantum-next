import React from 'react';

import { ProductDetails } from '@/entities/product/ui/ProductDetails';
import { ProductsCarousel } from '@/widgets';
import { CallBanner } from '@/widgets/Banners';

import styles from './page.module.scss';

export default function Product() {
    return (
        <div className={styles.productPage}>
            <ProductDetails />
            <ProductsCarousel title={'Вы смотрели'} className={styles.carousel} />
            <CallBanner />
        </div>
    );
}
