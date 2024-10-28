export interface ICategoryDto {
    id: number;
    title: string;
    characteristics: any[];
    colors: any[];
    image?: string;
    slug: string;
}

export interface ICategoryWithChildrenDto extends ICategoryDto {
    total?: number;
    categories: ICategoryWithChildrenDto[];
}
