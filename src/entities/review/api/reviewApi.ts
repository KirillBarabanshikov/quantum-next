import { apiClient } from '@/shared/api';

export const createReview = async () => {
    try {
        const response = await apiClient.get('/api/reviews');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
