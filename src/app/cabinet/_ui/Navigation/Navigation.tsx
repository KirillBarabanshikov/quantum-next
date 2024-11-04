'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { useAuth } from '@/app/_providers/AuthProvider';
import ArrowIcon from '@/shared/assets/icons/arrow_right.svg';

import styles from './Navigation.module.scss';

interface INavigationProps {
    className?: string;
}

const items = [
    { title: 'Заказы', path: '/cabinet/orders' },
    { title: 'Профиль', path: '/cabinet/profile' },
    { title: 'Аккаунт', path: '/cabinet/account' },
    { title: 'Избранное', path: '/cabinet/favorites' },
];

export const Navigation: FC<INavigationProps> = ({ className }) => {
    const pathname = usePathname();
    const { user } = useAuth();

    return (
        <div className={clsx(styles.navigation, className)}>
            <div className={styles.name}>
                {user &&
                    !!user.payerProfiles.length &&
                    `${user.payerProfiles[0].firstName} ${user.payerProfiles[0].lastName}`}
            </div>
            <div className={styles.itemsList}>
                {items.map((item) => {
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(styles.item, pathname === item.path && styles.active)}
                        >
                            <span>{item.title}</span>
                            <ArrowIcon />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
