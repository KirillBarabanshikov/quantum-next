import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import TelegramIcon from '@/shared/assets/icons/telegram_dark.svg';
import Logo from '@/shared/assets/logos/logo_dark.svg';

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
