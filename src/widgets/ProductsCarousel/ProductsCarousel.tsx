'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct, ProductCard } from '@/entities/product';
import { Skeleton } from '@/shared/ui';

import styles from './ProductsCarousel.module.scss';

interface IProductsCarouselProps {
    title: string;
    className?: string;
    products?: IProduct[];
    isLoading?: boolean;
}

export const ProductsCarousel: FC<IProductsCarouselProps> = ({ title, products, isLoading, className }) => {
    return (
        <section className={clsx(styles.productsCarouselWrap, className)}>
            <div className={'container'}>
                <div className={styles.titleWrap}>
                    <h2 className={'title'}>{title}</h2>
                </div>
            </div>

            <Swiper
                slidesPerView={'auto'}
                breakpoints={{ 0: { spaceBetween: 11 }, 768: { spaceBetween: 20 } }}
                className={'container'}
            >
                {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => {
                          return (
                              <SwiperSlide key={index} className={styles.slide}>
                                  <Skeleton width={305} height={420} />
                              </SwiperSlide>
                          );
                      })
                    : products?.map((product) => {
                          return (
                              <SwiperSlide key={product.id} className={styles.slide}>
                                  <ProductCard product={product} />
                              </SwiperSlide>
                          );
                      })}
            </Swiper>
        </section>
    );
};
