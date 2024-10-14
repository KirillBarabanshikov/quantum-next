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
