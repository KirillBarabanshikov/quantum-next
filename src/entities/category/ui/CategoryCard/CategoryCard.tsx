import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ICategory } from '@/entities/category';

import styles from './CategoryCard.module.scss';

interface ICategoryCardProps {
    category: ICategory;
}

export const CategoryCard: FC<ICategoryCardProps> = ({ category }) => {
    return (
        <Link href={`/catalog/${category.id}`}>
            <article className={clsx(styles.categoryCard)}>
                <p className={styles.title}>{category.title}</p>
                <div className={styles.imageWrap}>
                    <Image src={category.image} fill alt={category.title} sizes='100%' className={styles.image} />
                </div>
            </article>
        </Link>
    );
};
