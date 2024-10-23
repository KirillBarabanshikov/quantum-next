'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';

import styles from './layout.module.scss';

interface IUniversalHeaderProps {
    navItems: { title: string; href: string }[];
    className?: string;
}

export const UniversalHeader: FC<IUniversalHeaderProps> = ({ navItems, className }) => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className={clsx(styles.universalHeader, className)}>
            <span>{navItems.find((item) => item.href === pathname)?.title}</span>
            <button onClick={router.back} className={styles.close}>
                <CloseIcon />
            </button>
        </header>
    );
};
