import { IReview } from '@/entities/review';

export interface IProduct {
    id: number;
    title: string;
    stock: boolean;
    domestic: boolean;
    number: string;
    price: number;
    count: number;
    descriptions: IDescription[];
    new: boolean;
    popular: boolean;
    images: IImage[];
    characteristics: ICharacteristic[];
    additionalCharacteristics: IAdditionalCharacteristic[];
    modifications: IModification[];
    categoryId: number;
    reviews: IReview[];
}

interface IDescription {
    id: number;
    title: string;
    description: string;
    type: 'left' | 'right';
    images: IImage[];
}

interface IImage {
    id: number;
    image?: string;
}

interface IAdditionalCharacteristic {
    id: number;
    title: string;
    value: string;
    modification: boolean;
    additional: boolean;
    additionalId?: string;
}

interface ICharacteristic {
    id: number;
    title?: string;
    value: string;
    categoryCharacteristic?: {
        id: number;
        title: string;
        measurement?: string;
        filterType?: string;
        modification: boolean;
        additionalId?: string;
    };
    modification: boolean;
    additional: boolean;
    additionalId?: string;
    categoryCharacteristicId?: number;
}

interface IModification {
    title: string;
    values: {
        value: string;
        articleId: number;
        measurement?: string;
    }[];
}
