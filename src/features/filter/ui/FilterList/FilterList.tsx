import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import { IFilter } from '@/entities/filter';
import ArrowIcon from '@/shared/assets/icons/arrow_down2.svg';
import { Checkbox, Radio } from '@/shared/ui';

import styles from './FilterList.module.scss';

interface IFilterListProps {
    filter: IFilter;
    value: string[];
    onChange: (value: string[]) => void;
    className?: string;
}

export const FilterList: FC<IFilterListProps> = ({ filter, value, onChange, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnChange = (val: string) => {
        if (filter.filterType === 'checkboxes') {
            if (value.includes(val)) {
                onChange(value.filter((v) => v !== val));
            } else {
                onChange([...value, val]);
            }
        } else {
            if (value.includes(val)) {
                onChange([]);
            } else {
                onChange([val]);
            }
        }
    };

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
                                {filter.values.map((val) => {
                                    if (filter.filterType === 'radio') {
                                        return (
                                            <Radio
                                                key={val}
                                                label={val}
                                                value={val}
                                                checked={value.includes(val)}
                                                onChange={() => {}}
                                                onClick={() => handleOnChange(val)}
                                                variant={'filters'}
                                            />
                                        );
                                    }

                                    return (
                                        <Checkbox
                                            key={val}
                                            label={val}
                                            value={val}
                                            checked={value.includes(val)}
                                            onChange={() => {}}
                                            onClick={() => handleOnChange(val)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
