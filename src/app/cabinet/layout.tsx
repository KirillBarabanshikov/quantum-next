'use client';

import React from 'react';
import styles from './layout.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        title: 'Заказы',
        href: '/cabinet/orders',
    },
    {
        title: 'Профиль',
        href: '/cabinet/profile',
    },
    {
        title: 'Аккаунт',
        href: '/cabinet/account',
    },
    {
        title: 'Избранное',
        href: '/cabinet/favorites',
    },
];

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <section className={styles.cabinet}>
            <div className={'container'}>
                <h1 className={clsx(styles.title, 'title')}>Личный кабинет</h1>
                <div className={styles.cabinetArea}>
                    <aside className={styles.sideMenu}>
                        <div className={styles.name}>Иванов Иван</div>
                        <nav className={styles.navList}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={clsx(styles.navItem, pathname === item.href && styles.active)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                    {children}
                </div>
            </div>
        </section>
    );
}
