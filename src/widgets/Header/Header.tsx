import Link from 'next/link';

import { Search } from '@/feature/search';
import AccountIcon from '@/shared/assets/icons/account_box.svg';
import BagIcon from '@/shared/assets/icons/bag.svg';
import GradeIcon from '@/shared/assets/icons/grade-fill.svg';
import Logo from '@/shared/assets/logos/logo_small.svg';

import styles from './Header.module.scss';
import { CatalogButton, HeaderLinks } from './ui';

export const Header = () => {
    return (
        <>
            <HeaderLinks />
            <header className={styles.header}>
                <div className={'container'}>
                    <div className={styles.headerContent}>
                        <Link href={'/'} className={styles.logo}>
                            <Logo />
                        </Link>
                        <div className={styles.searchWrap}>
                            <CatalogButton />
                            <Search />
                        </div>
                        <div className={styles.options}>
                            <Link href={'/cart'} className={styles.option}>
                                <BagIcon />
                                <span className={styles.badge}>1</span>
                            </Link>
                            <div className={styles.option}>
                                <GradeIcon />
                            </div>
                            <div className={styles.option}>
                                <AccountIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
