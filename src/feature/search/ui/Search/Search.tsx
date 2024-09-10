import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import SearchIcon from '@/shared/assets/icons/search.svg';
import { useOutsideClick } from '@/shared/hooks';
import { Portal } from '@/shared/ui';

import { SearchItem } from '../SearchItem/SearchItem';
import styles from './Search.module.scss';

export const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

    return (
        <>
            <div className={clsx(styles.searchWrap, isOpen && styles.isOpen)} ref={ref}>
                <div className={styles.search}>
                    <input
                        type={'text'}
                        placeholder={'Поиск'}
                        className={styles.input}
                        onFocus={() => setIsOpen(true)}
                    />
                    <SearchIcon className={styles.icon} />
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div className={styles.searchResult}>
                            <div className={styles.searchList}>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <SearchItem key={index} onNavigate={() => setIsOpen(false)} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Portal>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.overlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                </AnimatePresence>
            </Portal>
        </>
    );
};
