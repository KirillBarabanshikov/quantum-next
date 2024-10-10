export interface ICreateReviewBody {
    articleId: number;
    images: string[];
    videos: string[];
    pros: string;
    cons: string;
    comment: string;
    rating: string;
}
