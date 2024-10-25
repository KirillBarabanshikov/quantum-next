import { apiClient } from '@/shared/api';

import { ICreateReviewBody } from './types';

export const createReview = async (body: ICreateReviewBody) => {
    try {
        await apiClient.post('/reviews/create', body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
    }
};
