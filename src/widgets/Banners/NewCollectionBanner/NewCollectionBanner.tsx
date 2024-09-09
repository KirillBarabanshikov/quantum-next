import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/shared/ui';

import styles from './NewCollectionBanner.module.scss';

interface INewCollectionBannerProps {
    className?: string;
}

export const NewCollectionBanner: FC<INewCollectionBannerProps> = ({ className }) => {
    return (
        <section className={clsx(styles.newCollectionBanner, className)}>
            <div className={'container'}>
                <div className={styles.newCollectionBannerContainer}>
                    <h2 className={styles.title}>Новая коллекция</h2>
                    <p className={styles.description}>
                        Zenmuse H20N, оснащенная сенсорами с технологией Starlight в камерах с зумом и широким углом,
                        позволяет обнаруживать даже едва уловимые источники света до 0,0001 лк.
                    </p>
                    <Link href={'/catalog'}>
                        <Button variant={'outline'} theme={'blue'} className={styles.button}>
                            Каталог
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
