import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FC, useState } from 'react';

import { categoryApi } from '@/entities/category';
import ArrowIcon from '@/shared/assets/icons/arrow_down.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import TelegramIcon from '@/shared/assets/icons/telegram.svg';
import Logo from '@/shared/assets/logo_dark.svg';

import styles from './MobileMenu.module.scss';

interface IMobileMenuProps {
    onClose: () => void;
}

export const MobileMenu: FC<IMobileMenuProps> = ({ onClose }) => {
    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoryApi.fetchCategories });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.menu}>
            <div className={styles.logoWrap}>
                <Logo className={styles.logo} />
                <CloseIcon onClick={onClose} />
            </div>
            <div className={styles.linksList}>
                <CollapsibleLink
                    title={'Каталог'}
                    links={categories?.map((category) => ({ title: category.title, href: `/catalog/${category.id}` }))}
                />
                <Link href={'/'} className={styles.link}>
                    Акции
                </Link>
                <Link href={'/'} className={styles.link}>
                    Рассрочка
                </Link>
                <Link href={'/'} className={styles.link}>
                    О компании
                </Link>
                <Link href={'/'} className={styles.link}>
                    Доставка и оплата
                </Link>
                <Link href={'/'} className={styles.link}>
                    Гарантии
                </Link>
                <Link href={'/'} className={styles.link}>
                    Контакты
                </Link>
            </div>
            <div className={styles.contacts}>
                <div className={styles.service}>Клиентская слуба</div>
                <a href={'tel:+749573011110'}>+7 (495) 730-11-110</a>
                <div className={styles.hint}>звонок по России бесплатный</div>
                <div className={styles.socials}>
                    <a href={'/'} target={'_blank'} className={styles.social}>
                        <TelegramIcon />
                    </a>
                    <a href={'/'} target={'_blank'} className={styles.social}>
                        <TelegramIcon />
                    </a>
                    <a href={'/'} target={'_blank'} className={styles.social}>
                        <TelegramIcon />
                    </a>
                    <a href={'/'} target={'_blank'} className={styles.social}>
                        <TelegramIcon />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

interface ICollapsibleLink {
    title: string;
    links?: {
        title: string;
        href: string;
    }[];
}

const CollapsibleLink: FC<ICollapsibleLink> = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.collapsibleLink}>
            <div className={clsx(styles.collapsibleTitle, styles.link)} onClick={() => setIsOpen((prev) => !prev)}>
                {title}
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
                            {links?.map((link) => (
                                <Link key={link.href} href={link.href}>
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
