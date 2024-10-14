import { mapImage } from '@/shared/lib';

import { IProduct } from '../model';

export const mapProduct = (product: IProduct): IProduct => {
    return {
        ...product,
        images: product.images.map(mapImage),
    };
};
