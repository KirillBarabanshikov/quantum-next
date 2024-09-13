'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import DropdownIcon from '@/shared/assets/icons/arrow_down.svg';
import { useOutsideClick } from '@/shared/hooks';

import styles from './Dropdown.module.scss';

interface IDropdownOption {
    label: string;
    value: string | number;
}

interface IDropdownProps {
    options: IDropdownOption[];
    value: string | number;
    onChange: (value: string | number) => void;
    variant?: 'solid' | 'outline';
    position?: 'left' | 'right';
    className?: string;
}

export const Dropdown: FC<IDropdownProps> = ({
    options,
    value,
    onChange,
    variant = 'solid',
    position = 'left',
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (value: string | number) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className={clsx(styles.dropdown, styles[variant], styles[position], className)} ref={ref}>
            <div onClick={toggleDropdown} className={styles.dropdownButton}>
                <span>{options.find((option) => option.value === value)?.label}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ damping: 0 }}>
                    <DropdownIcon />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.dropdownList}
                    >
                        {options.map((option) => {
                            return (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={styles.dropdownListItem}
                                >
                                    <span>{option.label}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
