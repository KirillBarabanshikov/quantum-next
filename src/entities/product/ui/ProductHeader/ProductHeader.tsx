'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IProduct } from '@/entities/product';
import { Search } from '@/features/search';
import ArrowIcon from '@/shared/assets/icons/arrow_left.svg';
import ShareIcon from '@/shared/assets/icons/share2.svg';
import StarIcon from '@/shared/assets/icons/start_outline.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/hooks';

import styles from './ProductHeader.module.scss';

interface IProductHeaderProps {
    product: IProduct;
}

export const ProductHeader: FC<IProductHeaderProps> = () => {
    const { isMatch } = useMediaQuery(MAX_WIDTH_MD);
    const router = useRouter();

    return (
        <header className={styles.productHeader}>
            <div className={styles.back} onClick={() => router.back()}>
                <ArrowIcon />
            </div>
            {isMatch && <Search variant={'product'} />}
            <div className={styles.actions}>
                <ShareIcon />
                <StarIcon />
            </div>
        </header>
    );
};
