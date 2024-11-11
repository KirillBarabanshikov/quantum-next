'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IProduct, useFavoritesStore } from '@/entities/product';
import { Search } from '@/features/search';
import ArrowIcon from '@/shared/assets/icons/arrow_left.svg';
import ShareIcon from '@/shared/assets/icons/share2.svg';
import StarIcon from '@/shared/assets/icons/start_outline.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery, useStore } from '@/shared/hooks';

import styles from './ProductHeader.module.scss';

interface IProductHeaderProps {
    product: IProduct;
}

export const ProductHeader: FC<IProductHeaderProps> = ({ product }) => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);
    const router = useRouter();
    const favoritesStore = useStore(useFavoritesStore, (state) => state);
    const isFavorite = favoritesStore?.isFavorite(product.id);

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
    };

    const handleAddToFavorite = () => {
        isFavorite ? favoritesStore?.removeFromFavorites(product.id) : favoritesStore?.addToFavorites(product.id);
    };

    return (
        <header className={styles.productHeader}>
            <div className={styles.back} onClick={() => router.back()}>
                <ArrowIcon />
            </div>
            {isMatch && <Search variant={'product'} />}
            <div className={styles.actions}>
                <ShareIcon onClick={copyUrl} />
                <StarIcon
                    onClick={handleAddToFavorite}
                    className={clsx(styles.favorite, isFavorite && styles.isFavorite)}
                />
            </div>
        </header>
    );
};
