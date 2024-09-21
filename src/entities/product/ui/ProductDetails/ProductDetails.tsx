import clsx from 'clsx';
import { FC } from 'react';

import { useCategoryByIdQuery } from '@/entities/category';
import { IProduct } from '@/entities/product';
import { ProductInfo, ProductSlider, ProductTabs } from '@/entities/product/ui/ProductDetails/ui';
import { Breadcrumbs } from '@/shared/ui';

import styles from './ProductDetails.module.scss';

const links = [
    { text: 'Главная', href: '/' },
    { text: 'Каталог', href: '/catalog' },
];

interface IProductDetailsProps {
    product: IProduct;
}

export const ProductDetails: FC<IProductDetailsProps> = ({ product }) => {
    const { data: category } = useCategoryByIdQuery(product?.categoryId as string);

    if (!category) return <></>;

    return (
        <div className={styles.productDetails}>
            <section className={clsx(styles.productInfoContainer, 'container')}>
                <div>
                    <Breadcrumbs
                        links={[
                            ...links,
                            ...[
                                { text: category.title, href: `/catalog/${category.id}` },
                                { text: product.articles[0].title },
                            ],
                        ]}
                        className={styles.breadcrumbs}
                    />
                    <ProductSlider product={product} />
                </div>
                <ProductInfo product={product} />
            </section>
            <ProductTabs />
        </div>
    );
};
