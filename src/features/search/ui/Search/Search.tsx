import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, useRef, useState } from 'react';

import { productApi } from '@/entities/product';
import CrossIcon from '@/shared/assets/icons/cross.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { useDebounce, useOutsideClick } from '@/shared/hooks';
import { Portal } from '@/shared/ui';

import { SearchItem } from '../SearchItem/SearchItem';
import styles from './Search.module.scss';

export const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const searchWrapRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
    const searchRef = useRef<HTMLInputElement>(null);

    const { data: products, refetch } = useQuery({
        queryKey: ['search', searchValue],
        queryFn: () => productApi.fetchProducts({ query: searchValue, limit: 5 }),
        enabled: false,
        placeholderData: keepPreviousData,
        staleTime: 0,
    });

    const { debouncedFunction: refetchDebouncedProducts } = useDebounce(refetch, 500);

    const onChangeSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!isOpen) setIsOpen(true);
        setSearchValue(e.target.value);
        await refetchDebouncedProducts();
    };

    const clear = () => {
        if (!searchRef.current) return;
        setSearchValue('');
        searchRef.current.focus();
    };

    const open = isOpen && !!searchValue && !!products?.products.length;

    return (
        <>
            <div className={clsx(styles.searchWrap, open && styles.isOpen)} ref={searchWrapRef}>
                <div className={styles.search}>
                    <input
                        type={'text'}
                        placeholder={'Поиск'}
                        onFocus={() => setIsOpen(true)}
                        onChange={onChangeSearch}
                        value={searchValue}
                        ref={searchRef}
                        className={styles.input}
                    />
                    {searchValue && <CrossIcon className={styles.clearIcon} onClick={clear} />}
                    <SearchIcon className={styles.searchIcon} />
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div className={styles.searchResult}>
                            <div className={styles.searchList}>
                                {products?.products.map((product) => (
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
