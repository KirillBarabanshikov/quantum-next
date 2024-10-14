'use client';

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { apiClient } from '@/shared/api';

import styles from './layout.module.scss';

interface IUniversalPageProps {
    page:
        | 'Сервисный центр'
        | 'Доставка и оплата'
        | 'Гарантии и возврат'
        | 'Контакты'
        | 'Политика конфиденциальности'
        | 'Публичная оферта'
        | 'Согласие на обработку персональных данных';
}

export const UniversalPage: FC<IUniversalPageProps> = ({ page }) => {
    const { data: universalData } = useQuery({
        queryKey: ['universal'],
        queryFn: async () => {
            const response = await apiClient.get('/additional_informations');
            return response.data;
        },
    });

    const data = universalData?.find((data: any) => data.page === page);

    if (!data) return <></>;

    return (
        <div>
            <h1 className={styles.title}>{data.page}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.description }} className={styles.description} />
        </div>
    );
};
