import { notFound } from 'next/navigation';

import { apiClient } from '@/shared/api';

import { NewPasswordPage } from './NewPasswordPage';

interface IProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: IProps) {
    try {
        await apiClient.get(`/users/check?token=${searchParams.token}`);
    } catch (error) {
        return notFound();
    }

    return <NewPasswordPage token={searchParams.token as string} />;
}
