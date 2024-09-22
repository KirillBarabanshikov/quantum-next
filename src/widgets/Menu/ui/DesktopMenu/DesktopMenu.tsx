import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ICategory, useCategoriesQuery } from '@/entities/category';

// import ArrowDown from '@/shared/assets/icons/arrow_down2.svg';
import styles from './DesktopMenu.module.scss';

// interface Item {
//     name: string;
//     path: string;
//     children: {
//         name: string;
//         path: string;
//     }[];
// }

// const items: Item[] = [
//     {
//         name: 'Портативное аудио',
//         path: '/',
//         children: [
//             { name: 'Портативные колонки', path: '/' },
//             { name: 'Умные колонки', path: '/' },
//             { name: 'Компьютерные колонки', path: '/' },
//             { name: 'МР3 плееры', path: '/' },
//             { name: 'Диктофоны', path: '/' },
//             { name: 'Магнитолы', path: '/' },
//         ],
//     },
//     {
//         name: 'Домашнее аудио и DJ',
//         path: '/',
//         children: [
//             { name: 'Саундбары', path: '/' },
//             { name: 'Музыкальные центры', path: '/' },
//             { name: 'Товары для блогеров', path: '/' },
//             { name: 'DJ-контроллеры', path: '/' },
//         ],
//     },
//     {
//         name: 'Все наушники',
//         path: '/',
//         children: [
//             { name: 'Наушники True Wireless', path: '/' },
//             { name: 'Спортивные наушники', path: '/' },
//             { name: 'Наушники-вкладыши и внутриканальные', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//         ],
//     },
//     {
//         name: 'Автозвук',
//         path: '/',
//         children: [
//             { name: 'Наушники True Wireless', path: '/' },
//             { name: 'Спортивные наушники', path: '/' },
//             { name: 'Наушники-вкладыши и внутриканальные', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//         ],
//     },
//     {
//         name: 'Домашнее аудио и DJ',
//         path: '/',
//         children: [
//             { name: 'Наушники True Wireless', path: '/' },
//             { name: 'Спортивные наушники', path: '/' },
//             { name: 'Наушники-вкладыши и внутриканальные', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//             { name: 'Наушники с костной проводимостью звука', path: '/' },
//         ],
//     },
// ];

export const DesktopMenu = () => {
    const [selectedCategory, setSelectedCategory] = useState<ICategory>();
    const { data: categories } = useCategoriesQuery();
    const params = useParams<{ slug: string }>();

    useEffect(() => {
        if (!categories) return;
        setSelectedCategory(categories[0]);
    }, [categories]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.menu}>
            <div className={clsx(styles.menuContainer, 'container')}>
                <div className={clsx(styles.menuCategoriesList, 'scrollbar-hide')}>
                    {categories &&
                        categories.map((category) => {
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
                        <span>{selectedCategory?.total} товара</span>
                    </div>
                    {/*<div className={styles.categoryItems}>*/}
                    {/*    {items.map((item, index) => (*/}
                    {/*        <CategoryItem key={index} item={item} />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
            </div>
        </motion.div>
    );
};

// interface ICategoryItemsListProps {
//     item: Item;
// }

// const CategoryItem: FC<ICategoryItemsListProps> = ({ item }) => {
//     const [isOpen, setIsOpen] = useState(false);
//
//     return (
//         <div className={styles.categoryItemList}>
//             <Link href={item.path} className={clsx(styles.categoryItem, styles.categoryItemTitle)}>
//                 {item.name}
//             </Link>
//             {item.children.slice(0, isOpen ? undefined : 6).map((child, index) => {
//                 return (
//                     <Link key={index} href={child.path} className={styles.categoryItem}>
//                         {child.name}
//                     </Link>
//                 );
//             })}
//             {item.children.length > 6 && (
//                 <span onClick={() => setIsOpen((prev) => !prev)} className={styles.more}>
//                     {isOpen ? 'Свернуть' : 'Еще'}
//                     <ArrowDown className={clsx(styles.arrow, isOpen && styles.up)} />
//                 </span>
//             )}
//         </div>
//     );
// };
