'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow_left.svg';

import styles from './ChildHeader.module.scss';

interface IChildHeaderProps {
    title?: string;
    items?: { title: string; path: string }[];
    className?: string;
}

export const ChildHeader: FC<IChildHeaderProps> = ({ title, items, className }) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header className={clsx(styles.childHeader, className)}>
            <div className={clsx(styles.back)} onClick={() => router.back()}>
                <ArrowIcon />
            </div>
            <div className={styles.title}>
                {title ? title : items?.find((item) => item.path === pathname)?.title || ''}
            </div>
        </header>
    );
};
