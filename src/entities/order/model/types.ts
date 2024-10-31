import { IProduct } from '@/entities/product';

export interface IOrder {
    id: number;
    status: 'new';
    deliveryType: 'courier' | 'pickup';
    orderArticles: { id: number; article: IProduct; quantity: number }[];
}
