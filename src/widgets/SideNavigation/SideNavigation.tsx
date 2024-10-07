'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import styles from './SideNavigation.module.scss';

interface ISideNavigationItem {
    title: string;
    href: string;
}

interface ISideNavigationProps {
    items: ISideNavigationItem[];
}

export const SideNavigation: FC<ISideNavigationProps> = ({ items }) => {
    const pathname = usePathname();

    return (
        <aside className={styles.sideNavigation}>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(styles.sideNavigationItem, item.href === pathname && styles.active)}
                >
                    {item.title}
                </Link>
            ))}
        </aside>
    );
};
