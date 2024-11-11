import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, Fragment, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/entities/product';
import { Delivery } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Delivery/Delivery';
import { Description } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Description/Description';
import { Payment } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Payment/Payment';
import { Warranty } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Warranty/Warranty';
import { Characteristics } from '@/entities/product/ui/ProductDetails/ui/ProductTabs/Сharacteristics/Characteristics';
import styles from '@/entities/product/ui/ProductMobile/ProductMobile.module.scss';
import Ellipse from '@/shared/assets/icons/ellipse.svg';
import { Button, FullScreen } from '@/shared/ui';

interface IAboutProductProps {
    product: IProduct;
}

const tabs = ['Характеристики', 'Описание', 'Гарантия', 'Оплата', 'Доставка'];

export const AboutProduct: FC<IAboutProductProps> = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.characteristics}>
                    {product.characteristics.map((characteristic, index) => {
                        return (
                            <Fragment key={characteristic.id}>
                                <span key={characteristic.id}>{characteristic.value}</span>
                                {index < product.characteristics.length - 1 && <Ellipse />}
                            </Fragment>
                        );
                    })}
                </div>
                <Image
                    src={product.images[0]?.image || '/'}
                    alt={product.title}
                    width={341}
                    height={217}
                    className={styles.image}
                />
                <Button fullWidth theme={'white'} onClick={() => setIsOpen(true)} className={styles.button}>
                    о товаре
                </Button>
            </div>
            <FullScreen isOpen={isOpen} onClose={() => setIsOpen(false)} title={'О товаре'}>
                <Swiper slidesPerView={'auto'} spaceBetween={6} className={styles.tabs}>
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
                                <Characteristics key={'characteristics'} product={product} />,
                                <Description key={'description'} product={product} />,
                                <Warranty key={'warranty'} />,
                                <Payment key={'payment'} />,
                                <Delivery key={'delivery'} />,
                            ][currentTab]
                        }
                    </motion.div>
                </AnimatePresence>
            </FullScreen>
        </>
    );
};
