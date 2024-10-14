export interface ICreateReviewBody {
    articleId: number;
    images?: FileList;
    videos?: FileList;
    pros?: string;
    cons?: string;
    comment: string;
    rating: number;
}
