export interface ICategory {
    id: number;
    title: string;
    image: string;
    total: number;
    categories: ICategoryChildren[];
}

export interface ICategoryChildren {
    id: number;
    title: string;
    categories: {
        id: number;
        title: string;
    }[];
}
