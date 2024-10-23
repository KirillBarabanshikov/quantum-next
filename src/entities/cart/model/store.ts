import { create } from 'zustand/index';
import { devtools, persist } from 'zustand/middleware';

interface ICartStore {
    products: { id: number; count: number }[];
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    decrementFromCart: (id: number) => void;
    setCount: (id: number, count: number) => void;
    inCart: (id: number) => boolean;
    getCount: () => number;
}

export const useCartStore = create<ICartStore>()(
    devtools(
        persist(
            (set, get) => ({
                products: [],
                getCount: () => get().products.reduce((acc, cur) => acc + cur.count, 0),
                addToCart: (id) => {
                    const currentProducts = get().products;
                    const product = currentProducts.find((product) => product.id === id);

                    if (product) {
                        set({
                            products: currentProducts.map((item) => {
                                if (item.id === product.id) {
                                    return { ...item, count: item.count + 1 };
                                }
                                return item;
                            }),
                        });
                    } else {
                        set({ products: [{ id, count: 1 }, ...currentProducts] });
                    }
                },
                removeFromCart: (id) => {
                    const updatedCart = get().products.filter((item) => item.id !== id);
                    set({ products: updatedCart });
                },
                decrementFromCart: (id) => {
                    const updatedCart = get().products.map((product) => {
                        if (product.id === id) {
                            return { ...product, count: product.count - 1 };
                        }
                        return product;
                    });
                    set({ products: updatedCart });
                },
                setCount: (id, count) => {
                    const updatedCart = get().products.map((product) => {
                        if (product.id === id) {
                            return { ...product, count };
                        }
                        return product;
                    });
                    set({ products: updatedCart });
                },
                inCart: (id) => {
                    return get().products.some((item) => item.id === id);
                },
            }),
            {
                name: 'cart',
            },
        ),
    ),
);
