import { create } from 'zustand/index';
import { devtools, persist } from 'zustand/middleware';

interface ICartStore {
    products: number[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    inCart: (id: number) => boolean;
}

export const useCartStore = create<ICartStore>()(
    devtools(
        persist(
            (set, get) => ({
                products: [],
                addToCart: (id) => {
                    const currentFavorites = get().products;
                    set({ products: [id, ...currentFavorites] });
                },
                removeFromCart: (id) => {
                    const updatedFavorites = get().products.filter((item) => item !== id);
                    set({ products: updatedFavorites });
                },
                inCart: (id) => {
                    return get().products.some((item) => item === id);
                },
            }),
            {
                name: 'cart',
            },
        ),
    ),
);
