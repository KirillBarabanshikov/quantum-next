import { ProductInfo, ProductSlider } from '@/entities/product/ui/ProductDetails/ui';
import { Breadcrumbs } from '@/shared/ui';

import styles from './ProductDetails.module.scss';

const links = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/' },
    { text: 'FPV', href: '/' },
    { text: 'TINY WHOOP', href: '/' },
    { text: 'Набор BETAFPV Cetus Pro FPV Kit (RTF)', href: '/' },
];

export const ProductDetails = () => {
    return (
        <div className={styles.productDetails}>
            <section className={styles.productInfoContainer}>
                <div>
                    <Breadcrumbs links={links} className={styles.breadcrumbs} />
                    <ProductSlider />
                </div>
                <ProductInfo />
            </section>
        </div>
    );
};
