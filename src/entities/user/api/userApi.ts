import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { useSessionStore } from '@/entities/session';
import { apiClient } from '@/shared/api';

import { IUser } from '../model';

type UseMeQueryOptions = Omit<UseQueryOptions<IUser, Error>, 'queryKey' | 'queryFn'>;

export const useMeQuery = (options?: UseMeQueryOptions) => {
    return useQuery<IUser, Error>({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await apiClient.get<IUser>('/me');
            const { setUser } = useSessionStore.getState();
            setUser(response.data);
            return response.data;
        },
        ...options,
    });
};
