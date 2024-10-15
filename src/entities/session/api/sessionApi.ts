import axios from 'axios';

import { ISignInBody, ISignInResponse } from './types';

export const signIn = async (body: ISignInBody) => {
    try {
        const response = await axios.post<ISignInResponse>('/api/auth/signin', body);
        return response.data;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
