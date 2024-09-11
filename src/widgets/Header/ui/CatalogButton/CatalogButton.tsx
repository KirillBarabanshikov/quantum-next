'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CategoryCard } from '@/entities/category';
import ArrowDownIcon from '@/shared/assets/icons/arrow_down.svg';
import UnionIcon from '@/shared/assets/icons/union.svg';
import { useMediaQuery, useOutsideClick } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import styles from './CatalogButton.module.scss';
import { MAX_WIDTH_MD } from '@/shared/consts';

export const CatalogButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
    const pathname = usePathname();
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <div className={styles.catalogButtonWrap} ref={ref}>
            <Button theme={'white'} className={styles.catalogButton} onClick={() => setIsOpen((prev) => !prev)}>
                <UnionIcon />
                {!isMatch && (
                    <>
                        Каталог
                        <motion.div animate={{ rotate: isOpen ? '180deg' : '0deg' }}>
                            <ArrowDownIcon />
                        </motion.div>
                    </>
                )}
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.catalogMenu}
                    >
                        <Link href={'/catalog'} className={styles.link}>
                            ВСЕ ТОВАРЫ
                        </Link>
                        <div className={styles.catalogList}>
                            {Array.from({ length: 8 }).map((_, index) => {
                                return <CategoryCard key={index} variant={'catalog'} />;
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
