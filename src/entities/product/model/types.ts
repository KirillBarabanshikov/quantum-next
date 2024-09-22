// типы фильтров
export type FilterType =
    | 'range'
    | 'list'
    | 'list-multiple'
    | 'radio'
    | 'buttons'
    | 'checkboxes'
    | 'switcher'
    | 'colors';

// категория
export interface Category {
    id: number | string;
    title: string;
    characteristics?: CharacteristicsCategory[];
    colors?: Colors[];
    category?: Category; // parent category
    categories?: Category[]; // children categories
}

// товар
export interface IProduct {
    id: number;
    category?: Category;
    categoryId?: number | string;
    characteristics: Characteristics[];
    additionalCharacteristics: AdditionalCharacteristics[];
    color?: Colors;
    articles: Article[];
    colors: Colors[];
}

// характеристики продукта (с заполнением)
export interface Characteristics extends CharacteristicsCategory {
    value: string;
    categoryCharacteristicId?: number | string;
    additional: boolean;
    categoryCharacteristic: CharacteristicsCategory;
}

// характеристика категории (без заполнения)
export interface CharacteristicsCategory {
    id: number | string;
    title: string;
    measurement: string;
    filterType: FilterType;
    modification: boolean;
}

// Дополнительные характеристики
export interface AdditionalCharacteristics {
    id: number | string;
    title: string;
    value: string;
    modification: boolean;
    additional: boolean;
}

// цвета
export interface Colors {
    id: number | string;
    title: string;
    color: string;
}
// направление картинки в описании
export type ImageDirection = 'left' | 'right';

// картинка в описании
export interface ProductDescriptionsImage {
    id?: number;
    imageFile?: File;
    image?: string;
}

// описание продукта
export interface ProductDescriptions {
    id: number | string;
    title: string;
    description?: string;
    type?: ImageDirection;
    images?: ProductDescriptionsImage[];
}

// модификации
export interface Modifications {
    id: number | string;
    title: string;
    additionalCharacteristics: AdditionalCharacteristics[];
    articles: [];
    products: [];
    categoryCharacteristics: [];
}

export interface Article {
    id: string | number;
    title: string;
    characteristics: Characteristics[];
    additionalCharacteristics: AdditionalCharacteristics[];
    stock: boolean;
    domestic: boolean;
    number: number | string;
    price: number | string;
    count: number | string;
    descriptions: ProductDescriptions[];
    color: Colors;
    new: boolean;
    popular: boolean;
    images?: ProductDescriptionsImage[];
}

export type ProductEvents = 'change' | 'create' | 'detele';
