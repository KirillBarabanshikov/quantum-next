'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct, ProductCard } from '@/entities/product';

import styles from './ProductsCarousel.module.scss';

interface IProductsCarouselProps {
    title: string;
    products?: IProduct[];
    withContainer?: boolean;
    className?: string;
}

export const ProductsCarousel: FC<IProductsCarouselProps> = ({ title, products, withContainer = true, className }) => {
    return (
        <section className={clsx(styles.productsCarouselWrap, className)}>
            <div className={clsx(withContainer && 'container')}>
                <h2 className={clsx(styles.title, 'title')}>{title}</h2>
            </div>
            <div className={clsx(withContainer && 'container')}>
                <Swiper slidesPerView={'auto'} breakpoints={{ 0: { spaceBetween: 10 }, 993: { spaceBetween: 20 } }}>
                    {products?.map((product) => {
                        return (
                            <SwiperSlide key={product.id} className={styles.slide}>
                                <ProductCard product={product} className={styles.productCard} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};
