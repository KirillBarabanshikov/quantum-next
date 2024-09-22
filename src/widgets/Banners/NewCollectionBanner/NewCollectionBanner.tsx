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
                        Высокопроизводительные встраиваемые бесколлекторные электродвигатели постоянного тока для
                        робототехники, станкостроения, авиастроения и космоса
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
