import { apiClient } from '@/shared/api';

import { NewPasswordPage } from './NewPasswordPage';

interface IProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: IProps) {
    await apiClient.get(`/users/check?token=${searchParams.token}`);

    return <NewPasswordPage token={searchParams.token as string} />;
}
