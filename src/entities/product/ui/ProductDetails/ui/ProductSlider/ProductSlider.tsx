'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import styles from './ProductSlider.module.scss';

const images = [
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__',
];

export const ProductSlider = () => {
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
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <Image width={567} height={430} src={image} alt={'image'} className={styles.image} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper onSwiper={setThumbsSwiper} modules={[Thumbs]} slidesPerView={'auto'} spaceBetween={13}>
                {images.map((image, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <Image
                            width={102}
                            height={102}
                            src={image}
                            alt={'image'}
                            className={clsx(styles.image, index === current && styles.current)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
