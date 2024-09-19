'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow_down2.svg';
import { Button, Checkbox, Radio } from '@/shared/ui';

import styles from './Filters.module.scss';
import { Colors } from '@/feature/catalog/ui/Filters/ui/Colors';
import { Switch } from '@/shared/ui/Switch';
import { PriceRange } from '@/feature/catalog/ui/Filters/ui/PriceRange/PriceRange';

interface IFiltersProps {
    className?: string;
}

export const Filters: FC<IFiltersProps> = ({ className }) => {

    const filtersExample = [
        {
            id: 1, title: 'Категории', type: 'checkbox', values: [
                { id: 1, title: 'Планшеты на Android', checked: true },
                { id: 2, title: 'Планшеты Apple', checked: false },
                { id: 3, title: 'Планшеты на Windows', checked: false },
            ],
        },
        {
            id: 2, title: 'Тип гаджета', type: 'checkbox', values: [
                { id: 1, title: 'Планшеты на Android', checked: false },
                { id: 2, title: 'Планшеты Apple', checked: false },
                { id: 3, title: 'Планшеты на Windows', checked: false },
            ],
        },
        {
            id: 3, title: 'Бренд', type: 'checkbox', values: [
                { id: 1, title: 'Android', checked: false },
                { id: 2, title: 'Tecno', checked: false },
                { id: 3, title: 'realme', checked: false },
                { id: 4, title: 'Xiaomi', checked: false },
                { id: 5, title: 'Samsung', checked: false },
                { id: 6, title: 'Windows', checked: false },
            ],
        },
        {
            id: 4, title: 'Сроки доставки', type: 'radio', values: [
                { id: 1, title: 'Неважно', checked: false },
                { id: 2, title: 'От 1 часа', checked: false },
                { id: 3, title: 'Сегодня', checked: false },
                { id: 4, title: 'Завтра', checked: false },
            ],
        },
        {
            id: 5, title: 'Цвета', type: 'color', values: [
                { id: 1, value: 'red' },
                { id: 2, value: 'blue' },
                { id: 3, value: 'green' },
            ],
        },
        {
            id: 6, title: 'Распродажа', type: 'switch', value: false,
        },
        {
            id: 6, title: 'Цена', type: 'range', min: 0, max: 1000
        },
        {
            id: 7, title: 'Больше настроек', type: 'tabs', values: [
                { id: 1, title: 'Большой', checked: false },
                { id: 2, title: 'Маленький', checked: false },
                { id: 3, title: 'Для мальчиков', checked: false },
                { id: 4, title: 'Сегодня', checked: false },
            ],
        },
    ];

    const [filters, setFilters] = useState(filtersExample);

    return (
        <div className={clsx(styles.filters, className)}>
            {filters.map((item, index) => {
                return (
                    <div key={index} className={styles.filtersList}>
                        <FilterItem key={index} item={item} />
                    </div>
                );
            })}
            <div className={styles.buttons}>
                <Button>Применить</Button>
                <Button variant={'outline'}>Сбросить фильтры</Button>
            </div>
        </div>
    );
};

const FilterItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.filterItem}>
            <div className={styles.filterHeader} onClick={() => setIsOpen((prev) => !prev)}>
                <span>{item.title}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ damping: 0 }}>
                    <ArrowIcon />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className={styles.filterBody}
                    >
                        <div className={styles.filterContent}>
                            {item ? (
                                <div className={clsx(styles.list, item.type === 'color' && styles.colors, item.type === 'tabs' && styles.tabs)}>
                                    {
                                        item.type === 'switch' ? (
                                            <Switch isOn={item.value} />
                                        ) : item.type === 'range' ? (
                                            <PriceRange start={item.min} finish={item.max} />
                                        ) : (
                                            item.values.map((value, index) => (
                                                <div className={styles.listItem} key={index}>
                                                    {
                                                        item.type === 'checkbox' && (
                                                            <Checkbox defaultChecked={value.checked} label={value.title} />
                                                        )
                                                    }

                                                    {
                                                        item.type === 'tabs' && (
                                                            <Checkbox defaultChecked={value.checked} label={value.title} variant="tabs" />
                                                        )
                                                    }

                                                    {
                                                        item.type === 'radio' && (
                                                            <Radio label={value.title} name="delivery" variant="filters" />
                                                        )
                                                    }
                                                    {
                                                        item.type === 'color' && (
                                                            <Colors value={value.value} name="colors" />
                                                        )
                                                    }

                                                </div>
                                            ))
                                        )
                                    }
                                </div>
                            ) : (
                                <div className={styles.inputsWrap}>
                                    <div className={styles.input}>
                                        <span>от</span>
                                        <input />
                                    </div>
                                    <div className={styles.input}>
                                        <span>до</span>
                                        <input />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
