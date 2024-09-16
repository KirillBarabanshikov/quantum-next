'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow_down2.svg';
import { Button } from '@/shared/ui';

import styles from './Filters.module.scss';

interface IFiltersProps {
    className?: string;
}

export const Filters: FC<IFiltersProps> = ({ className }) => {
    return (
        <div className={clsx(styles.filters, className)}>
            <div className={styles.filtersList}>
                {Array.from({ length: 5 }).map((_, index) => {
                    return <FilterItem key={index} list={index < 4} />;
                })}
            </div>
            <div className={styles.buttons}>
                <Button>Применить</Button>
                <Button variant={'outline'}>Сбросить фильтры</Button>
            </div>
        </div>
    );
};

const FilterItem = ({ list }: { list: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.filterItem}>
            <div className={styles.filterHeader} onClick={() => setIsOpen((prev) => !prev)}>
                <span>Бренд</span>
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
                            {list ? (
                                <div className={styles.list}>
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <div className={styles.listItem} key={index}>
                                            <span>Бренд 1</span>
                                        </div>
                                    ))}
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
