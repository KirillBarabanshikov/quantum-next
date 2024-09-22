'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useSessionStore } from '@/entities/session/model';
import { Search } from '@/feature/search';
import AccountIcon from '@/shared/assets/icons/account_box.svg';
import BagIcon from '@/shared/assets/icons/bag.svg';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import Logo from '@/shared/assets/logos/logo.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';

import { Menu } from '../Menu';
import styles from './Header.module.scss';
import { HeaderLinks } from './ui';

export const Header = () => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);
    const { isAuthenticated, user } = useSessionStore();
    const [uniqueCount, setUniqueCount] = useState(0);

    useEffect(() => {
        if (!user) return;

        const uniqueIds: (number | string)[] = [];

        for (const item of user.cart) {
            if (!uniqueIds.includes(item.product.id)) {
                uniqueIds.push(item.product.id);
            }
        }
        setUniqueCount(uniqueIds.length);
    }, [user]);

    return (
        <>
            <HeaderLinks />
            <header className={styles.header}>
                <div className={'container'}>
                    <div className={styles.headerContent}>
                        <div className={styles.wrap}>
                            <Link href={'/'} className={styles.logo}>
                                <Logo />
                            </Link>
                            <div className={styles.searchWrap}>
                                <Menu />
                                <Search />
                            </div>
                        </div>
                        <div className={styles.options}>
                            <Link href={'/cart'} className={styles.option}>
                                <BagIcon />
                                {!!uniqueCount && <span className={styles.badge}>{uniqueCount}</span>}
                            </Link>
                            <Link
                                href={isAuthenticated ? '/cabinet/favorites' : '/favorites'}
                                scroll={false}
                                className={styles.option}
                            >
                                <GradeIcon />
                            </Link>
                            <Link
                                href={isAuthenticated ? '/cabinet' : '?authentication=signin'}
                                scroll={false}
                                className={styles.option}
                            >
                                <AccountIcon />
                            </Link>
                        </div>
                        {isMatch && <Menu />}
                    </div>
                </div>
            </header>
        </>
    );
};
