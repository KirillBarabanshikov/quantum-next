import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/arrow_down.svg';
import CatalogIcon from '@/shared/assets/icons/catalog.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useBodyScrollLock, useMediaQuery } from '@/shared/hooks';
import { Portal } from '@/shared/ui';

import { DesktopMenu } from './DesktopMenu';
import styles from './Menu.module.scss';
import { MobileMenu } from './MobileMenu';

export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { setIsLocked } = useBodyScrollLock();
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        setIsLocked(isOpen);
    }, [isOpen, setIsLocked]);

    return (
        <>
            <button onClick={() => setIsOpen((prev) => !prev)} className={styles.menuButton}>
                <CatalogIcon />
                {!isMatch && (
                    <>
                        Каталог
                        <motion.div
                            animate={{ rotate: isOpen ? '180deg' : '0deg' }}
                            transition={{ damping: 0 }}
                            className={styles.arrow}
                        >
                            <ArrowDownIcon />
                        </motion.div>
                    </>
                )}
            </button>
            <Portal>
                <AnimatePresence>
                    {isOpen && (isMatch ? <MobileMenu onClose={() => setIsOpen(false)} /> : <DesktopMenu />)}
                </AnimatePresence>
            </Portal>
        </>
    );
};
