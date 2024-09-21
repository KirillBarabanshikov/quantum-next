'use client';

// import { ProductCard } from '@/entities/product';
import { Dropdown } from '@/shared/ui';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
    return (
        <div className={styles.favorites}>
            <Dropdown options={[{ label: 'Сначала новые', value: '1' }]} value={'1'} onChange={() => {}} />
            <div className={styles.favoritesList}>
                {/*{Array.from({ length: 8 }).map((_, index) => {*/}
                {/*    return <ProductCard key={index} />;*/}
                {/*})}*/}
            </div>
        </div>
    );
};
