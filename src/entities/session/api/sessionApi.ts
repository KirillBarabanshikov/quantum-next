import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { instance } from '@/shared/api';

import { IRequestSignInBody, IRequestSignUpBody, IResponseSignIn, IResponseSignUp } from './types';

const useSignUpMutation = () => {
    return useMutation<IResponseSignUp, Error, IRequestSignUpBody>({
        mutationFn: async (body) => {
            const response = await instance.post<IResponseSignUp>('/register', body);
            return response.data;
        },
    });
};

const useSignInMutation = () => {
    return useMutation<IResponseSignIn, Error, IRequestSignInBody>({
        mutationFn: async (body) => {
            const response = await instance.post<IResponseSignIn>('/authentication_token', body);
            Cookies.set('token', response.data.token);
            return response.data;
        },
    });
};

export { useSignInMutation, useSignUpMutation };
