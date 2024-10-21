import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { categoryApi, ICategoryWithChildren } from '@/entities/category';
import ArrowDown from '@/shared/assets/icons/arrow_down.svg';

import styles from './DesktopMenu.module.scss';

export const DesktopMenu = () => {
    const [selectedCategory, setSelectedCategory] = useState<ICategoryWithChildren>();
    const params = useParams<{ slug: string }>();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryApi.fetchCategoriesWithChildren,
    });

    useEffect(() => {
        if (!categories) return;
        setSelectedCategory(categories[0]);
    }, [categories]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.menu}>
            <div className={clsx(styles.menuContainer, 'container')}>
                <div className={clsx(styles.menuCategoriesList, 'scrollbar-hide')}>
                    {categories?.map((category) => {
                        return (
                            <Link
                                key={category.id}
                                href={`/catalog/${category.id}`}
                                className={clsx(
                                    styles.menuCategoriesItem,
                                    +params.slug === category.id && styles.active,
                                )}
                                onMouseEnter={() => setSelectedCategory(category)}
                            >
                                {category.title}
                            </Link>
                        );
                    })}
                </div>
                <div className={clsx(styles.menuCategory, 'scrollbar-hide')}>
                    <div className={styles.categoryTitle}>
                        {selectedCategory?.title}
                        {selectedCategory?.total && <span>{selectedCategory.total} товара</span>}
                    </div>
                    <div className={styles.categoryItems}>
                        {selectedCategory?.categories.map((item) => <CategoryItem key={item.id} item={item} />)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

interface ICategoryItemsListProps {
    item: ICategoryWithChildren;
}

const CategoryItem: FC<ICategoryItemsListProps> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.categoryItemList}>
            <Link href={`/catalog/${item.id}`} className={clsx(styles.categoryItem, styles.categoryItemTitle)}>
                {item.title}
            </Link>
            {item.categories.slice(0, isOpen ? undefined : 6).map((child) => {
                return (
                    <Link key={child.id} href={`/catalog/${child.id}`} className={styles.categoryItem}>
                        {child.title}
                    </Link>
                );
            })}
            {item.categories.length > 6 && (
                <span onClick={() => setIsOpen((prev) => !prev)} className={styles.more}>
                    {isOpen ? 'Свернуть' : 'Еще'}
                    <ArrowDown className={clsx(styles.arrow, isOpen && styles.up)} />
                </span>
            )}
        </div>
    );
};
