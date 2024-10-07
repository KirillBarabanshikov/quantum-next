'use client';

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { apiClient } from '@/shared/api';

interface IUniversalPageProps {
    page: 'Контакты' | 'Доставка' | 'Оплата' | 'Сервисный центр' | 'Гарантии и возврат';
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
            <h1>{data.page}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
    );
};
