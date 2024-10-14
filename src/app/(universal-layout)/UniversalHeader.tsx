'use client';

import { FC } from 'react';
import styles from './layout.module.scss';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

interface IUniversalHeaderProps {
    navItems: { title: string; href: string }[];
    className?: string;
}

export const UniversalHeader: FC<IUniversalHeaderProps> = ({ navItems, className }) => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className={clsx(styles.universalHeader, className)}>
            {navItems.find((item) => item.href === pathname)?.title}
            <button onClick={router.back} className={styles.close}>
                <CloseIcon />
            </button>
        </header>
    );
};
