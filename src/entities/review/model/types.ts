export interface IReview {
    id: number;
    user: {
        username: string;
    };
    rating: number;
    pros: string;
    cons: string;
    comment: string;
    images: [];
    videos: [];
}
