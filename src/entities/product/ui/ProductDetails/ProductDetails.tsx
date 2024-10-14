import clsx from 'clsx';
import { FC } from 'react';

import { ICategory } from '@/entities/category';
import { IProduct } from '@/entities/product';
import { Breadcrumbs } from '@/shared/ui';

import styles from './ProductDetails.module.scss';
import { ProductInfo, ProductSlider } from './ui';

const breadcrumbs = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
];

interface IProductDetailsProps {
    product: IProduct;
    category: ICategory;
}

export const ProductDetails: FC<IProductDetailsProps> = ({ product, category }) => {
    return (
        <div className={styles.productDetails}>
            <section className={clsx(styles.productInfoContainer, 'container')}>
                <div>
                    <Breadcrumbs
                        breadcrumbs={[
                            ...breadcrumbs,
                            ...[{ text: category.title, href: `/catalog/${category.id}` }, { text: product.title }],
                        ]}
                        className={styles.breadcrumbs}
                    />
                    <ProductSlider product={product} />
                </div>
                <ProductInfo product={product} />
            </section>
        </div>
    );
};
