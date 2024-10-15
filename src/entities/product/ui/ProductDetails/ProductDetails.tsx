'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { ICategory } from '@/entities/category';
import { IProduct } from '@/entities/product';
import { ProductInfo, ProductSlider, ProductTabs } from '@/entities/product/ui/ProductDetails/ui';
import { Breadcrumbs } from '@/shared/ui';

import styles from './ProductDetails.module.scss';

const breadcrumbs = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
];

interface IProductDetailsProps {
    product: IProduct;
    category: ICategory;
}
// TODO Нормально сделать
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
            <ProductTabs product={product} />
        </div>
    );
};
