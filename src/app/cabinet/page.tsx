'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { OrderCard } from '@/entities/order';
import { ProductCard } from '@/entities/product';
import { Dropdown } from '@/shared/ui';

import styles from './page.module.scss';

const tabs = ['Заказы', 'Профили', 'Аккаунт', 'Избранное'];

export default function Cabinet() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className={styles.cabinetPage}>
            <section>
                <div className={'container'}>
                    <h1 className={clsx(styles.title, 'title')}>Личный кабинет</h1>
                    <div className={styles.tabs}>
                        {tabs.map((tab, index) => (
                            <div
                                key={tab}
                                onClick={() => setSelectedTab(index)}
                                className={clsx(styles.tab, selectedTab === index && styles.selected)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                    <AnimatePresence initial={false} mode={'wait'}>
                        <motion.div
                            key={selectedTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            {
                                [
                                    <Orders key={'orders'} />,
                                    <Profiles key={'Profiles'} />,
                                    <Account key={'Account'} />,
                                    <Favorites key={'Favorites'} />,
                                ][selectedTab]
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}

const Orders = () => {
    return (
        <div className={styles.orders}>
            <div className={styles.filters}>
                <Dropdown
                    options={[{ label: 'ООО «Цифродинамика»', value: '1' }]}
                    value={'1'}
                    onChange={() => {}}
                    variant={'outline'}
                />
                <div className={styles.dropdowns}>
                    <Dropdown options={[{ label: 'Все заказы', value: '1' }]} value={'1'} onChange={() => {}} />
                    <Dropdown options={[{ label: 'Сначала новые', value: '1' }]} value={'1'} onChange={() => {}} />
                </div>
            </div>
            <div className={styles.ordersList}>
                <OrderCard />
            </div>
        </div>
    );
};

const Profiles = () => {
    return <div>Profiles</div>;
};

const Account = () => {
    return <div>Account</div>;
};

const Favorites = () => {
    return (
        <div className={styles.favorites}>
            <Dropdown options={[{ label: 'Сначала новые', value: '1' }]} value={'1'} onChange={() => {}} />
            <div className={styles.favoritesList}>
                {Array.from({ length: 8 }).map((_, index) => {
                    return <ProductCard key={index} />;
                })}
            </div>
        </div>
    );
};
