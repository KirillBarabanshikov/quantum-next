'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/shared/ui';

import styles from './NewCollectionBanner.module.scss';

interface INewCollectionBannerProps {
    className?: string;
}

export const NewCollectionBanner: FC<INewCollectionBannerProps> = ({ className }) => {
    const router = useRouter();

    return (
        <section className={clsx(styles.newCollectionBanner, className)}>
            <div className={'container'}>
                <div className={styles.newCollectionBannerContainer}>
                    <h2 className={styles.title}>Новая коллекция</h2>
                    <p className={styles.description}>
                        Zenmuse H20N, оснащенная сенсорами с технологией Starlight в камерах с зумом и широким углом,
                        позволяет обнаруживать даже едва уловимые источники света до 0,0001 лк.
                    </p>
                    <Button
                        variant={'outline'}
                        theme={'blue'}
                        onClick={() => router.push('/catalog')}
                        className={styles.button}
                    >
                        Каталог
                    </Button>
                </div>
            </div>
        </section>
    );
};
