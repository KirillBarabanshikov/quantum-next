import clsx from 'clsx';
import { FC } from 'react';

import { useAuth } from '@/app/_providers/AuthProvider';
import { productApi, useFavoritesStore } from '@/entities/product';
import StarIcon from '@/shared/assets/icons/star.svg';
import GradeIcon from '@/shared/assets/icons/start_outline.svg';
import { useStore } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import styles from './FavoriteOption.module.scss';

interface IFavoriteOptionProps {
    productId: number;
    variant: 'icon' | 'button';
    className?: string;
}

export const FavoriteOption: FC<IFavoriteOptionProps> = ({ productId, variant, className }) => {
    const store = useStore(useFavoritesStore, (state) => state);
    const isFavorite = store?.isFavorite(productId);
    const { isAuthenticated } = useAuth();

    const handleAddFavorite = async () => {
        try {
            isFavorite ? store?.removeFromFavorites(productId) : store?.addToFavorites(productId);
            if (isAuthenticated) {
                isFavorite
                    ? await productApi.deleteProductsFromFavorite([productId])
                    : await productApi.addProductsToFavorite([productId]);
                const favorites = await productApi.fetchFavoritesProducts();
                favorites && store?.setProductsIds(favorites);
            }
        } catch (error) {
            console.error();
        }
    };

    if (variant === 'icon') {
        return (
            <GradeIcon
                onClick={handleAddFavorite}
                className={clsx(styles.favoriteOption, styles.icon, isFavorite && styles.active, className)}
            />
        );
    }

    return (
        <Button
            variant={isFavorite ? 'solid' : 'outline'}
            onClick={handleAddFavorite}
            className={clsx(styles.favoriteOption, className)}
        >
            <StarIcon />
        </Button>
    );
};
