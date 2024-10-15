'use client';

import Link from 'next/link';
import { FC } from 'react';

import { useAuth } from '@/app/_providers/AuthProvider';
import { useCartStore } from '@/entities/cart';
import { useFavoritesStore } from '@/entities/product';
import { Search } from '@/features/search';
import AccountIcon from '@/shared/assets/icons/account.svg';
import BagIcon from '@/shared/assets/icons/cart.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import Logo from '@/shared/assets/logo_light.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery, useStore } from '@/shared/hooks';

import styles from './Header.module.scss';
import { Links, Menu } from './ui';

interface IHeaderClientProps {
    className?: string;
}

export const HeaderClient: FC<IHeaderClientProps> = ({ className }) => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);
    const { isAuthenticated } = useAuth();

    return (
        <div className={className}>
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
                            <CartOption />
                            <FavoritesOption />
                            <Link
                                href={isAuthenticated ? '/cabinet' : '?auth=signin'}
                                scroll={false}
                                prefetch={false}
                                className={styles.option}
                            >
                                <AccountIcon />
                            </Link>
                        </div>
                        {isMatch && <Menu />}
                    </div>
                </div>
            </header>
        </div>
    );
};

const CartOption = () => {
    const store = useStore(useCartStore, (state) => state);

    return (
        <Link href={'/cart'} className={styles.option}>
            <BagIcon />
            {!!store?.products.length && <span className={styles.badge}>{store?.products.length}</span>}
        </Link>
    );
};

const FavoritesOption = () => {
    const store = useStore(useFavoritesStore, (state) => state);

    return (
        <Link href={'/favorites'} scroll={false} className={styles.option}>
            <GradeIcon />
            {!!store?.productsIds.length && <span className={styles.badge}>{store?.productsIds.length}</span>}
        </Link>
    );
};
