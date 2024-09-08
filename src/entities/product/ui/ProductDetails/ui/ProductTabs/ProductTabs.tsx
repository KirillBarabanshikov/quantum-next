'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './ProductTabs.module.scss';

const tabs = ['Описание', 'Параметры', 'Отзывы', 'Гаранития', 'Оплата', 'Доставка'];

export const ProductTabs = () => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className={clsx(styles.productTabs, 'container')}>
            <Swiper slidesPerView={'auto'} spaceBetween={18} className={clsx(styles.tabs)}>
                {tabs.map((tab, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div
                            className={clsx(styles.tab, currentTab === index && styles.current)}
                            onClick={() => setCurrentTab(index)}
                        >
                            {tab}
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
                            <ProductDescription key={'description'} />,
                            <ProductSpecifications key={'specifications'} />,
                            <ProductFeedback key={'feedback'} />,
                            <ProductWarranty key={'warranty'} />,
                            <ProductPayment key={'payment'} />,
                            <ProductDelivery key={'delivery'} />,
                        ][currentTab]
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const ProductDescription = () => {
    return (
        <div className={styles.content}>
            <div>
                Набор Cetus Pro FPV Kit — лучший выбор для новичков на данный момент. В комплекте бесколлекторный
                квадрокоптер Cetus Pro, пульт управления LiteRadio2 SE, видео-шлем VR02 FPV Goggles — достаточно мощный
                и манёвренный как для начинающих, так и для профессионалов, чтобы практиковаться и дома, и на улице.
            </div>
            <br />
            <h2>Cetus Pro</h2>
            <br />
            <div>
                Cetus Pro — бесколлекторный дрон с рамой 78 мм и питанием от 1S, предназначен для полётов в помещении.
                Связывается с пультом по протоколу Frsky. Как и Cetus X версии Cetus FC, он имеет три режима полёта
                (N/S/M), три уровня скорости и функцию Turtle. Оборудован нижней камерой, барометром и лазером для
                стабилизации, умеет зависать в точке.
            </div>
            <ul>
                <li>
                    Функция полётного помощника значительно снижает уровень требований к навыкам для управления дроном.
                    Коптер способен зависать в точке благодаря барометру/лазеру. Это самый упрощённый способ попасть в
                    продвинутый FPV.
                </li>
            </ul>
        </div>
    );
};

const ProductSpecifications = () => {
    return (
        <div className={styles.specifications}>
            {Array.from({ length: 12 }).map((_, index) => {
                return (
                    <div key={index} className={styles.specification}>
                        <div className={styles.title}>Макс. скорость набора высоты</div>
                        <div className={styles.value}>
                            <div>1 м/с (режис C)</div>
                            <div>1 м/с (режис C)</div>
                            <div>1 м/с (режис C)</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const ProductFeedback = () => {
    return <div>feedback</div>;
};

const ProductWarranty = () => {
    return <div>Warranty</div>;
};

const ProductPayment = () => {
    return <div>payment</div>;
};

const ProductDelivery = () => {
    return <div>delivery</div>;
};
