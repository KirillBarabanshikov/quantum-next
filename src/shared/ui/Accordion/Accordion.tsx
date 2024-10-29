'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

import CheckIcon from '@/shared/assets/icons/check_circle.svg';

import styles from './Accordion.module.scss';

interface IAccordionProps extends PropsWithChildren {
    title?: string;
    isOpen?: boolean;
    onClick?: () => void;
    className?: string;
}

export const Accordion: FC<IAccordionProps> = ({ title, isOpen, onClick, className, children }) => {
    return (
        <div onClick={onClick} className={clsx(styles.accordionWrap, isOpen && styles.isOpen, className)}>
            <div className={styles.head}>
                <div className={styles.check}>
                    <CheckIcon />
                </div>
                <div className={clsx(styles.accordion, styles.desktop)}>
                    <div className={styles.title}>{title}</div>
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                className={styles.body}
                            >
                                <div className={styles.content}>{children}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className={styles.wrap}
                        >
                            <div className={clsx(styles.accordion, styles.mobile)}>
                                <div className={styles.title}>{title}</div>
                                <div className={clsx(styles.body)}>
                                    <div className={styles.content}>{children}</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            }
        </div>
    );
};
