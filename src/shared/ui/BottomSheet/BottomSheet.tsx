'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useBodyScrollLock } from '@/shared/hooks';
import { Portal } from '@/shared/ui';

import styles from './BottomSheet.module.scss';

interface IBottomSheetProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    fullHeight?: boolean;
}

export const BottomSheet: FC<IBottomSheetProps> = ({ isOpen, onClose, title, fullHeight = false, children }) => {
    const { setIsLocked } = useBodyScrollLock();

    useEffect(() => {
        setIsLocked(isOpen);
    }, [isOpen, setIsLocked]);

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className={clsx(styles.bottomSheet, fullHeight && styles.fullHeight)}>
                        <motion.div
                            className={styles.backdrop}
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                        />
                        <motion.div
                            className={styles.sheetContent}
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ damping: 0 }}
                        >
                            <div className={styles.sheetHeader}>
                                <span className={styles.indicator} />
                                <div className={styles.titleWrap}>
                                    <div className={styles.title}>{title}</div>
                                    <div onClick={onClose} className={styles.cancel}>
                                        Отмена
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.sheetBody, 'scrollbar-hide')}>{children}</div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
};
