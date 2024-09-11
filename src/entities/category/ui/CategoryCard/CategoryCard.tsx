import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import styles from './CategoryCard.module.scss';
import image from './image.png';

export const CategoryCard: FC = ({}) => {
    return (
        <article className={clsx(styles.categoryCard)}>
            <p className={styles.title}>Приемники</p>
            <div className={styles.imageWrap}>
                <Image src={image} width={300} height={300} alt='Приемники' className={styles.image} />
            </div>
        </article>
    );
};
