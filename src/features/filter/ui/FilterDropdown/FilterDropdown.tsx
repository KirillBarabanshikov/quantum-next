import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { IFilter } from '@/entities/filter';
import ArrowIcon from '@/shared/assets/icons/arrow_down2.svg';
import CheckIcon from '@/shared/assets/icons/check.svg';

import styles from './FilterDropdown.module.scss';

interface IFilterDropdownProps {
    filter: IFilter;
    value: string[];
    onChange: (value: string[]) => void;
    className?: string;
}

export const FilterDropdown: FC<IFilterDropdownProps> = ({ filter, value, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const multiple = filter.filterType === 'list-multiple';

    const handleOnChange = (val: string) => {
        if (!multiple) return onChange([val]);

        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    return (
        <div className={clsx(styles.filterDropdownWrap, className)}>
            <div className={styles.filterDropdown}>
                <div onClick={() => setIsOpen(!isOpen)} className={styles.filterDropdownHeader}>
                    <span>{multiple ? filter.title : value[0] ? value[0] : filter.title}</span>
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
                                    {filter.values.map((val, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => handleOnChange(val)}
                                                className={clsx(
                                                    styles.filterItem,
                                                    value.includes(val) && styles.selected,
                                                )}
                                            >
                                                <span>{val}</span>
                                                {multiple && value.includes(val) && <CheckIcon />}
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
