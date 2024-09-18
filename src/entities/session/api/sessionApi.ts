import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
            const response = await axios.post<IResponseSignIn>('/api/signin', body);
            console.log(response.data.token);
            return response.data;
        },
    });
};

export { useSignInMutation, useSignUpMutation };
