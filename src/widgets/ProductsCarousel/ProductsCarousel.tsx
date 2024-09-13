'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductCard } from '@/entities/product';

import styles from './ProductsCarousel.module.scss';

interface IProductsCarouselProps {
    title: string;
    className?: string;
}

export const ProductsCarousel: FC<IProductsCarouselProps> = ({ title, className }) => {
    // const [swiper, setSwiper] = useState<SwiperCore | null>(null);

    return (
        <section className={clsx(styles.productsCarouselWrap, className)}>
            <div className={'container'}>
                <div className={styles.titleWrap}>
                    <h2 className={'title'}>{title}</h2>
                    {/*<div className={styles.buttons}>*/}
                    {/*    <button onClick={() => swiper?.slidePrev()}>*/}
                    {/*        <ArrowBackwardIcon />*/}
                    {/*    </button>*/}
                    {/*    <button onClick={() => swiper?.slideNext()}>*/}
                    {/*        <ArrowForwardIcon />*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>

            <Swiper
                slidesPerView={'auto'}
                breakpoints={{ 0: { spaceBetween: 11 }, 768: { spaceBetween: 20 } }}
                // onSwiper={setSwiper}
                className={'container'}
            >
                {Array.from({ length: 10 }).map((_, index) => {
                    return (
                        <SwiperSlide key={index} className={styles.slide}>
                            <ProductCard />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
};
