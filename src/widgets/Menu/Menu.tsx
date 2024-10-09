import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/arrow_down.svg';
import UnionIcon from '@/shared/assets/icons/union.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useBodyScrollLock, useMediaQuery } from '@/shared/hooks';
import { Button, Portal } from '@/shared/ui';

import styles from './Menu.module.scss';
import { DesktopMenu, MobileMenu } from './ui';

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
            <Button
                theme={'white'}
                onClick={() => setIsOpen((prev) => !prev)}
                className={clsx(styles.menuButton, styles.button)}
            >
                <UnionIcon />
                {!isMatch && (
                    <>
                        Каталог
                        <motion.div animate={{ rotate: isOpen ? '180deg' : '0deg' }} transition={{ damping: 0 }}>
                            <ArrowDownIcon />
                        </motion.div>
                    </>
                )}
            </Button>
            <Portal>
                <AnimatePresence>
                    {isOpen && (isMatch ? <MobileMenu onClose={() => setIsOpen(false)} /> : <DesktopMenu />)}
                </AnimatePresence>
            </Portal>
        </>
    );
};
