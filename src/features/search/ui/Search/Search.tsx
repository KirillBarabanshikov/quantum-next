import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { productApi } from '@/entities/product';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useOutsideClick } from '@/shared/hooks';
import { Portal } from '@/shared/ui';

import { SearchItem } from '../SearchItem/SearchItem';
import styles from './Search.module.scss';

export const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
    const { data: products } = useQuery({
        queryKey: ['search', searchValue],
        queryFn: () => productApi.fetchProducts({ query: searchValue, limit: 5 }),
        enabled: !!searchValue,
    });

    const open = isOpen && !!products?.length;

    return (
        <>
            <div className={clsx(styles.searchWrap, open && styles.isOpen)} ref={ref}>
                <div className={styles.search}>
                    <input
                        type={'text'}
                        placeholder={'Поиск'}
                        className={styles.input}
                        onFocus={() => setIsOpen(true)}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <SearchIcon className={styles.icon} />
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div className={styles.searchResult}>
                            <div className={styles.searchList}>
                                {products?.map((product) => (
                                    <SearchItem
                                        key={product.id}
                                        product={product}
                                        searchValue={searchValue}
                                        onNavigate={() => setIsOpen(false)}
                                    />
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
