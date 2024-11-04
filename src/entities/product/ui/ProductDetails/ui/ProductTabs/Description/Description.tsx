import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/entities/product';
import { API_URL } from '@/shared/consts';

import styles from '../ProductTabs.module.scss';

interface IDescriptionProps {
    product: IProduct;
}

export const Description: FC<IDescriptionProps> = ({ product }) => {
    return (
        <div className={clsx(styles.productDescription)}>
            {product.descriptions.map((description) => {
                if (!description.title && !description.description) {
                    return (
                        <div key={description.id}>
                            <Swiper
                                spaceBetween={20}
                                pagination={true}
                                modules={[Pagination]}
                                className={styles.productDescriptionSlider}
                            >
                                {description.images.map((image) => {
                                    return (
                                        <SwiperSlide key={image.id}>
                                            <Image
                                                src={`${API_URL}/${image.image}`}
                                                alt={'image'}
                                                width={1280}
                                                height={553}
                                                className={styles.slideImage}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    );
                }

                return (
                    <div
                        key={description.id}
                        className={clsx(styles.description, description.type === 'left' && styles.left)}
                    >
                        <div className={styles.descriptionWrap}>
                            <h2>{description.title}</h2>
                            <p>{description.description}</p>
                        </div>
                        <div className={styles.images}>
                            {description.images.map((image) => {
                                return (
                                    <Image
                                        key={image.id}
                                        src={`${API_URL}/${image.image}`}
                                        alt={'image'}
                                        width={630}
                                        height={450}
                                        className={styles.image}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
