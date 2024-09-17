'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

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
                                <span className={styles.badge}>1</span>
                            </Link>
                            <Link href={'/cabinet'} className={styles.option}>
                                <GradeIcon />
                            </Link>
                            <Link href={'/cabinet'} className={styles.option}>
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
