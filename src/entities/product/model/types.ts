import { IReview } from '@/entities/review';
import { IImage } from '@/shared/types';

export interface IProduct {
    id: number;
    title: string;
    stock: boolean;
    domestic: boolean;
    number: string;
    price: number;
    count: number;
    descriptions: IProductDescription[];
    new: boolean;
    popular: boolean;
    images: IImage[];
    characteristics: IProductCharacteristic[];
    reviews: IReview[];
    additionalCharacteristics: IProductAdditionalCharacteristic[];
    modifications: IProductModification[];
    categoryId: number;
}

interface IProductDescription {
    id: number;
    title: string;
    description: string;
    type: 'left' | 'right';
    images: IImage[];
}

interface IProductCharacteristic {
    id: number;
    title?: string;
    value: string;
    categoryCharacteristic: {
        id: number;
        title: string;
        measurement: string;
        filterType: string;
        modification: false;
        additionalId: '';
    };
}

interface IProductAdditionalCharacteristic {
    id: number;
    title?: string;
    value?: string;
}

interface IProductModification {
    title: string;
    values: {
        value: string;
        articleId: number;
        measurement?: string;
    }[];
}
