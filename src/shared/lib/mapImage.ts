import { API_URL } from '@/shared/consts';
import { IImage } from '@/shared/types';

export const mapImage = (image: IImage): IImage => {
    return {
        ...image,
        image: `${API_URL}/${image.image}`,
    };
};
