'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AccountIcon from '@/shared/assets/icons/account_box.svg';
import BagIcon from '@/shared/assets/icons/bag.svg';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';

import styles from './BottomNavbar.module.scss';

const navItems = [
    { path: '/', icon: <HomeIcon /> },
    { path: '/search', icon: <SearchIcon /> },
    { path: '/cart', icon: <BagIcon /> },
    { path: '/cabinet#favorites', icon: <GradeIcon /> },
    { path: '/cabinet', icon: <AccountIcon /> },
] as const;

export const BottomNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.bottomNavbar}>
            {navItems.map((item, index) => {
                if (item.path === '/search') {
                    return (
                        <span
                            key={index}
                            className={clsx(styles.bottomNavbarItem, pathname === item.path && styles.active)}
                        >
                            {item.icon}
                        </span>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={item.path}
                        className={clsx(styles.bottomNavbarItem, pathname === item.path && styles.active)}
                    >
                        {item.icon}
                    </Link>
                );
            })}
        </nav>
    );
};
