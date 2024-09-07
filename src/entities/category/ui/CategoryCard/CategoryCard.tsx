import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import styles from './CategoryCard.module.scss';
import image from './image.png';

interface ICategoryCardProps {
    variant?: 'main' | 'catalog';
}

export const CategoryCard: FC<ICategoryCardProps> = ({ variant = 'main' }) => {
    return (
        <article className={clsx(styles.categoryCard, styles[variant])}>
            <p className={styles.title}>Приемники</p>
            <div className={styles.imageWrap}>
                <Image src={image} width={300} height={300} alt='Приемники' className={styles.image} />
            </div>
        </article>
    );
};
