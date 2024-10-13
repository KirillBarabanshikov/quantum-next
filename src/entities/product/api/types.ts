export interface IProductParams {
    query?: string;
    page?: string | number;
    limit?: string | number;
    categoryId?: string | number;
    stock?: boolean;
    sort?: string;
    filters?: any[];
    price?: any[];
}
