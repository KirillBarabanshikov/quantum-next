import { IImage } from '@/shared/types';

export interface IReview {
    id: number;
    user: {
        id: number;
        username: string;
    };
    rating: number;
    pros: string;
    cons: string;
    comment: string;
    images: IImage[];
    videos: {
        id: number;
        video: string;
    }[];
    likes: number;
    dislikes: number;
}
