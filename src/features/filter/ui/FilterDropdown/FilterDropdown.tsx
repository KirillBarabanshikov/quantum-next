import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { IFilter } from '@/entities/filter';
import ArrowIcon from '@/shared/assets/icons/arrow_down2.svg';

import styles from './FilterDropdown.module.scss';

interface IFilterDropdownProps {
    filter: IFilter;
    className?: string;
}

export const FilterDropdown: FC<IFilterDropdownProps> = ({ filter, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={clsx(styles.filterDropdownWrap, className)}>
            <div className={styles.filterDropdown}>
                <div onClick={() => setIsOpen(!isOpen)} className={styles.filterDropdownHeader}>
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
                                        return (
                                            <div key={index} className={styles.filterItem}>
                                                <span>{value}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
