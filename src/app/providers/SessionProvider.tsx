'use client';

import Cookies from 'js-cookie';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useSessionStore } from '@/entities/session/model';
import { useMeQuery } from '@/entities/user';

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
    const { refetch } = useMeQuery({ enabled: false });
    const { setAuthenticated } = useSessionStore();

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            refetch().then((data) => {
                if (data.data) setAuthenticated(true, data.data);
            });
        }
    }, []);

    return <>{children}</>;
};
