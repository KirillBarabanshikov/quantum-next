'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/shared/ui';

interface IFilterByCategoryProps {
    className?: string;
}

export const FilterByCategory: FC<IFilterByCategoryProps> = ({ className }) => {
    return (
        <Swiper slidesPerView={'auto'} spaceBetween={'10'} className={clsx('container', className)}>
            {Array.from({ length: 7 }).map((_, index) => {
                return (
                    <SwiperSlide key={index} style={{ width: 'auto' }}>
                        <Button variant={'outline'} size={'md'}>
                            Приемники
                        </Button>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
