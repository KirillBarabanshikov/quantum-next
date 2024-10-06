import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { useSessionStore } from '@/entities/session/model';
import { IUser } from '@/entities/user';
import { apiClient } from '@/shared/api';

import { IRequestSignInBody, IRequestSignUpBody, IResponseSignIn, IResponseSignUp } from './types';

const useSignUpMutation = () => {
    return useMutation<IResponseSignUp, Error, IRequestSignUpBody>({
        mutationFn: async (body) => {
            const response = await apiClient.post<IResponseSignUp>('/register', body);
            return response.data;
        },
    });
};

const useSignInMutation = () => {
    return useMutation<void, Error, IRequestSignInBody>({
        mutationFn: async (body) => {
            const response = await apiClient.post<IResponseSignIn>('/authentication_token', body);
            Cookies.set('token', response.data.token);
            const user = await apiClient.get<IUser>('/me');
            const { setAuthenticated } = useSessionStore.getState();
            setAuthenticated(true, user.data);
        },
    });
};

export { useSignInMutation, useSignUpMutation };
