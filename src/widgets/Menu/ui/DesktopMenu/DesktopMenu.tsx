import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC, useState } from 'react';

import ArrowDown from '@/shared/assets/icons/arrow_down2.svg';

import styles from './DeskropMenu.module.scss';

interface Item {
    name: string;
    path: string;
    children: {
        name: string;
        path: string;
    }[];
}

const items: Item[] = [
    {
        name: 'Портативное аудио',
        path: '/',
        children: [
            { name: 'Портативные колонки', path: '/' },
            { name: 'Умные колонки', path: '/' },
            { name: 'Компьютерные колонки', path: '/' },
            { name: 'МР3 плееры', path: '/' },
            { name: 'Диктофоны', path: '/' },
            { name: 'Магнитолы', path: '/' },
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

export const DesktopMenu = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.menu}>
            <div className={clsx(styles.menuContainer, 'container')}>
                <div className={clsx(styles.menuCategoriesList, 'scrollbar-hide')}>
                    {Array.from({ length: 20 }).map((_, index) => {
                        return (
                            <Link key={index} href={'/'} className={styles.menuCategoriesItem}>
                                Акции, скидки и распродажи
                            </Link>
                        );
                    })}
                </div>
                <div className={clsx(styles.menuCategory, 'scrollbar-hide')}>
                    <div className={styles.categoryTitle}>
                        Аудиотехника<span>3453 товара</span>
                    </div>
                    <div className={styles.categoryItems}>
                        {items.map((item, index) => (
                            <CategoryItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

interface ICategoryItemsListProps {
    item: Item;
}

const CategoryItem: FC<ICategoryItemsListProps> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.categoryItemList}>
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
