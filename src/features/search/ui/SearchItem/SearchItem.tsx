import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IProduct } from '@/entities/product';

import styles from './SearchItem.module.scss';

interface ISearchItemProps {
    product: IProduct;
    searchValue: string;
    onNavigate: () => void;
}

export const SearchItem: FC<ISearchItemProps> = ({ product, onNavigate, searchValue }) => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/product/${product.id}`);
        onNavigate();
    };

    const highlightTitle = (title: string | undefined, highlight: string) => {
        if (!highlight.trim() || !title) {
            return title;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = title.split(regex);
        return parts.map((part, index) => (regex.test(part) ? <span key={index}>{part}</span> : part));
    };

    return (
        <div onClick={handleNavigate} className={styles.searchItem}>
            {highlightTitle(product.articles[0]?.title, searchValue)}
        </div>
    );
};
