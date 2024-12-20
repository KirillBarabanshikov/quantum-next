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
    color: null;
    images: IImage[];
    characteristics: IProductCharacteristic[];
    reviews: IReview[];
    priceRequest: boolean;
    additionalCharacteristics: IProductAdditionalCharacteristic[];
    categoryId: number;
    slug: string;
    productId: number;
    mediaReviews: {
        images: {
            id: number;
            image: string;
        }[];
        videos: {
            id: number;
            video: string;
        }[];
    };
    average: number;
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

export interface IProductModification {
    title: string;
    values: {
        value: string;
        articleId: number;
        measurement?: string;
        slug: string;
    }[];
}
