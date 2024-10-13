import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FC, useState } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow_down.svg';
import CloseIcon from '@/shared/assets/icons/cross.svg';
import TelegramIcon from '@/shared/assets/icons/telegram.svg';
import Logo from '@/shared/assets/logo_dark.svg';

import styles from './MobileMenu.module.scss';

interface IMobileMenuProps {
    onClose: () => void;
}

export const MobileMenu: FC<IMobileMenuProps> = ({ onClose }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.menu}>
            <div className={styles.logoWrap}>
                <Logo />
                <div onClick={onClose} className={styles.close}>
                    <CloseIcon />
                </div>
            </div>
            <div className={styles.linksList}>
                <CollapsibleLink />
                <Link href={'/'} className={styles.link}>
                    Гарантии
                </Link>
                <Link href={'/'} className={styles.link}>
                    Гарантии
                </Link>
                <Link href={'/'} className={styles.link}>
                    Гарантии
                </Link>
                <Link href={'/'} className={styles.link}>
                    Гарантии
                </Link>
            </div>
            <div className={styles.contacts}>
                <div className={styles.service}>Клиентская слуба</div>
                <a href={'tel:+749573011110'}>+7 (495) 730-11-110</a>
                <div className={styles.hint}>звонок по России бесплатный</div>
                <div className={styles.socials}>
                    <a href={'/'} target={'_blank'}>
                        <TelegramIcon />
                    </a>
                    <a href={'/'} target={'_blank'}>
                        <TelegramIcon />
                    </a>
                    <a href={'/'} target={'_blank'}>
                        <TelegramIcon />
                    </a>
                    <a href={'/'} target={'_blank'}>
                        <TelegramIcon />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const CollapsibleLink = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.collapsibleLink}>
            <div className={clsx(styles.collapsibleTitle, styles.link)} onClick={() => setIsOpen((prev) => !prev)}>
                Каталог
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
                        className={styles.collapsibleBody}
                    >
                        <div className={styles.collapsibleList}>
                            <Link href={'/'}>Умные колонки</Link>
                            <Link href={'/'}>Умные колонки</Link>
                            <Link href={'/'}>Умные колонки</Link>
                            <Link href={'/'}>Умные колонки</Link>
                            <Link href={'/'}>Умные колонки</Link>
                            <Link href={'/'}>Умные колонки</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
