'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/arrow_down.svg';
import ArrowDown from '@/shared/assets/icons/arrow_down2.svg';
import UnionIcon from '@/shared/assets/icons/union.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useBodyScrollLock, useMediaQuery } from '@/shared/hooks';
import { Button, Portal } from '@/shared/ui';

import styles from './CatalogButton.module.scss';

const items = [
    {
        name: 'Портативное аудио',
        path: '/',
        children: [
            { name: 'Портативные колонки', path: '/' },
            { name: 'Умные колонки', path: '/' },
        ],
    },
    {
        name: 'Домашнее аудио и DJ',
        path: '/',
        children: [
            { name: 'Саундбары', path: '/' },
            { name: 'Музыкальные центры', path: '/' },
            { name: 'Товары для блогеров', path: '/' },
            { name: 'DJ-контроллеры', path: '/' },
        ],
    },
    {
        name: 'Все наушники',
        path: '/',
        children: [
            { name: 'Наушники True Wireless', path: '/' },
            { name: 'Спортивные наушники', path: '/' },
            { name: 'Наушники-вкладыши и внутриканальные', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
        ],
    },
    {
        name: 'Автозвук',
        path: '/',
        children: [
            { name: 'Наушники True Wireless', path: '/' },
            { name: 'Спортивные наушники', path: '/' },
            { name: 'Наушники-вкладыши и внутриканальные', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
        ],
    },
    {
        name: 'Домашнее аудио и DJ',
        path: '/',
        children: [
            { name: 'Наушники True Wireless', path: '/' },
            { name: 'Спортивные наушники', path: '/' },
            { name: 'Наушники-вкладыши и внутриканальные', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
            { name: 'Наушники с костной проводимостью звука', path: '/' },
        ],
    },
];

export const CatalogButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);
    const { setIsLocked } = useBodyScrollLock();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        setIsLocked(isOpen);
    }, [isOpen, setIsLocked]);

    return (
        <div className={styles.catalogButtonWrap}>
            <Button theme={'white'} className={styles.catalogButton} onClick={() => setIsOpen((prev) => !prev)}>
                <UnionIcon />
                {!isMatch && (
                    <>
                        Каталог
                        <motion.div animate={{ rotate: isOpen ? '180deg' : '0deg' }}>
                            <ArrowDownIcon />
                        </motion.div>
                    </>
                )}
            </Button>
            <Portal>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.catalogMenuWrap}
                        >
                            <div className={clsx(styles.catalogMenu, 'container')}>
                                <div className={clsx(styles.catalogList, 'scrollbar-hide')}>
                                    {Array.from({ length: 20 }).map((_, index) => {
                                        return (
                                            <Link key={index} href={'/'} className={styles.catalogListItem}>
                                                Акции, скидки и распродажи
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className={clsx(styles.catalogCategory, 'scrollbar-hide')}>
                                    <div className={styles.title}>
                                        Аудиотехника<span>3453 товара</span>
                                    </div>
                                    <div className={styles.categoryItems}>
                                        {items.map((item, index) => (
                                            <CategoryItemsList key={index} item={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Portal>
        </div>
    );
};

interface ICategoryItemsListProps {
    item: { name: string; path: string; children: { name: string; path: string }[] };
}

const CategoryItemsList: FC<ICategoryItemsListProps> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.categoryItemsList}>
            <Link href={item.path} className={clsx(styles.categoryItem, styles.categoryItemTitle)}>
                {item.name}
            </Link>
            {item.children.slice(0, isOpen ? undefined : 6).map((child, index) => {
                return (
                    <Link key={index} href={child.path} className={styles.categoryItem}>
                        {child.name}
                    </Link>
                );
            })}
            {item.children.length > 6 && (
                <span onClick={() => setIsOpen((prev) => !prev)} className={styles.more}>
                    {isOpen ? 'Свернуть' : 'Еще'}
                    <ArrowDown className={clsx(styles.arrow, isOpen && styles.up)} />
                </span>
            )}
        </div>
    );
};
