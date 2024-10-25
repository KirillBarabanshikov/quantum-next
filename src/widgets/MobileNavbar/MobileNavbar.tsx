'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCartStore } from '@/entities/cart';
import { useSearchStore } from '@/features/search';
import AccountIcon from '@/shared/assets/icons/account.svg';
import BagIcon from '@/shared/assets/icons/cart.svg';
import CatalogIcon from '@/shared/assets/icons/catalog.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import { useStore } from '@/shared/hooks';

import styles from './MobileNavbar.module.scss';

const navItems = [
    { path: '/', icon: <HomeIcon />, title: 'Главная' },
    { path: '/catalog', icon: <CatalogIcon />, title: 'Каталог' },
    { path: '/cart', icon: <BagIcon />, title: 'Корзина' },
    { path: '/favorites', icon: <GradeIcon />, title: 'Избранное' },
    { path: '/cabinet', icon: <AccountIcon />, title: 'Профиль' },
] as const;

export const MobileNavbar = () => {
    const pathname = usePathname();
    const { isOpen, setIsOpen } = useSearchStore();
    const store = useStore(useCartStore, (state) => state);

    return (
        <nav className={styles.mobileNavbar}>
            {navItems.map((item, index) => {
                if (item.path === '/catalog' && pathname === '/') {
                    return (
                        <div key={index} onClick={() => setIsOpen(!isOpen)} className={clsx(styles.mobileNavbarItem)}>
                            <div className={styles.icon}>
                                <SearchIcon />
                            </div>
                            <div className={styles.title}>Поиск</div>
                        </div>
                    );
                }

                return (
                    <Link
                        key={index}
                        href={item.path}
                        className={clsx(styles.mobileNavbarItem, pathname === item.path && styles.active)}
                    >
                        <div className={styles.icon}>
                            {item.icon}
                            {item.path === '/cart' && !!store?.getCount() && (
                                <span className={styles.badge}>{store?.getCount()}</span>
                            )}
                        </div>
                        <div className={styles.title}>{item.title}</div>
                    </Link>
                );
            })}
        </nav>
    );
};
