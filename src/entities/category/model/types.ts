export interface ICategory {
    id: number;
    title: string;
    image: string;
}

export interface ICategoryWithChildren extends ICategory {
    total?: number;
    categories: ICategoryWithChildren[];
}
