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
    className?: string;
}

export const SideNavigation: FC<ISideNavigationProps> = ({ items, className }) => {
    const pathname = usePathname();

    return (
        <aside className={clsx(styles.sideNavigation, className)}>
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
