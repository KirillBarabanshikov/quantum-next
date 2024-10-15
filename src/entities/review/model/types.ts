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
    images: FileList;
    videos: FileList;
}
