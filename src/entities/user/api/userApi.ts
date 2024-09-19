import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { instance } from '@/shared/api';

import { IUser } from '../model';

type UseMeQueryOptions = Omit<UseQueryOptions<IUser, Error>, 'queryKey' | 'queryFn'>;

export const useMeQuery = (options?: UseMeQueryOptions) => {
    return useQuery<IUser, Error>({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await instance.get<IUser>('/me');
            return response.data;
        },
        ...options,
    });
};
