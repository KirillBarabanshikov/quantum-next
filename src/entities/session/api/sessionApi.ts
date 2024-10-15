import axios from 'axios';

import { ISignInBody, ISignInResponse, ISignUpBody } from './types';

export const signIn = async (body: ISignInBody) => {
    try {
        const response = await axios.post<ISignInResponse>('/api/auth/signin', body);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const signUp = async (body: ISignUpBody) => {
    try {
        const response = await axios.post<ISignInResponse>('/api/auth/signup', body);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const logout = async () => {
    try {
        await axios.post<ISignInResponse>('/api/auth/logout');
    } catch (error) {
        throw new Error(`${error}`);
    }
};
