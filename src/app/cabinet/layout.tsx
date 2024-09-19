'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useMeQuery } from '@/entities/user/api';

import styles from './layout.module.scss';

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
    const { data } = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (!data) return;

        if (!data.payerProfiles.length) {
            router.push('/create-profile');
        }
    }, [data]);

    if (!data) {
        return <></>;
    }

    return (
        <section className={styles.cabinet}>
            <div className={'container'}>
                <h1 className={clsx(styles.title, 'title')}>Личный кабинет</h1>
                <div className={styles.cabinetArea}>
                    <aside className={styles.sideMenu}>
                        <div className={styles.name}>
                            {data.payerProfiles[0]?.firstName} {data.payerProfiles[0]?.lastName}
                        </div>
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
