import { create } from 'zustand/index';
import { devtools, persist } from 'zustand/middleware';

interface IFavoritesStore {
    productsIds: number[];
    addToFavorites: (id: number) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<IFavoritesStore>()(
    devtools(
        persist(
            (set, get) => ({
                productsIds: [],
                addToFavorites: (id) => {
                    const currentFavorites = get().productsIds;
                    set({ productsIds: [id, ...currentFavorites] });
                },
                removeFromFavorites: (id) => {
                    const updatedFavorites = get().productsIds.filter((item) => item !== id);
                    set({ productsIds: updatedFavorites });
                },
                isFavorite: (id) => {
                    return get().productsIds.some((item) => item === id);
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
