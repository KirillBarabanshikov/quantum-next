import { useRouter } from 'next/navigation';
import { FC } from 'react';

import styles from './SearchItem.module.scss';

interface ISearchItemProps {
    onNavigate: () => void;
}

export const SearchItem: FC<ISearchItemProps> = ({ onNavigate }) => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push('/product');
        onNavigate();
    };

    return (
        <div onClick={handleNavigate} className={styles.searchItem}>
            Набор BETAFPV <span>Cetus</span> Pro FPV Kit (RTF)
        </div>
    );
};
