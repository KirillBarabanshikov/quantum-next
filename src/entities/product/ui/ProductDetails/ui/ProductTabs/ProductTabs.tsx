'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Dislike from '@/shared/assets/icons/dislike.svg';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import Like from '@/shared/assets/icons/like.svg';

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
            <div className={styles.wrap}>
                <div>
                    Набор Cetus Pro FPV Kit — лучший выбор для новичков на данный момент. В комплекте бесколлекторный
                    квадрокоптер Cetus Pro, пульт управления LiteRadio2 SE, видео-шлем VR02 FPV Goggles — достаточно
                    мощный и манёвренный как для начинающих, так и для профессионалов, чтобы практиковаться и дома, и на
                    улице.
                </div>
                <br />
                <h2>Cetus Pro</h2>
                <br />
                <div>
                    Cetus Pro — бесколлекторный дрон с рамой 78 мм и питанием от 1S, предназначен для полётов в
                    помещении. Связывается с пультом по протоколу Frsky. Как и Cetus X версии Cetus FC, он имеет три
                    режима полёта (N/S/M), три уровня скорости и функцию Turtle. Оборудован нижней камерой, барометром и
                    лазером для стабилизации, умеет зависать в точке.
                </div>
                <ul>
                    <li>
                        Функция полётного помощника значительно снижает уровень требований к навыкам для управления
                        дроном. Коптер способен зависать в точке благодаря барометру/лазеру. Это самый упрощённый способ
                        попасть в продвинутый FPV.
                    </li>
                </ul>
            </div>
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
    return (
        <div className={styles.feedback}>
            <div className={styles.gradeWrap}>
                <GradeIcon />
                <div>4.4</div>
                <div className={styles.ellipse} />
                <div>32 отзыва</div>
            </div>
            <div className={styles.feedbackList}>
                <article className={styles.feedbackCard}>
                    <div className={styles.body}>
                        <div>
                            <p className={styles.name}>Александр Козак</p>
                            <div className={styles.grades}>
                                <GradeIcon />
                                <GradeIcon />
                            </div>
                        </div>
                        <p className={styles.text}>
                            Набор быстро пришел. Летает бодро. В качестве обучения очень хорош. Упал раз 200, но
                            продолжает летать
                        </p>
                    </div>
                    <div className={styles.rateWrap}>
                        <span>месяц назад</span>
                        <div className={styles.rate}>
                            <div className={styles.rateItem}>
                                <Like />
                                <span>(5)</span>
                            </div>
                            <div className={styles.rateItem}>
                                <Dislike />
                                <span>(0)</span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

const ProductWarranty = () => {
    return (
        <div className={styles.content}>
            <div className={styles.wrap}>
                <div>
                    Гарантийный период – это срок, во время которого клиент, обнаружив недостаток товара имеет право
                    потребовать от продавца или изготовителя принять меры по устранению дефекта. Продавец должен
                    устранить недостатки, если не будет доказано, что они возникли вследствие нарушений покупателем
                    правил эксплуатации.
                </div>
                <br />
                <br />
                <h2>С какого момента начинается гарантия?</h2>
                <br />
                <ul>
                    <li>с момента передачи товара потребителю, если в договоре нет уточнения;</li>
                    <li>с момента передачи товара потребителю, если в договоре нет уточнения;</li>
                    <li>с момента передачи товара потребителю, если в договоре нет уточнения;</li>
                    <li>с момента передачи товара потребителю, если в договоре нет уточнения;</li>
                </ul>
            </div>
        </div>
    );
};

const ProductPayment = () => {
    return (
        <div className={styles.content}>
            <div className={styles.wrap}>
                <h2>Наличные</h2>
                <br />
                <div>
                    Оплата принимается в российских рублях в нашем магазине или курьером при заказе с доставкой. При
                    получении товара обязательно проверьте его комплектацию, наличие гарантийного талона и чека.
                </div>
                <br />
                <br />
                <h2>Банковской картой</h2>
                <br />
                <div>
                    Вы можете совершить покупку с помощью банковской карты в нашем центре продаж или при доставке нашим
                    курьером. Данный способ расчета не влияет на стоимость товара - комиссия при оплате заказа не
                    взимается.
                </div>
            </div>
        </div>
    );
};

const ProductDelivery = () => {
    return (
        <div className={styles.content}>
            <div className={styles.wrap}>
                <h2>Экспресс-доставка курьером</h2>
                <br />
                <div>
                    Быстрая и надёжная доставка по городам России и в страны дальнего зарубежья. Данная услуга
                    осуществляется в режимах: «дверь-дверь», «окно-дверь», «дверь-окно», «окно-окно». Экспресс-доставка
                    от ФГУП ГЦСС имеет ряд дополнительных преимуществ: к Вашим услугам широкая региональная сеть - 77
                    Управлений и 135 отделений спецсвязи по всей России, которая позволяет обслуживать более 2500
                    городов.
                </div>
            </div>
        </div>
    );
};
