'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { IProduct } from '@/entities/product';
import { BASE_URL } from '@/shared/consts';

import styles from './ProductSlider.module.scss';

interface IProductSliderProps {
    product: IProduct;
}

export const ProductSlider: FC<IProductSliderProps> = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [current, setCurrent] = useState(0);

    return (
        <div className={styles.productSlider}>
            <Swiper
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Thumbs]}
                spaceBetween={13}
                className={styles.mainSlider}
                onSlideChange={(swiper) => setCurrent(swiper.activeIndex)}
            >
                {product.images.map((image) => (
                    <SwiperSlide key={image.id} className={styles.slide}>
                        <Image
                            width={567}
                            height={430}
                            src={`${BASE_URL}/${image.image}`}
                            alt={'image'}
                            className={styles.image}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper onSwiper={setThumbsSwiper} modules={[Thumbs]} slidesPerView={'auto'} spaceBetween={13}>
                {product.images.map((image, index) => (
                    <SwiperSlide key={image.id} className={styles.slide}>
                        <Image
                            width={102}
                            height={102}
                            src={`${BASE_URL}/${image.image}`}
                            alt={'image'}
                            className={clsx(styles.image, index === current && styles.current)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
