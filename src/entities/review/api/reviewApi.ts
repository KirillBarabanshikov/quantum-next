import { apiClient } from '@/shared/api';

import { IReview } from '../model';
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

export const fetchReviewById = async (id: string | number) => {
    try {
        const response = await apiClient.get<IReview>(`/reviews/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
