'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AccountIcon from '@/shared/assets/icons/account.svg';
import BagIcon from '@/shared/assets/icons/cart.svg';
import CatalogIcon from '@/shared/assets/icons/catalog.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';

import styles from './MobileNavbar.module.scss';

const navItems = [
    { path: '/', icon: <HomeIcon /> },
    { path: '/catalog', icon: <CatalogIcon /> },
    { path: '/cart', icon: <BagIcon /> },
    { path: '/favorites', icon: <GradeIcon /> },
    { path: '/cabinet', icon: <AccountIcon /> },
] as const;

export const MobileNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.mobileNavbar}>
            {navItems.map((item, index) => {
                return (
                    <Link
                        key={index}
                        href={item.path}
                        className={clsx(styles.bottomNavbarItem, pathname === item.path && styles.active)}
                    >
                        {item.icon}
                        {item.path === '/cart' && <span className={styles.badge}>0</span>}
                    </Link>
                );
            })}
        </nav>
    );
};
