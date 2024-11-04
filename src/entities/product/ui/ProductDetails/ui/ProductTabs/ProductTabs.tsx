'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/entities/product';

import { Delivery } from './Delivery/Delivery';
import { Description } from './Description/Description';
import { Payment } from './Payment/Payment';
import styles from './ProductTabs.module.scss';
import { Reviews } from './Reviews/Reviews';
import { Warranty } from './Warranty/Warranty';
import { Characteristics } from './Сharacteristics/Characteristics';

const tabs = ['Описание', 'Параметры', 'Отзывы', 'Гаранития', 'Оплата', 'Доставка'];

interface IProductTabsProps {
    product: IProduct;
}

export const ProductTabs: FC<IProductTabsProps> = ({ product }) => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className={clsx(styles.productTabs)}>
            <Swiper slidesPerView={'auto'} spaceBetween={18} className={clsx(styles.tabs)}>
                {tabs.map((tab, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div
                            className={clsx(styles.tab, currentTab === index && styles.current)}
                            onClick={() => setCurrentTab(index)}
                        >
                            {tab} {tab === 'Отзывы' && <span>({product.reviews.length})</span>}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.2,
                    }}
                    className={styles.tabBody}
                >
                    {
                        [
                            <Description key={'description'} product={product} />,
                            <Characteristics key={'characteristics'} product={product} />,
                            <Reviews key={'reviews'} product={product} />,
                            <Warranty key={'warranty'} />,
                            <Payment key={'payment'} />,
                            <Delivery key={'delivery'} />,
                        ][currentTab]
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
