import { create } from 'zustand/index';
import { devtools, persist } from 'zustand/middleware';

interface ICartStore {
    productsIds: number[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    inCart: (id: number) => boolean;
}

export const useCartStore = create<ICartStore>()(
    devtools(
        persist(
            (set, get) => ({
                productsIds: [],
                addToCart: (id) => {
                    const currentFavorites = get().productsIds;
                    set({ productsIds: [id, ...currentFavorites] });
                },
                removeFromCart: (id) => {
                    const updatedFavorites = get().productsIds.filter((item) => item !== id);
                    set({ productsIds: updatedFavorites });
                },
                inCart: (id) => {
                    return get().productsIds.some((item) => item === id);
                },
            }),
            {
                name: 'cart',
            },
        ),
    ),
);
