'use client';

import Link from 'next/link';

import { Search } from '@/features/search';
import AccountIcon from '@/shared/assets/icons/account.svg';
import BagIcon from '@/shared/assets/icons/cart.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import Logo from '@/shared/assets/logo_light.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';

import styles from './Header.module.scss';
import { Links, Menu } from './ui';

export const HeaderClient = () => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);

    return (
        <>
            <Links />
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
                                <span className={styles.badge}>0</span>
                            </Link>
                            <Link href={'/favorites'} scroll={false} className={styles.option}>
                                <GradeIcon />
                            </Link>
                            <Link href={'/'} scroll={false} className={styles.option}>
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
