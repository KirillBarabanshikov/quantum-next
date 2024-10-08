import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IFavoritesState {
    favorites: number[];
    addToFavorites: (id: number) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<IFavoritesState>()(
    devtools(
        persist(
            (set, get) => ({
                favorites: [],
                addToFavorites: (id) => {
                    const currentFavorites = get().favorites;
                    set({ favorites: [id, ...currentFavorites] });
                },
                removeFromFavorites: (id) => {
                    const updatedFavorites = get().favorites.filter((item) => item !== id);
                    set({ favorites: updatedFavorites });
                },
                isFavorite: (id) => {
                    return get().favorites.some((item) => item === id);
                },
            }),
            {
                name: 'favorites',
            },
        ),
    ),
);

interface IRecentState {
    productsIds: number[];
    addToRecent: (id: number) => void;
}

export const useRecentStore = create<IRecentState>()(
    devtools(
        persist(
            (set, get) => ({
                productsIds: [],
                addToRecent: (productId) => {
                    let recentProductsIds = get().productsIds;

                    if (recentProductsIds.find((id) => id === productId)) {
                        recentProductsIds = recentProductsIds.filter((id) => id !== productId);
                    }

                    if (recentProductsIds.length >= 10) {
                        recentProductsIds = recentProductsIds.slice(0, -1);
                    }

                    set({ productsIds: [productId, ...recentProductsIds] });
                },
            }),
            {
                name: 'recent',
            },
        ),
    ),
);
