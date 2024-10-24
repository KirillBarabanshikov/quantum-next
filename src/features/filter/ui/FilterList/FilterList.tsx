import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { IFilter } from '@/entities/filter';
import ArrowIcon from '@/shared/assets/icons/arrow_down.svg';
import { Checkbox } from '@/shared/ui';

import styles from './FilterList.module.scss';

interface IFilterListProps {
    filter: IFilter;
    className?: string;
}

export const FilterList: FC<IFilterListProps> = ({ filter, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={clsx(styles.filterList, className)}>
            <div className={styles.filterHeader} onClick={() => setIsOpen((prev) => !prev)}>
                <span>{filter.title}</span>
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
                            <div className={clsx(styles.list)}>
                                {filter.values.map((value, index) => {
                                    return <Checkbox key={index} label={value} />;
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
